import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAjoLaIgae4hx6wlPc5gI4EpcJq7KaUFOA",
  authDomain: "react-tutorial-kristen.firebaseapp.com",
  databaseURL: "https://react-tutorial-kristen.firebaseio.com",
})

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
