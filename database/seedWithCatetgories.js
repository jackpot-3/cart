const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
// const tables = ['cass1', 'cass2', 'cass3', 'cass4', 'cass5'];
const tables = ['cass1', 'cass2', 'cass3', 'cass4', 'cass5'];

for (let i = 0; i < tables.length; i += 1) {
  const writer = csvWriter({ headers: ['id', 'name', 'price', 'stock', 'onList', 'rating', 'numOfRatings', 'relatedItems', 'constimgUrl', 'category'] });
  writer.pipe(fs.createWriteStream(tables[i] + '.csv'));
  for (let j = 0; j < 2000000; j += 1) {
    const data = [];
    data.push(j + 1)
    data.push(faker.commerce.productName());
    data.push(faker.commerce.price(3, 10000, 2));
    data.push(faker.random.number({ min: 0, max: 30 }));
    data.push(faker.random.boolean());
    data.push(faker.random.number({ min: 0, max: 5 }));
    data.push(faker.random.number({ min: 0, max: 1000 }));
    data.push(JSON.stringify([faker.random.number({ min: 1, max: 10000000 }),
      faker.random.number({ min: 1, max: 10000000 }),
      faker.random.number({ min: 1, max: 10000000 })]));
    data.push(faker.image.fashion(200, 200, true));
    data.push(tables[i]);
    writer.write(data);
  }
}

// COPY sunchamps_dev.cat1() FROM '/cat1.csv' WITH HEADER = TRUE;

// CREATE KEYSPACE fivecats WITH replication = { 'class': 'SimpleStrategy', 'replication_factor': 1 };
// CREATE KEYSPACE cat2 WITH replication = {
//   'class': 'SimpleStrategy',
//   'replication_factor': 1
// };
// CREATE KEYSPACE cat3 WITH replication = {
//   'class': 'SimpleStrategy',
//   'replication_factor': 1
// };
// CREATE KEYSPACE cat4 WITH replication = {
//   'class': 'SimpleStrategy',
//   'replication_factor': 1
// };
// CREATE KEYSPACE cat5 WITH replication = {
//   'class': 'SimpleStrategy',
//   'replication_factor': 1
// };

// CREATE TABLE (id UUID PRIMARY KEY, name text);

// CREATE TABLE sunchamps_dev.cass1 (id int PRIMARY KEY, name text, price decimal, stock int, onList boolean, rating int, numOfRatings int, relatedItems text, imgurl text, category text);
// CREATE TABLE sunchamps_dev.cass2 (id int PRIMARY KEY, name text, price decimal, stock int, onList boolean, rating int, numOfRatings int, relatedItems text, imgurl text, category text);
// CREATE TABLE sunchamps_dev.cass3 (id int PRIMARY KEY, name text, price decimal, stock int, onList boolean, rating int, numOfRatings int, relatedItems text, imgurl text, category text);
// CREATE TABLE sunchamps_dev.cass4 (id int PRIMARY KEY, name text, price decimal, stock int, onList boolean, rating int, numOfRatings int, relatedItems text, imgurl text, category text);
// CREATE TABLE sunchamps_dev.cass5 (id int PRIMARY KEY, name text, price decimal, stock int, onList boolean, rating int, numOfRatings int, relatedItems text, imgurl text, category text);


// COPY sunchamps_dev.cass1(id, name, price, stock, onList, rating, numOfRatings, relatedItems, imgUrl, category) FROM '/cass1.csv' WITH csv header;
// \copy cat2(name, price, stock, onList, rating, numOfRatings, relatedItems, imgUrl, category) FROM 'cat2.csv' WITH csv header;
// \copy cat3(name, price, stock, onList, rating, numOfRatings, relatedItems, imgUrl, category) FROM 'cat3.csv' WITH csv header;
// \copy cat4(name, price, stock, onList, rating, numOfRatings, relatedItems, imgUrl, category) FROM 'cat4.csv' WITH csv header;
// \copy cat5(name, price, stock, onList, rating, numOfRatings, relatedItems, imgUrl, category) FROM 'cat5.csv' WITH csv header;

// CREATE TABLE cat5(id SERIAL PRIMARY KEY NOT NULL, name varchar(500) NOT NULL, price NUMERIC NOT NULL, stock SMALLINT NOT NULL, onList BOOLEAN NOT NULL, rating SMALLINT NOT NULL, numOfRatings INTEGER NOT NULL, relatedItems JSON NOT NULL, imgUrl TEXT NOT NULL, category TEXT NOT NULL);



//  INSERT INTO sunchamps_dev.items(id, name, price, stock, onList, rating, numOfRatings, relatedItems, imgUrl, category) VALUES(2000001, 'crazy item name', 134.55, 6, true, 4, 68, '[]', 'url', 'category');

