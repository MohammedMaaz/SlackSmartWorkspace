const { App, HTTPReceiver } = require("@slack/bolt");
require("dotenv").config();

const receiver = new HTTPReceiver({
  endpoints: ["/api/slack/events"],
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  processBeforeResponse: true,
  customRoutes: [
    {
      path: "/api/health-check",
      method: "GET",
      handler(req, res) {
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
});

module.exports = receiver.requestListener;
