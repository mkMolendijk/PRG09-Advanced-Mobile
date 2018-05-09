import React, {Component} from 'react';
import {Tabs} from './config/router';
import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
// keys here
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Return object for tab navigation
class App extends Component {
    render() {
        return <Tabs/>;
    }
}

export default App;
