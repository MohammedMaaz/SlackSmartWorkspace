import firebase from "../utils/firebase";

export default async ({ message, say }) => {
  await say(`Hey there <@${message.user}>!`);
  let delay = Date.now();
  await firebase
    .firestore()
    .collection("logs")
    .add({
      timestamp: new Date(),
      message: message.text,
      user: message.user,
      username: message.username || "",
    });
  delay = Date.now() - delay;
  console.log({ delay });
};
