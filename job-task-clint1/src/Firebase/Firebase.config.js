// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxJKLjgIzzSXcdwEQOnCOAf1I4QcoQTz4",
  authDomain: "code-inbound-llp-job-task.firebaseapp.com",
  projectId: "code-inbound-llp-job-task",
  storageBucket: "code-inbound-llp-job-task.appspot.com",
  messagingSenderId: "728655366735",
  appId: "1:728655366735:web:f1ba855eb349bda2d9783a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;