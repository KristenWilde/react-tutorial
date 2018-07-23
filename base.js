import Rebase from 're-base';
import firebase from 'firebase';
import credentials from './credentials';

const firebaseApp = firebase.initializeApp(credentials)

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
