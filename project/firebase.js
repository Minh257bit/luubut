import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {

  getFirestore,

  collection,

  addDoc,

  deleteDoc,

  doc,

  serverTimestamp,

  query,

  orderBy,

  onSnapshot

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCyXmkgIaLUn6KMkv3QejJS19q2CqhrUJI",
  authDomain: "luubuttd.firebaseapp.com",
  projectId: "luubuttd",
  storageBucket: "luubuttd.firebasestorage.app",
  messagingSenderId: "721417783631",
  appId: "1:721417783631:web:995268972a19ae23d21d3a",
  measurementId: "G-ZGJ4RPN0CQ"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export {

  collection,

  addDoc,

  deleteDoc,

  doc,

  serverTimestamp,

  query,

  orderBy,

  onSnapshot

};