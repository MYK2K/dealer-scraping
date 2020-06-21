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
const companyId = process.argv[2];
const stateCities = require('./' + companyId + '/state-cities');

const fileName = `${companyId}/${companyId}-dealers.csv`;
const headers = `"Dealer Name","Address","City","State","Contact"\n`;
fs.writeFileSync(fileName, headers, (err) => {if (err) throw err;});

const getDealers = (html, city, state) => {
  const $ = cheerio.load(html);
  const dealers = $('.dealer-card-target');
  const totalDealers = dealers.length;
  let write = '';

  for(let i = 0; i < totalDealers; i++) {
    let dealer = dealers[i];
    let dealerName = $(dealer).attr('data-dealername').trim().replace(/"/g,'""').replace(/[\r\n]+/g," ");
    let address = $(dealer).attr('data-address').trim().replace(/"/g,'""').replace(/[\r\n]+/g," ");
    let contact = $(dealer).attr('data-item-number').trim().replace(/"/g,'""').replace(/[\r\n]+/g," ").replace(',', ', ');
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

function* gen(city, state, url) {
  let data = yield nightmare.goto(url)
  .wait('#dealersList')
  .evaluate((city, state) => {
    const html = document.querySelector('#dealersList').innerHTML;
    return {city, state, html};
  }, city, state);
  
  return data;
}

function* forEach(states, fn) { // NEEDED BECAUSE FOREACH DOESN'T WORK IN GENERATORS
  let results = [];
  for (let i in states) {
    let state = states[i];
    let stateName = state.name;
    let cities = state.cities;
    for (let i in cities) {
      let city = cities[i];
      let cityName = city.name;
      let url = city.url;
      results.push(yield * fn(cityName, stateName, url));
    }
  }
  return results;
}