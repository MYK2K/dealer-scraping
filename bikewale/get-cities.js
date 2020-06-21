const Nightmare = require('nightmare');
const nightmare = Nightmare({
  show: true,
  webPreferences: {
    images: false
  }
});
const cheerio = require('cheerio');
const fs = require('fs');

const companyId = process.argv[2];  // Pass the companyId as first parameter when executing the script
const fileName = companyId + '/state-cities.js';
const url = 'https://www.bikewale.com/dealer-showrooms/' + companyId;

const getCities = html => {
  const $ = cheerio.load(html);
  const data = [];
  const cities = $('.location-list-city > li');
  const totalCities = cities.length;
  for (let i = 0; i < totalCities; i++) {
    let element = $(`.location-list-city > li:nth-child(${i + 1}) > a`);
    let name = element.text().trim().replace(/\s\(\d+\)/, '');
    let url = element.attr('data-link');
    let latitude = parseFloat(element.attr('data-lat'));
    let longitude = parseFloat(element.attr('data-long'));
    data.push({name, url, latitude, longitude});
  }

  return data;
}

const getData = html => {
  const $ = cheerio.load(html);
  const stateCities = [];
  const states = $('.item-state');
  const totalStates = states.length;
  for (let i = 0; i < totalStates; i++) {
    let state = states[i];
    let element = $(state).find('.type-state');
    let name = element.text().trim();
    let latitude = parseFloat(element.attr('data-lat'));
    let longitude = parseFloat(element.attr('data-long'));
    let citiesHtml = $(`.item-state:nth-child(${i + 1})`).html();
    stateCities.push({name, latitude, longitude, cities: getCities(citiesHtml)});
  }

  const write = 'module.exports = ' + JSON.stringify(stateCities);
  fs.writeFileSync(fileName, write, (err) => {if (err) throw err;});
}

nightmare
  .goto(url)
  .wait('#location-list')
  .evaluate(() => document.querySelector('#location-list').innerHTML)
  .end()
  .then(response => {
    getData(response);
  }).catch(err => {
    console.error(err);
  });