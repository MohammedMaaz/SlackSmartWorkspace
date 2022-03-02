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
  let reqDoc = await refs.attendance.doc(dateString).get();
  let docData = reqDoc.data();
  console.log("docData: ", docData);
  let state = docData.state;
  // const snapshot = await refs.attendance.get();
  // await refs.attendance.get().then((snapshot) => {
  //   snapshot.docs.forEach((doc) => {
  //     obj = doc.data();
  //   });
  // });
  // let condition = obj.user;
  if (state === "out" || state === undefined || state === "") {
    await say(`Hey <@${message.user}>! You are IN at ${timeString}.`);
    await refs.attendance.doc(dateString).set({
      timestampOfIn: new Date(),
      state: message.text,
      user: message.user,
      // done: new Date(),
      username: message.username || "",
      // cond: condition,
    });
  } else console.log("nhi hui");
};
