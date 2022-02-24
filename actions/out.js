import firebase from "../utils/firebase";
import State from "./index";

export default async ({ message, say }) => {
  if (State.state === false) {
    await say(`Hey <@${message.user}>! Your time has been recorded!! `);
    await firebase
      .firestore()
      .collection("logs")
      .add({
        timestamp: new Date(),
        message: message.text,
        user: message.user,
        username: message.username || "",
      });
    State.state = true;
  }
};
