import firebase, { refs } from "../utils/firebase";
import State from "./index";

export default async ({ message, say }) => {
  // if (State.state) {
  let date = new Date().toDateString();
  // let todayAttendance = firebase.firestore
  //   .collection("attendance")
  //   .doc(date.toDateString());
  // let perm = await refs.attendance.doc(date.toDateString()).get({ perm });
  // if (perm === "yes") {
  await say(`Hey <@${message.user}>! Your time has been recorded!! `);
  await refs.attendance.doc(date).set({
    timestamp: new Date().toTimeString(),
    status: message.text,
    user: message.user,
    username: message.username || "",
  });
  // }
};
