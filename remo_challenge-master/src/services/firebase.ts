import * as firebase from 'firebase';

// TODO: fill in your firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAUWdF2_rnAHy9qY4IjKGxe2HPPkmo-FFI",
    authDomain: "remo-challenge-ae4f7.firebaseapp.com",
    projectId: "remo-challenge-ae4f7",
    storageBucket: "remo-challenge-ae4f7.appspot.com",
    messagingSenderId: "965289580581",
    appId: "1:965289580581:web:2e4449783ef7ec763c07cc",
    measurementId: "G-1D90H487V2"
};

firebase.initializeApp(firebaseConfig);

export default firebase;