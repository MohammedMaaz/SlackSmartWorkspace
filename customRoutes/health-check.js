import firebase from "../utils/firebase";

export default {
  path: "/api/health-check",
  method: "GET",
  async handler(req, res) {
    let delay = Date.now();
    await firebase.firestore().collection("logs").add({
      timestamp: new Date(),
      message: "health check",
    });
    delay = Date.now() - delay;
    console.log({ delay });
    res.writeHead(200);
    res.end("Slack Smart Workspace is up and running ✨");
  },
};
