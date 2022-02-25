import { refs } from "../utils/firebase";

export default async ({ message, say }) => {
  let date = new Date();
  let dateString = date.toDateString();
  let timeString = date.toTimeString();
  // let state = await refs.attendance.doc(dateString).get(state);
  // if (state === "out" || state === undefined || state === "") {
  await say(`Hey <@${message.user}>! You are IN at ${timeString}.`);
  await refs.attendance.doc(dateString).set({
    timestampOfIn: new Date(),
    state: message.text,
    user: message.user,
    username: message.username || "",
  });
  // }
};
