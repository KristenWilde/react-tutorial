import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase'
import base, { firebaseApp } from '../base'
import AddFishForm from './AddFishForm'
import EditFishForm from './EditFishForm'
import Login from './Login'


class Inventory extends React.Component {
  static propTypes = {
    addFish: PropTypes.func.isRequired,
    updateFish: PropTypes.func.isRequired,
    deleteFish: PropTypes.func.isRequired,
    loadSampleFishes: PropTypes.func.isRequired,
    fishes: PropTypes.object.isRequired,
    storeId: PropTypes.string.isRequired,
  }

  state = {
    owner: null,
    uid: null
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user })
      }
    })
  }

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler)
  }

  authHandler = async (authData) => {
    console.log(authData);
    // 1. look up the current store in the firebase database
    const store = await base.fetch(this.props.storeId, {context: this})
    // 2. claim it if there is no owner
    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      })
    }
    // 3. set the state of the inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    })
  }

  logout = async () => {
    await firebase.auth().signOut()
    this.setState({ uid: null })
  }

  render() {
    const logout = <button onClick={this.logout}>Log Out</button>

    if (!this.state.uid) {
      return <Login authenticate={this.authenticate}/>
    }

    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you are not the owner.</p>
          {logout}
        </div>
      )
    }

    return (
      <div className="inventory">
        <h2>Inventory!</h2>
        {logout}
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm
            key={key}
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
            />
        ))}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
      </div>
    )
  }
}

export default Inventory
