import React from 'react';
import { formatPrice } from '../helpers'

class Order extends React.Component {
  renderOrder = key => {
    const fish = this.props.fishes[key];
    if (!fish) return null;

    const count = this.props.order[key];
    if (fish.status === 'available') {
      return (
        <li key={key}>
          {count} lbs {fish.name} {formatPrice(count * fish.price)}
          <button onClick={() => this.props.removeFromOrder(key)}>Remove</button>
        </li>
      )
    }
    return <li key={key}> Sorry, no {fish.name || 'fish'} available.</li>
  }

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((total, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';
      if (isAvailable) {
        return total + (count * fish.price)
      }
      return total;
    }, 0)

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <ul className='order'>
          {Object.keys(this.props.order).map(this.renderOrder)}
        </ul>
        <div className="total">
        Total: <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    )
  }
}

export default Order
