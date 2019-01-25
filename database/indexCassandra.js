const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  keyspace: 'sunchamps_dev',
});
client.connect();

//READ
const getItem = (cat, itemId) => {
  console.log('db', cat, itemId)
  console.log('before query')
  return client.execute("SELECT * FROM sunchamps_dev." + cat + " WHERE id = " + itemId + ";")
    .then(result => {
      console.log('after query', result.rows[0])
      return result.rows[0];
    });
};

const getRelated = (cat, itemId) => {
  var relatedIds = [
    (itemId + 1 % 2000000),
    (itemId + 2 % 2000000),
    (itemId + 3 % 2000000)
  ]
  return client.execute("SELECT * FROM sunchamps_dev." + cat + " WHERE id IN " + relatedIds + ";")
}

//CREATE
const addItem = (
  itemId,
  name,
  price,
  stock,
  onList,
  rating,
  numOfRatings,
  category_id,
  imgUrl,
) => {
  return client
    .execute(
      `INSERT INTO sunchamps_dev.items(item_id, name ,price ,stock ,onList ,rating , numOfRatings, category_id , imgUrl) values (${item_id}, ${name}, ${price}, ${stock}, ${onList}, ${rating}, ${numOfRatings}, ${category_id}, ${imgUrl});`,
    )
    .then(result => {
      return result.rows[0];
    });
};

// // DELETE

const deleteItem = itemId => {
  return client.execute(
    `DELETE FROM cartItems WHERE item_id=${itemId}`.then(result => {
      return result.rows[0];
    }),
  );
};

// //UPDATE
const updateCart = itemId => {
  return client
    .execute(`UPDATE items SET onList = false WHERE id = ${itemId}`)
    .then(result => {
      console.log('added')
  });
};

module.exports = {
  getItem,
  addItem,
  deleteItem,
  updateCart,
  getRelated,
};