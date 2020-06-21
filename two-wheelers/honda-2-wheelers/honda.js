const Nightmare = require('nightmare');
const cheerio = require('cheerio');
const nightmare = Nightmare({show: true});
const vo = require('vo');
const states = require('./honda-states-cities');
const fs = require('fs');

const url = 'https://www.honda2wheelersindia.com/network/dealerLocator';

let stateIndex = process.argv[2];
let state = states[stateIndex];
console.log(state.name, stateIndex);
const fileName = `csv/${state.name}.csv`;
const headers = `"Dealer Name","Contact Person","Address","City","State","Contact 1","Contact 2","Email"\n`;
fs.writeFileSync(fileName, headers, (err) => {if (err) throw err;})

const getData = (html, city) => {
  data = [];
  const $ = cheerio.load(html);
  let dealers = $('.repeat-dealor');
  let totalDealers = dealers.length;
  let write = ``;
  for (i = 0; i < totalDealers; i++) {
    let dealer = dealers[i];

    $(dealer).find('.fa-user').after('contactPerson{');
    $(dealer).find('.fa-user + br').before('}');
    $(dealer).find('.fa-phone').after('phone{');
    $(dealer).find('.fa-phone + br').before('}');
    $(dealer).find('.fa-mobile').after('mobile{');
    $(dealer).find('.fa-mobile + br').before('}');
    
    let dealerName = $(dealer).find('div:first-child>span').text();
    let address = $(dealer).find('div:first-child>p').text();
    let email = $(dealer).find('.fa-envelope').next().text();
    let contactDetails = $(dealer).find('.repeat-dealor-height').html();
    let contactPerson = contactDetails.match('contactPerson\{(.*)\}') ? contactDetails.match('contactPerson\{(.*)\}')[1] : '';
    let contact1 = contactDetails.match('phone\{(.*)\}') ? contactDetails.match('phone\{(.*)\}')[1] : '';
    let contact2 = contactDetails.match('mobile\{(.*)\}') ? contactDetails.match('mobile\{(.*)\}')[1] : '';
    
    dealerName = $('<textarea />').html(dealerName).text().trim().replace(/"/g,'""');
    address = $('<textarea />').html(address).text().trim().replace(/"/g,'""').replace(/[\r\n]+/g," ");
    email = $('<textarea />').html(email).text().trim().replace(/"/g,'""');
    contactPerson = $('<textarea />').html(contactPerson).text().trim().replace(/"/g,'""');
    contact1 = $('<textarea />').html(contact1).text().trim().replace(/"/g,'""');
    contact2 = $('<textarea />').html(contact2).text().trim().replace(/"/g,'""');

    dealerName = (dealerName.toUpperCase() == 'NA' || dealerName.toUpperCase == 'N/A') ? '' : dealerName;
    address = (address.toUpperCase() == 'NA' || address.toUpperCase == 'N/A') ? '' : address;
    email = (email.toUpperCase() == 'NA' || email.toUpperCase == 'N/A') ? '' : email;
    contactPerson = (contactPerson.toUpperCase() == 'NA' || contactPerson.toUpperCase == 'N/A') ? '' : contactPerson;
    contact1 = (contact1.toUpperCase() == 'NA' || contact1.toUpperCase == 'N/A') ? '' : contact1;
    contact2 = (contact2.toUpperCase() == 'NA' || contact2.toUpperCase == 'N/A') ? '' : contact2;

    write += `"${dealerName}","${contactPerson}","${address}","${city}","${state.name}","${contact1}","${contact2}","${email}"\n`;
  }
  fs.appendFileSync(fileName, write, (err) => {if (err) throw err;});
}

vo(run)(function(err) {
  if (err) throw err
});

function* run() {
  yield nightmare.goto(url);

  var results = yield * forEach(state.cities, gen);
  for (let i in results) {
    getData(results[i], state.cities[i].CityName.trim());
  }
  yield nightmare.end();
}

const checkCity = city => {
  for (let i = 10; i <= 10000; i += 10) {
    if (document.querySelector('#lblCity')) {
      if(document.querySelector('#lblCity').innerHTML.trim().toUpperCase().includes(city.CityName.trim().toUpperCase())){
        return true;
      }
    }
    setTimeout(() => {}, i);
  }
}

function* gen(city) {
  let value = yield nightmare.wait('form[action="/network/dealerLocator"]')
  .select('#StateID', state.id)
  .wait(`#CityID>option[value="${city.CityID}"]`)
  .select('#CityID', city.CityID)
  .click('.network-input>button[type="submit"]')
  .wait(checkCity, city)
  .evaluate(() => document.querySelector('#map-link').innerHTML)

  return value;
}

function* forEach(arr, fn) { // NEEDED BECAUSE FOREACH DOESN'T WORK IN GENERATORS
  let i;
  var results = [];
  for (i = 0; i < arr.length; i++) {
    results.push(yield * fn(arr[i]));
  }
  return results;
}