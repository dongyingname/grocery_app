import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { FaTrashAlt } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import {
  addCartItemMutation,
  deleteCartItemMutation,
  getCartQuery
} from '../queries/queries';

class Product extends Component {
  // let product_id =  this.props.product._typename === 'CartItem'
  //             ? this.props.product_id
  //             : this.props.product.id;
  onAdd() {
    console.log('FROM ADD IN PRODUCTS ___', this.props.product);
    this.props
      .addCartItemMutation({
        variables: {
          quantity: 1,
          user_id: 1, // hardcoded
          product_id: this.props.product.product_id || this.props.product.id
        } //,
        //refetchQueries: [{ query: getCartQuery, variables: { id: 1 } }]
      })
      .then(data => this.props.refetch())
      .catch(err => console.log(err));
  }

  onDecrease() {
    console.log('FROM UPDATE IN PRODUCTS ___', this.props);
    this.props
      .addCartItemMutation({
        variables: {
          quantity: -1,
          user_id: 1, // hardcoded
          product_id: this.props.product.product_id
        } //,
        //refetchQueries: [{ query: getCartQuery, variables: { id: 1 } }]
      })
      .then(data => this.props.refetch())
      .catch(err => console.log(err));
  }

  onDelete() {
    // console.log('PROPS FROM DELETE PRODUCT', this.props);
    this.props
      .deleteCartItemMutation({
        variables: {
          user_id: 1, // hardcoded
          product_id: this.props.product.product_id
        } //,
        // refetchQueries: [{ query: getCartQuery, variables: { id: 1 } }]
      })
      .then(data => this.props.refetch())
      .catch(err => console.log(err));
  }
  render() {
    const data = this.props.data;
    console.log('FROM PRODUCT', this.props);
    const {
      id,
      name,
      description,
      price,
      quantity,
      image,
      store
    } = this.props.product;
    // const { id: store_id, name: store_name } = store;
    console.log(
      'from product -----',
      id,
      name,
      description,
      price,
      image
      // store_id,
      // store_name
    );
    return (
      <div key={id} className="cart_item">
        <Link to={`/product/${id}/show`}>
          <img
            src={image}
            alt="dummy"
            style={{ height: '150px', width: '150px' }}
          />
        </Link>
        <div className="cart_item__details">
          <h4>{name}</h4>
          <p> $ {price}</p>
          <p>{description}</p>
          {store ? <p>Store: {store.name}</p> : ''}
        </div>
        <div className="cart_item__update">
          {price ? <button onClick={this.onAdd.bind(this)}>+</button> : ''}
          {quantity ? <p>{quantity}</p> : ''}
          {quantity ? (
            <button onClick={this.onDecrease.bind(this)}>-</button>
          ) : (
            ''
          )}
          {quantity ? (
            <button onClick={this.onDelete.bind(this)}>
              <svg width="50px" height="50px">
                <use xlinkHref="images/sprite.svg#trash" />
              </svg>
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(addCartItemMutation, { name: 'addCartItemMutation' }),
  graphql(deleteCartItemMutation, { name: 'deleteCartItemMutation' })
)(Product);
