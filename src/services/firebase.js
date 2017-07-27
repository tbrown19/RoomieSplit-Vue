import Firebase from 'firebase';
var FirebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: 'roomie-split.firebaseapp.com',
    databaseURL: 'https://roomie-split.firebaseio.com',
    projectId: 'roomie-split',
    storageBucket: '',
    messagingSenderId: '170608881412'
};

let FirebaseApp = Firebase.initializeApp(FirebaseConfig);
let FirebaseDatabase = FirebaseApp.database();
export const Database = FirebaseDatabase;

function signInAnonUser() {
    FirebaseApp.auth().signInAnonymously().catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    });
}

// Check to see if the user already has an anon account, if not, create one for them.
FirebaseApp.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
    } else {
        signInAnonUser();
    }
});
