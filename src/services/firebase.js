import firebase from 'firebase';

    const firebaseConfig = {
        apiKey: "AIzaSyA8SIS8uCTpLCSMrhjEmqVE8N6o95o_QRU",
        authDomain: "hyderabad-flavours-app.firebaseapp.com",
        databaseURL: "https://hyderabad-flavours-app-default-rtdb.firebaseio.com",
        projectId: "hyderabad-flavours-app",
        storageBucket: "hyderabad-flavours-app.appspot.com",
        messagingSenderId: "1077394997428",
        appId: "1:1077394997428:web:0a26c7c58058b0f66dd7e1",
        measurementId: "G-LQY1K95NQ0"
    };

    firebase.initializeApp(firebaseConfig);

export default firebase;


