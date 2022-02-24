import firebase from "../utils/firebase";

export default async ({ message, say }) => {
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
};
