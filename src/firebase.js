import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBub5B4a8uwVphwQeEsM_saHfgJjdhiBMk",
    authDomain: "whatsapp-clone-2ad82.firebaseapp.com",
    projectId: "whatsapp-clone-2ad82",
    storageBucket: "whatsapp-clone-2ad82.appspot.com",
    messagingSenderId: "813928173104",
    appId: "1:813928173104:web:8f99a1d0a0f0c703aee7f5",
    measurementId: "G-9KPE584X2M"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();


export {auth,provider};
export default db;