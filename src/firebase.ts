import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
    apiKey: "AIzaSyAjpos2zzRfJxHuDgikiWAYUS37Naz9s50",
    authDomain: "movies-catalog-c7b32.firebaseapp.com",
    projectId: "movies-catalog-c7b32",
    storageBucket: "movies-catalog-c7b32.appspot.com",
    messagingSenderId: "984383656953",
    appId: "1:984383656953:web:2106496046ca9ec7c86328",
    measurementId: "G-YHYDJX7Z0M"
};

// initialize our app
const firebaseApp = firebase.initializeApp(firebaseConfig);

// initial database
const firestore = firebaseApp.firestore()
const database = getStorage();
/*.settings({
    experimentalForceLongPolling: true, // this line
    useFetchStreams: true, // and this line
  });*/


// set auth
const auth = firebase.auth();

// export type AuthType = ReturnType<typeof auth>;
// set provider
//const provider = new firebase.auth.GoogleAuthProvider();

export { database, auth };
export default firestore;