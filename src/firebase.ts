import firebase from 'firebase/compat/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAjpos2zzRfJxHuDgikiWAYUS37Naz9s50',
  authDomain: 'movies-catalog-c7b32.firebaseapp.com',
  projectId: 'movies-catalog-c7b32',
  storageBucket: 'movies-catalog-c7b32.appspot.com',
  messagingSenderId: '984383656953',
  appId: '1:984383656953:web:2106496046ca9ec7c86328',
  measurementId: 'G-YHYDJX7Z0M',
  databaseURL: 'https://movies-catalog-c7b32-default-rtdb.europe-west1.firebasedatabase.app/',
};

// initialize our app
const firebaseApp = firebase.initializeApp(firebaseConfig);

// initial database
const database = getDatabase(firebaseApp);

// set auth
const auth = getAuth(firebaseApp);
// const auth = firebase.auth();

export { database, auth };
