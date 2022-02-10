import * as admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  ),
  databaseURL: process.env.FIREBASE_DB_URL,
});

const firebase = admin;
export default firebase;
export const db = firebase.firestore;
export const storage = firebase.storage;

const teams = db().collection("teams");
const users = (teamId) => teams.doc(teamId).collection("users");
const worklogs = (teamId, userId) =>
  users(teamId).doc(userId).collection("worklogs");
const timesheets = (teamId, userId) =>
  users(teamId).doc(userId).collection("timesheets");
const reports = (teamId) => teams.doc(teamId).collection("reports");

export const refs = {
  teams,
  users,
  worklogs,
  timesheets,
  reports,
};

export const serverTimestamp = () => new Date();
