import React, {Component} from 'react';
import {Tabs} from './config/router';
import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC5tN7JXHiRzOrBc34NR212AJ9_NRpGMyo",
    authDomain: "mobileproject-cdee4.firebaseapp.com",
    databaseURL: "https://mobileproject-cdee4.firebaseio.com",
    projectId: "mobileproject-cdee4",
    storageBucket: "mobileproject-cdee4.appspot.com",
    messagingSenderId: "779119334300"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

class App extends Component {
    render() {
        return <Tabs/>;
    }
}

export default App;