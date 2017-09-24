/**
 * Created by chocho on 9/15/17.
 */
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
require('firebase/storage');

const config = {
  apiKey: 'AIzaSyA7Ou9DP2cH2PgXviULaAfUtRvvgJaAy-k',
  authDomain: 'aifi-f35b5.firebaseapp.com',
  databaseURL: 'https://aifi-f35b5.firebaseio.com',
  projectId: 'aifi-f35b5',
  storageBucket: 'aifi-f35b5.appspot.com',
  messagingSenderId: '225280975391',
};
var firebase = firebase.initializeApp(config);

export default firebase;
