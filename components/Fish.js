import React from 'react'
import PropTypes from 'prop-types'
import { formatPrice } from '../helpers'


class Fish extends React.Component {
  static propTypes = {
    addToOrder: PropTypes.func,
    details: PropTypes.shape({
      name: PropTypes.string,
      desc: PropTypes.string,
      image: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number,
    }),
    index: PropTypes.string,
  }

  handleClick = () => {
    this.props.addToOrder(this.props.index);
  }

  render() {
    const { name, image, status, desc, price } = this.props.details
    const unavailable = status === 'unavailable'

    return (
      <li className="menu-fish">
        <img src={image} alt={name}/>
        <h3 className="fish-name">{name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button disabled={unavailable} onClick={this.handleClick}>
          {unavailable ? 'Sold Out' : 'Add To Cart'}
        </button>
      </li>
    )
  }
}

export default Fish
