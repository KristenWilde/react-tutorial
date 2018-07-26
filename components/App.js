import React from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'
import Fish from './Fish'
import base from '../base'

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  }

  componentDidMount() {
    const storeId = this.props.match.params.storeId
    // first reinstate our local storage
    const localStorageRef = localStorage.getItem(storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef)})
    }

    this.ref = base.syncState(`${storeId}/fishes`, {
      context: this,
      state: 'fishes',
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentDidUpdate() {
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
  }

  addFish = fish => {
    // 1. Take a copy of the existing state.
    const fishes = { ...this.state.fishes }
    // 2. add our new fish to the copy.
    fishes[`fish${Date.now()}`] = fish;
    // 3. set our object to state using the setState method.
    this.setState({ fishes }) // ES6/7 for {fishes: fishes}
  }

  updateFish = (key, updatedFish) => {
    const fishes = { ...this.state.fishes }
    fishes[key] = updatedFish;
    this.setState({ fishes })
  }

  deleteFish = key => {
    const fishes = { ...this.state.fishes }
    fishes[key] = null;
    this.setState({ fishes })
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes })
  }

  addToOrder = key => {
    const order = { ...this.state.order }
    order[key] = order[key] + 1 || 1;
    this.setState({ order })
  }

  removeFromOrder = key => {
    const order = { ...this.state.order }
    delete order[key];
    this.setState({ order })
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Best Fresh Seafood"/>
          <ul>
            {Object.keys(this.state.fishes).map(key => (
              <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>
            ))}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder}/>
        <Inventory
          fishes={this.state.fishes}
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          storeId={this.props.match.params.storeId}
          />
      </div>
    )
  }
}

export default App
