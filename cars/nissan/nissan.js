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
const stateCities = require('./nissan-cities-list');
const url = 'https://dealers.nissan.in/location/';

const fileName = `nissan-dealers.csv`;
const headers = `"Dealer Name","Address","City","State","Contact"\n`;
fs.writeFileSync(fileName, headers, (err) => {if (err) throw err;});

const getDealers = (html, city, state) => {
  if (!html.trim()) return;
  const $ = cheerio.load(html);
  const dealers = $('.border-manage.store-info-box');
  const totalDealers = dealers.length;
  let write = '';

  for(let i = 0; i < totalDealers; i++) {
    let dealer = dealers[i];
    let dealerName = $(dealer).find('.store_name>a>b').text().trim().replace(/"/g,'""').replace(/[\r\n]+/g," ");
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

const checkDealers = () => {
  for (let i = 10; i <= 10000; i += 10) {
    if (document.querySelector('.mid-store-locator')) {
      return true;
    } else if (document.querySelector('.no-outlets-message')) {
      return true
    }
    setTimeout(() => {}, i);
  }

  return true;
}

function* gen(city, state) {
  let data = yield nightmare.goto(url + state + '/' + city + '?cot=33')
  .wait(checkDealers)
  .evaluate(() => {
    const state = document.querySelector('#OutletState option[selected]').textContent.trim();
    const city = document.querySelector('#OutletCity option[selected]').textContent.trim();
    const html = document.querySelector('.mid-store-locator') ? document.querySelector('.mid-store-locator').innerHTML : '';
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