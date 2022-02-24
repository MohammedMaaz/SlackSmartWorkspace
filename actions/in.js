import firebase from "../utils/firebase";
import State from "./index";

export default async ({ message, say }) => {
  // if (State.state) {
  let date = new Date();
  // let todayAttendance = firebase.firestore
  //   .collection("attendance")
  //   .doc(date.toDateString());
  // let status = await firebase
  //   .firestore()
  //   .collection("attendance")
  //   .doc(date.toDateString())
  //   .get({ status });
  // if (status !== "in") {
  await say(`Hey <@${message.user}>! Your time has been recorded!! `);
  await firebase
    .firestore()
    .collection("attendance")
    .doc(date.toDateString())
    .set({
      timestamp: new Date(),
      status: message.text,
      user: message.user,
      username: message.username || "",
    });
  // }
};
