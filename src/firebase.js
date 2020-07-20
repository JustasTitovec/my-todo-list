import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCVuESwnt-BYTwzTQ_8_cZBa5Y9bLmn_KI',
  authDomain: 'todo-app-b0d26.firebaseapp.com',
  databaseURL: 'https://todo-app-b0d26.firebaseio.com',
  projectId: 'todo-app-b0d26',
  storageBucket: 'todo-app-b0d26.appspot.com',
  messagingSenderId: '297717888625',
  appId: '1:297717888625:web:3bd614bded588d98798dd0',
  measurementId: 'G-NYMY7TL06D'
});

const db = firebaseApp.firestore();

export default db;
