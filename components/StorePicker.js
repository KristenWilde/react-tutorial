import React from 'react'
import { getFunName } from '../helpers'

class StorePicker extends React.Component {
  myInput = React.createRef();

  goToStore(e) {
    e.preventDefault();
    const storeName = this.myInput.value.value;
    this.props.history.push(`store/${storeName}`)
  }

  render() {
    return (
      <form action="" className="store-selector" onSubmit={this.goToStore.bind(this)}>
      {/* JSX comments: block comments inside curly braces.*/}
        <h2>Please enter a store.</h2>
        <input
          type="text"
          ref={this.myInput}
          required placeholder="store name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store</button>
      </form>
      )
  }
}

export default StorePicker
