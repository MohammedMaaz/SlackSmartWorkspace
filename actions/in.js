import firebase from "../utils/firebase";
import State from "./index";

export default async ({ message, say }) => {
  // if (State.state) {
  let time = new Date();
  await say(`Hey <@${message.user}>! Your time has been recorded!! `);
  await firebase
    .firestore()
    .collection("attendance")
    .doc(time)
    .set({
      timestamp: new Date(),
      message: message.text,
      user: message.user,
      username: message.username || "",
    });
  // State.state = false;
  // }
};
