const Nightmare = require('nightmare');
const cheerio = require('cheerio');
const nightmare = Nightmare({
  show: true,
  webPreferences: {
    images: false
  }
});
const vo = require('vo');
const fs = require('fs');
const stateCities = require('./skoda-cities-list');
const url = 'https://dealers.skoda-auto.co.in/location/';

const fileName = `skoda-dealers.csv`;
const headers = `"Dealer Name","Address","City","State","Contact"\n`;
fs.writeFileSync(fileName, headers, (err) => {if (err) throw err;});

const getDealers = (html, city, state) => {
  const $ = cheerio.load(html);
  const dealers = $('.border-manage.store-info-box');
  const totalDealers = dealers.length;
  let write = '';

  for(let i = 0; i < totalDealers; i++) {
    let dealer = dealers[i];
    let dealerType = $(dealer).find('.cot-amenity_icon .cot-amenity>span').text().trim().toLowerCase();
    if (!dealerType.includes('sales')) continue;
    let dealerName = $(dealer).find('.mid-store-locator_five.store_alternateName').text().trim().replace(/"/g,'""').replace(/[\r\n]+/g," ");
    let address = $(dealer).find('.store_address > div > span:first-child').text().trim();
    address = $(dealer).find('.store_address > div > span:nth-child(3)').text() ? address + ', ' + $(dealer).find('.store_address > div > span:nth-child(3)').text().trim() : address;
    address = $(dealer).find('.store_address > div > span:nth-child(5)').text() ? address + ', ' + $(dealer).find('.store_address > div > span:nth-child(5)').text().trim() : address;
    address = address.replace(/"/g,'""').replace(/[\r\n]+/g," ");
    let contact = $(dealer).find('.store_phone').text();
    contact = contact ? contact.trim().replace(/"/g,'""') : '';

    write += `"${dealerName}","${address}","${city}","${state}","${contact}"\n`;
  }
  fs.appendFileSync(fileName, write, (err) => {if (err) throw err;});
}

vo(run)(function(err) {
  if (err) throw err
});

function* run() {
  yield nightmare;

  let results = yield * forEach(stateCities, gen);
  for (let i in results) {
    getDealers(results[i].html, results[i].city, results[i].state);
  }
  yield nightmare.end();
}

function* gen(city, state) {
  let data = yield nightmare.goto(url + state + '/' + city)
  .wait('.mid-store-locator')
  .evaluate(() => {
    const state = document.querySelector('#OutletState option[selected]').textContent.trim();
    const city = document.querySelector('#OutletCity option[selected]').textContent.trim();
    const html = document.querySelector('.mid-store-locator').innerHTML;
    return {state, city, html};
  });
  
  return data;
}

function* forEach(states, fn) { // NEEDED BECAUSE FOREACH DOESN'T WORK IN GENERATORS
  let results = [];
  for (let state in states) {
    let cities = states[state];
    for (let i in cities) {
      let city = cities[i];
      results.push(yield * fn(city.id, state));
    }
  }
  return results;
}