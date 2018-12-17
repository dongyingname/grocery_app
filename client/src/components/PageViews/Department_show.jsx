import React, { Component } from 'react';
import Category from '../Categories/Category';
import { graphql } from 'react-apollo';
import { getCategoriesQuery } from '../../queries/queries';

//should take all categories that are available to that department

class Department_show extends Component {
  state = {
    id: this.props.match.params.department_name
  };
  displayCategories() {
    let data = this.props.data;
    // const { id, name, categories } = data.departments;
    // const D = data.departments;
    // console.log('this is data:', data);
    if (data.loading) {
      return <div>Loading Categories...</div>;
    } else {
      return data.departments[0].categories.map(category => {
        return <Category category={category} />;
      });
    }
  }
  render(props) {
    return <div>{this.displayCategories()}</div>;
  }
}

export default graphql(getCategoriesQuery, {
  options: props => {
    console.log('from props:', props);
    return { variables: { id: props.match.params.id } };
  }
})(Department_show);
