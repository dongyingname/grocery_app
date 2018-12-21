const Query = {
  // users
  users(parent, args, { knex }, info) {
    console.log('users args:', args.id);
    if (!args.id) {
      return knex.select('*').from('users');
    }
    //return knex('users').where('id', `%${args.id}%`);
    return knex('users')
      .returning('*')
      .where({ id: `${args.id}` });
  },
  // stores
  stores(parent, args, { knex }, info) {
    if (!args.query) {
      return knex.select('*').from('stores');
    }
    return knex('stores').where('name', 'like', `%${args.query}%`);
  },
  // departments
  departments(parent, args, { knex }, info) {
    const { query, id } = args;
    if (query) {
      return knex('departments').where('name', 'like', `%${query}%`);
    } else if (id) {
      return knex('departments').where({ id });
    } else {
      return knex.select('*').from('departments');
    }
  },
  // categories
  categories(parent, args, { knex }, info) {
    const { query, id } = args;
    if (query) {
      return knex('categories').where('name', 'like', `%${query}%`);
    } else if (id) {
      return knex('categories').where({ id });
    } else {
      return knex.select('*').from('categories');
    }
  },
  // products
  products(parent, args, { knex }, info) {
    const { query, id, selected } = args;
    console.log('FROM PRObbbbDUCTS', args);
    if (query) {
      return knex('products').where('name', 'like', `%${query}%`);
    } else if (id) {
      return knex('products').where({ id });
    } else if (selected) {
      const productsNameArr = selected.map(product => {
        return product.name;
      });
      return knex('products')
        .join('stores', 'products.store_id', 'stores.id')
        .select(
          'stores.id as store_id',
          'stores.name as store_name',
          'products.id as id',
          'products.name as name',
          'products.description as description',
          'products.price as price',
          'products.image as image'
          // 'products.quantity as product_quantity'
        )
        .whereIn('products.name', productsNameArr)
        .then(result => {
          console.log(result);
          return result;
        });
    } else {
      return knex
        .select('*')
        .from('products')
        .join('stores', 'stores.id', 'products.store_id')
        .min('product.price');
    }
  },
  //shoppingCart
  shoppingCart(parent, args, { knex }, info) {
    console.log('FROM SHOPPING CART', args);
    return (
      knex('products')
        .select('*')
        .join('user_cart_items', 'products.id', 'user_cart_items.product_id')
        //.join('users', 'user_cart_items.user_id', 'users.id')
        .where('user_cart_items.user_id', args.id)
    );
  }
};

module.exports = Query;
