import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBSdmLgL8X43L9ZcnyJwl37ajbkCPwEXWM",
    authDomain: "e-commerce-f7d10.firebaseapp.com",
    databaseURL: "https://e-commerce-f7d10.firebaseio.com",
    projectId: "e-commerce-f7d10",
    storageBucket: "e-commerce-f7d10.appspot.com",
    messagingSenderId: "886398671015"
};
const Fire = firebase.initializeApp(config);


export default Fire;