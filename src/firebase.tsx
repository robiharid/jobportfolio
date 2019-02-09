import firebase from "firebase"

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.RREACT_APP_FIREBASE_DB
}; 

firebase.initializeApp(config);
export default firebase;
