import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import {
  addCartItemMutation,
  deleteCartItemMutation,
  getCartQuery
} from '../queries/queries';

class Product extends Component {
  onAdd() {
    this.props
      .addCartItemMutation({
        variables: {
          quantity: 1,
          user_id: 1, // hardcoded
          product_id: this.props.product.id
        } //,
        //refetchQueries: [{ query: getCartQuery, variables: { id: 1 } }]
      })
      .then(data => this.props.refetch())
      .catch(err => console.log(err));
  }
  onDelete() {
    console.log('PROPS FROM DELETE PRODUCT', this.props);
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
    const { id, name, description, price, quantity } = this.props.product;
    console.log('from product -----', id, name, description, price);
    return (
      <div key={id}>
        <Link to={`/product/${id}/show`}>
          <img
            src="http://fosterclark.com/wp-content/uploads/2016/06/Banana-150x150.png"
            alt="dummy"
          />
        </Link>
        <h2>{name}</h2>
        <p>Description: {description}</p>
        <p>Price: {price}</p>
        {quantity ? <p>Quantity: {quantity}</p> : ''}
        <button onClick={this.onAdd.bind(this)}>ADD</button>
        {quantity ? (
          <button onClick={this.onDelete.bind(this)}>DELETE</button>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default compose(
  graphql(addCartItemMutation, { name: 'addCartItemMutation' }),
  graphql(deleteCartItemMutation, { name: 'deleteCartItemMutation' })
)(Product);
