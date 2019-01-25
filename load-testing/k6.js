import http from 'k6/http';

export let options = {
  vus: 300,
  duration: '60s',
  rps: 2000,
};

export default function () {
  let item_id;
  let products = Math.floor(Math.random() * 10) + 1;
  let notPopular = Math.floor(Math.random() * 9999000) + 1000;

  if (products > 8) {
    item_id = notPopular;
  } else {
    item_id = Math.floor(Math.random() * 1000) + 1;
  }
  http.get(`http://localhost:3004/items/${item_id}`);
}