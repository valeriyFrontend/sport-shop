import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCN4RJWjAAaCAm4MSWtCZIV7PkbMgnKpoQ",
    authDomain: "test-project-react-b3be1.firebaseapp.com",
    databaseURL: "https://test-project-react-b3be1-default-rtdb.firebaseio.com",
    projectId: "test-project-react-b3be1",
    storageBucket: "test-project-react-b3be1.appspot.com",
    messagingSenderId: "926743114202",
    appId: "1:926743114202:web:e7815ce323e837b33e50e3"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;

export const database = firebase.database();
export const storage = firebase.storage();
export const auth = firebase.auth();