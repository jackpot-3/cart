const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
let writer = csvWriter({
  headers: ['name', 'price', 'stock', 'onList', 'rating', 'numOfRatings', 'relatedItems', 'constimgUrl']
});


writer.pipe(fs.createWriteStream('NewSeedData.csv'));

for (let i = 0; i < 10000000; i += 1) {
  const data = [];
  
  data.push(faker.commerce.productName());
  data.push(faker.commerce.price(3, 10000, 2));
  data.push(faker.random.number({min: 0,max: 30}));
  data.push(faker.random.boolean());
  data.push(faker.random.number({min: 0,max: 5}));
  data.push(faker.random.number({min: 0,max: 1000}));
  data.push(JSON.stringify([faker.random.number({min: 1, max: 100 }), faker.random.number({min: 1,max: 100}), 
    faker.random.number({min: 1,max: 100})]));
  data.push(faker.image.fashion(200, 200, true));
  writer.write(data)
}
writer.end()