require('newrelic');
const express = require('express');
const cassandra = require('cassandra-driver')
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('../database/indexCassandra.js');
const port = 3004;

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`${port} we hear you!`);
  }
});


const client = new cassandra.Client({contactPoints: ['127.0.0,1'], keyspace: 'sunchamps_dev'})

app.use(cors());
app.use('/:id', express.static(path.join(__dirname, '/../client/dist')));
app.use(bodyParser.json());

app.get('/items/:id', (req, res) => {
  // const table = findTable(req.params.id);
  db.getItem(req.params.id)
  .then(result => {
    console.log('result', result)
    res.send(result);
  })
  .catch(err => {
    res.send(err);
  });
});

// app.get('/items/:id', (req, res) => {
//   client.execute(`SELECT * FROM items WHERE item_id = ${req.params.id}`, (err, results) => {
//     if (err) {
//       return res.send(err);
//     }
//     res.send(results);
//   });
// });
// // add a route to get just the review rating
// app.get('/cart', (req, res) => {
//   client.execute('SELECT items.item_id, name, price, rating, numOfRatings, imgUrl FROM items INNER JOIN cartItems ON items.item_id = cartItems.item_id', (err, results) => {
//     if (err) {
//       return res.send(err);
//     }
//     res.send(results);4
//   });
// });

// app.get('/items/:id/related', (req, res) => {
//   client.execute(`SELECT * FROM ${req.params.category} where item_id = `\\
//       some id based on what i calculate later\\ `limtit 3`, (err, results) => {
//     if (err) {
//       return res.send(err);
//     }
//     let related = JSON.parse(results[0].relatedItems);
//   });
// });

// app.post('/cart/:id', (req, res) => {
//   client.execute(`INSERT INTO cartItems (item_id, quantity) values (${req.params.id}, ${req.body.quantity})`, (err) => {
//     if (err) {
//       return res.send(err);
//     }
//     res.send();
//   });
// });

// app.patch('/items/:id/list', (req, res) => {
//   client.execute(`UPDATE items SET onList = true WHERE item_id = ${req.params.id}`, (err) => {
//     if (err) {
//       return res.send(err);
//     } else {
//       res.send('updated');
//     }
//   });
// });

module.exports = app;
