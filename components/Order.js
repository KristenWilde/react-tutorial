import React from 'react';
import PropTypes from 'prop-types'
import { formatPrice } from '../helpers'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

class Order extends React.Component {
  static propTypes = {
    removeFromOrder: PropTypes.func,
    fishes: PropTypes.object,
    order: PropTypes.object,
  }

  renderOrder = key => {
    const fish = this.props.fishes[key];
    if (!fish) return null;

    const count = this.props.order[key];
    const transitionOptions = {
      classNames: "order",
      key,
      timeout: { enter: 250, exit: 250 },
    }

    if (fish.status === 'available') {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            <span>
              <TransitionGroup component="span" className="count">
                <CSSTransition classNames="count" key={count} timeout={{ enter: 250, exit: 250 }}>
                  <span>{count}</span>
                </CSSTransition>
              </TransitionGroup>
              lbs {fish.name} {formatPrice(count * fish.price)}
            </span>
            <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
          </li>
        </CSSTransition>
      )
    }
    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}> Sorry, no {fish.name || 'fish'} available.</li>
      </CSSTransition>
    )
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
        <TransitionGroup component="ul" className='order'>
          {Object.keys(this.props.order).map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
        Total: <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    )
  }
}

export default Order
