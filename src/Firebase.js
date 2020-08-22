import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA-FNzx3dONVwh8wTvf3n5VaAbAVDixY3w",
  authDomain: "chat-react-cr.firebaseapp.com",
  databaseURL: "https://chat-react-cr.firebaseio.com",
  projectId: "chat-react-cr",
  storageBucket: "chat-react-cr.appspot.com",
  messagingSenderId: "167854052909",
  appId: "1:167854052909:web:d80606c79af656c5118aa4"
};

firebase.initializeApp(firebaseConfig);


export default firebase;