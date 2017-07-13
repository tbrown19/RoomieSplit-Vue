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

// Create an anonymous user when we initalize the firebase database. This way the user can have an account without realizing it.
// Because they have an account we can actually now place some rules on the database.
FirebaseApp.auth().signInAnonymously().catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
});
