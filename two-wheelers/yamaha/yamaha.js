const Nightmare = require('nightmare');
const cheerio = require('cheerio');
const nightmare = Nightmare({show: true});
const vo = require('vo');
const fs = require('fs');
const cities = require('./yamaha-cities-list');
const url = 'https://www.yamaha-motor-india.com/yamaha-dealers.html';

const fileName = `yamaha-dealers.csv`;
const headers = `"Dealer Name","Address","City","State","Contact 1","Contact 2"\n`;
fs.writeFileSync(fileName, headers, (err) => {if (err) throw err;})

const getDealers = (html, city, state) => {
  const $ = cheerio.load(html);
  const dealers = $('.dealer-item');
  const totalDealers = dealers.length;
  let write = '';

  for(let i = 0; i < totalDealers; i++) {
    let dealer = dealers[i];
    let dealerName = $(dealer).find('.d-name').text().trim().replace(/"/g,'""');
    let address = $(dealer).find('p:nth-child(2)').text().trim().replace(/"/g,'""').replace(/[\r\n]+/g," ");
    let contact1 = $(dealer).find('p:nth-child(3)').text();
    let contact2 = $(dealer).find('p:nth-child(4)').text();
    contact1 = contact1 ? contact1.trim().replace(/"/g,'""') : '';
    contact2 = contact2 ? contact2.trim().replace(/"/g,'""') : '';

    write += `"${dealerName}","${address}","${city}","${state}","${contact1}","${contact2}"\n`;
  }
  fs.appendFileSync(fileName, write, (err) => {if (err) throw err;});
}

vo(run)(function(err) {
  if (err) throw err
});

function* run() {
  yield nightmare.goto(url);

  let results = yield * forEach(cities, gen);
  for (let i in results) {
    getDealers(results[i].html, results[i].city, results[i].state);
  }
  yield nightmare.end();
}

function* gen(city, index) {
  console.log(index + 1 + '.', city);
  let value = yield nightmare.goto(`https://www.yamaha-motor-india.com/yamaha-dealers-showrooms-in-${city}.html`)
  .wait('#dealer_list')
  .evaluate(() => {
    const state = document.querySelector('#state-group .btn.dropdown-toggle.btn-default span.filter-option.pull-left').textContent.trim();
    const city = document.querySelector('#city-group .btn.dropdown-toggle.btn-default span.filter-option.pull-left').textContent.trim();
    const html = document.querySelector('#dealer_list').innerHTML;
    return {state, city, html};
  });
  
  return value;
}

function* forEach(arr, fn) { // NEEDED BECAUSE FOREACH DOESN'T WORK IN GENERATORS
  let results = [];
  for (let i = 0; i < arr.length; i++) {
    results.push(yield * fn(arr[i], i));
  }
  return results;
}