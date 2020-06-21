const Nightmare = require('nightmare');
const cheerio = require('cheerio');
const nightmare = Nightmare({show: true});
const vo = require('vo');
const fs = require('fs');

const url = 'https://www.yamaha-motor-india.com/yamaha-dealers.html';
let CITIES = [];

const getCities = (html) => {
  const $ = cheerio.load(html);
  const cities = $('option');
  const totalCities = cities.length;

  for(let i = 1; i < totalCities; i++) {
    let city = cities[i];
    CITIES.push($(city).attr('value'));
  }
}

vo(run)(function(err) {
  if (err) throw err
});

function* run() {
  yield nightmare.goto(url);
  const totalStates = 34;
  let results = yield * forEach(totalStates, gen);
  for (let i in results) {
    getCities(results[i]);
  }
  
  const fileName = `yamaha-cities-list.js`;
  const data = `module.exports = ${JSON.stringify(CITIES)}`;
  fs.writeFileSync(fileName, data, (err) => {if (err) throw err;})

  yield nightmare.end();
}

function* gen(state) {
  let value = yield nightmare.wait('#state_list .dropdown-menu')
  .click('#state_list .btn.dropdown-toggle.btn-default')
  .click(`#state_list .dropdown-menu.inner > li[data-original-index="${state}"] > a`)
  .wait(300)
  .evaluate(() => document.querySelector('#city').innerHTML)
  
  return value;
}

function* forEach(count, fn) { // NEEDED BECAUSE FOREACH DOESN'T WORK IN GENERATORS
  let results = [];
  for (let i = 1; i <= count; i++) {
    results.push(yield * fn(i));
  }
  return results;
}