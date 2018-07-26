import React from 'react'
import PropTypes from 'prop-types'

class EditFishForm extends React.Component {
  static propTypes = {
    fish: PropTypes.shape({
      name: PropTypes.string,
      desc: PropTypes.string,
      image: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number,
    }),
    index: PropTypes.string,
    deleteFish: PropTypes.func,
    updateFish: PropTypes.func,
  }

  handleChange = event => {
    const field = event.currentTarget;
    const fish = { ...this.props.fish };
    if (field.name === 'price') {
      fish.price = Number(field.value);
    } else {
      fish[field.name] = field.value;
    }
    this.props.updateFish(this.props.index, fish);
  }

  callDeleteFish = () => {
    this.props.deleteFish(this.props.index);
  }

  render() {
    const { name, price, status, desc, image } = this.props.fish;
    return (
      <div className="fish-edit">
        <input type="text" name="name" onChange={this.handleChange} value={name}/>
        <input type="text" name="price" onChange={this.handleChange} value={price} />
        <select name="status" onChange={this.handleChange} value={status} >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold out!</option>
        </select>
        <textarea name="desc" onChange={this.handleChange} value={desc} />
        <input type="text" name="image" onChange={this.handleChange} value={image} />
        <button onClick={this.callDeleteFish}>Remove Fish</button>
      </div>
    )
  }
}

export default EditFishForm
