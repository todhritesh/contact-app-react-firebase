import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyCTZKluAqXJeceZp5RssZMQdOhKHDL49jA",
  authDomain: "contact-app-36cee.firebaseapp.com",
  projectId: "contact-app-36cee",
  storageBucket: "contact-app-36cee.appspot.com",
  messagingSenderId: "713572943735",
  databaseURL : "https://contact-app-36cee-default-rtdb.firebaseio.com",
  appId: "1:713572943735:web:9c86489d3aa9ffd357c372"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);