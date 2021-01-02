import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyB5KfK-BP701VpburJJ96ljwVsK1iZvQBY",
  authDomain: "smarttrashcan8000.firebaseapp.com",
  databaseURL: "https://smarttrashcan8000-default-rtdb.firebaseio.com",
  projectId: "smarttrashcan8000",
  storageBucket: "smarttrashcan8000.appspot.com",
  messagingSenderId: "610217870116",
  appId: "1:610217870116:web:f411ee6e86a970977f69b1",
  measurementId: "G-1SZ2PNY4RK"
};
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;