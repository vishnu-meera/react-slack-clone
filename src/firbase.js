import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCu4Q9lf2ukY1XdsQzk1xN6Xi_pnU0rV2o",
  authDomain: "react-slack-clone-9b2dc.firebaseapp.com",
  databaseURL: "https://react-slack-clone-9b2dc.firebaseio.com",
  projectId: "react-slack-clone-9b2dc",
  storageBucket: "react-slack-clone-9b2dc.appspot.com",
  messagingSenderId: "135709687295",
  appId: "1:135709687295:web:65d1d5887689f72304fbca",
  measurementId: "G-15GEX3NMVL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

export default firebase;
