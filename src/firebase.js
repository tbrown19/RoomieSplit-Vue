
import Firebase from 'firebase';
var FirebaseConfig = {
    apiKey: "AIzaSyB7z8iU-By9Yy752NpUlSdu5eyKgOQweyc",
    authDomain: "roomie-split.firebaseapp.com",
    databaseURL: "https://roomie-split.firebaseio.com",
    projectId: "roomie-split",
    storageBucket: "",
    messagingSenderId: "170608881412"
};
let FirebaseApp = Firebase.initializeApp(FirebaseConfig)
let FirebaseDatabase = FirebaseApp.database()

export const RoomConfigurations = FirebaseDatabase.ref('RoomConfigurations');