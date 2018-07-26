import React from 'react'
import PropTypes from 'prop-types'

class AddFishForm extends React.Component {
  static propTypes = {
    addFish: PropTypes.func,

  }

  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  createFish = (e) => {
    e.preventDefault();
    const fish = {
      name: this.nameRef.value.value,
      price: Number(this.priceRef.value.value),
      status: this.statusRef.value.value,
      desc: this.descRef.value.value,
      image: this.imageRef.value.value
    }
    console.log(fish)
    this.props.addFish(fish);
  }

  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish} >
        <input type="text" name="name" ref={this.nameRef} placeholder="Name" />
        <input type="text" name="price" ref={this.priceRef} placeholder="Price" />
        <select name="status" ref={this.statusRef} >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold out!</option>
        </select>
        <textarea name="desc" ref={this.descRef} placeholder="Desc" />
        <input type="text" name="image" ref={this.imageRef} placeholder="Image" />
        <button type="submit">+ Add Fish</button>
      </form>
    )
  }
}

export default AddFishForm
