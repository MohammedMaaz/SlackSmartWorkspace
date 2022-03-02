import { refs } from "../utils/firebase";

export default async ({ message, say }) => {
  let date = new Date();
  let dateString = date.toDateString();
  let timeString = date.toTimeString();
  let docref = await refs.attendance.doc(dateString).get();
  let state = docref.data().state;
  if (state === "in") {
    await say(`Hey <@${message.user}>! You are OUT at ${timeString}.`);
    await refs.attendance.doc(dateString).update({
      timestampOfOut: new Date(),
      state: message.text,
      user: message.user,
      username: message.username || "",
    });
  }
};
