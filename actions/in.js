import { refs } from "../utils/firebase";

export default async ({ message, say }) => {
  let date = new Date();
  let dateString = date.toDateString();
  let timeString = date.toTimeString();
  // function getInfo(data){
  //   data.forEach(doc => {
  //     let info =
  //   });
  // }
  let obj;
  const snapshot = await refs.attendance.get();
  await refs.attendance.get().then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      obj = doc.data();
    });
  });
  let condition = obj.user;
  // status = status.state;
  if (condition === "out" || condition === undefined || condition === "") {
    await say(`Hey <@${message.user}>! You are IN at ${timeString}.`);
    await refs.attendance.doc(dateString).set({
      timestampOfIn: new Date(),
      state: message.text,
      user: message.user,
      // done: new Date(),
      username: message.username || "",
      // cond: condition,
    });
  }
};
