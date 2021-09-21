// Import the functions you need from the SDKs you need
import firebase from "firebase";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpZ_aZwS-UiNFH5Tl2w8jhh52K2aYYoB8",
  authDomain: "asm-react-native-db4f0.firebaseapp.com",
  projectId: "asm-react-native-db4f0",
  storageBucket: "asm-react-native-db4f0.appspot.com",
  messagingSenderId: "886287428004",
  appId: "1:886287428004:web:8c29211bfb6469d95df931"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db
};