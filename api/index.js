import { App, HTTPReceiver } from "@slack/bolt";
import * as admin from "firebase-admin";
admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  ),
  databaseURL: process.env.FIREBASE_DB_URL,
});

const receiver = new HTTPReceiver({
  endpoints: ["/api/slack/events"],
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  processBeforeResponse: true,
  customRoutes: [
    {
      path: "/api/health-check",
      method: "GET",
      async handler(req, res) {
        let delay = Date.now();
        await admin.firestore().collection("logs").add({
          timestamp: new Date(),
          message: "health check",
        });
        delay = Date.now() - delay;
        console.log({ delay });
        res.writeHead(200);
        res.end("Slack Smart Workspace is up and running ✨");
      },
    },
  ],
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: receiver,
});

app.error((error) => console.log("Error:", error));

app.message("hello", async ({ message, say }) => {
  await say(`Hey there <@${message.user}>!`);
  let delay = Date.now();
  await admin
    .firestore()
    .collection("logs")
    .add({
      timestamp: new Date(),
      message: message.text,
      user: message.user,
      username: message.username || "",
    });
  delay = Date.now() - delay;
  console.log({ delay });
});

module.exports = receiver.requestListener;
