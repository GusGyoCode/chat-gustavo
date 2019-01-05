import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import App from './App';
import * as serviceWorker from './serviceWorker';
import './css/index.css';

firebase.initializeApp({
  apiKey: "AIzaSyCJVBraLv97Zn3Aqbf6iZW5zBzQPBQB3Wc",
  authDomain: "treelud-g.firebaseapp.com",
  databaseURL: "https://treelud-g.firebaseio.com",
  projectId: "treelud-g",
  storageBucket: "treelud-g.appspot.com",
  messagingSenderId: "918604255085"
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
