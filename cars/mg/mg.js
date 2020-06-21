const Nightmare = require('nightmare');
const cheerio = require('cheerio');
const vo = require('vo');
const fs = require('fs');
const getStateCity = require('../../resources/functions/get-state-city');
const stateCities = require('../../resources/data/indian-districts');
const nightmare = Nightmare({
  show: true,
  webPreferences: {
    images: false
  }
});
const url = 'https://www.mgmotor.co.in/tools/dealers';

const fileName = `mg-dealers.csv`;
const headers = `"Dealer Name","Address","City","State","Contact"\n`;
fs.writeFileSync(fileName, headers, (err) => {if (err) throw err;});
let addresses = [];

const getDealers = async (html, city, state) => {
  const $ = cheerio.load(html);
  const dealers = $('li');
  const totalDealers = dealers.length;
  let write = '';

  for(let i = 0; i < totalDealers; i++) {
    let dealer = dealers[i];
    let address = $(dealer).find('.dealer-Address:nth-of-type(1)').text().trim();
    if (addresses.includes(address)) continue;
    addresses.push(address);
    address = address.replace(/"/g,'""').replace(/[\r\n]+/g," ");
    let pincode = address.match(/(?:\d{6}$|\d{3}\s+\d{3}$|\d{6}|\d{3}\s+\d{3})/);
    pincode = pincode ? pincode[0].replace(' ', '') : '';
    let state = '';
    let city = '';
    if (pincode) {
      let temp = await getStateCity.byPincode(pincode);
      state = temp.state;
      city = temp.city;
    }

    if (pincode && (!city || !state)) {
      let temp = address.replace(/(?:\s-\s\d{6}$|\s-\s\d{3}\s+\d{3}$|\s-\s\d{6}|\s-\s\d{3}\s+\d{3})/, '').split(',');
      state = temp.pop().trim();
      city = temp.pop().trim();
    }
    console.log('State: "' + state + '", City: "' + city + '"');
    let dealerName = $(dealer).find('h2').text().trim().replace(/"/g,'""').replace(/[\r\n]+/g," ");
    let contact = $(dealer).find('.dealer-Address:nth-of-type(2)').text().trim();
    contact = contact ? contact.replace('Phone:', '').trim().replace(/"/g,'""').replace(/[\r\n]+/g," ") : '';

    write += `"${dealerName}","${address}","${city}","${state}","${contact}"\n`;
  }
  fs.appendFileSync(fileName, write, (err) => {if (err) throw err;});
}

vo(run)(function(err) {
  if (err) throw err
});

function* run() {
  yield nightmare.goto(url)
    .wait('#showResults');

  let results = yield * forEach(stateCities, gen);
  for (let i in results) {
    getDealers(results[i].html, results[i].city, results[i].state);
  }
  yield nightmare.end();
}

// const checkUpdate = () => {
//   if (!window.lastDealers) window.lastDealers = document.querySelector('#places').innerText.replace(/[\r\n\s\t]+/g,"");
//   for (let i = 10; i <= 25000; i += 10) {
//     if (document.querySelector('#places')) {
//       let text = document.querySelector('#places').innerText.replace(/[\r\n\s\t]+/g,"");
//       if (text && text != window.lastDealers) {
//         console.log('lastDealers', lastDealers);
//         window.lastDealers = text;
//         return true;
//       }
//     }
//     setTimeout(() => {}, 10); // wait for 10ms
//   }
// }

const checkUpdate = (city) => {
  let date = new Date();
  if (!window.lastTime) {
    window.lastTime = date.getTime();
  }
  if (!window.lastCity) {
    window.lastCity = 'NONE';
  }
  let currentTime = date.getTime();
  if (city != window.lastCity && currentTime - window.lastTime > 10000) {
    $('#showResults').click();
    window.lastCity = city;
  }
  if (currentTime - window.lastTime > 10000) {
    window.lastTime = currentTime;
  }
  if (!window.addresses) {
    window.addresses = [
      'A1/1, PRASHANT VIHAR  OUTER RING ROAD, Delhi, Delhi - 110085',
      'Plot no 31, Najafgarh Road  Industrial Area Shivaji Marg, Delhi, Delhi - 110015',
      'A-2/5, Safdarjung Enclave  , Delhi, Delhi - 110029',
      'A-14, Ring Road, Lajpat Nagar- IV  , Delhi, Delhi - 110024',
      'Plot no 24, Patparganj Industrial Area  , Delhi, Delhi - 110092'
    ];
  };

  const checkAddress = () => {
    const oldCount = window.addresses.length;
    const dealers = $('#places>li');
    const totalDealers = dealers.length;
    if (totalDealers < 5) {
      // console.log('failed 1');
      setTimeout(checkAddress, 1000)
    };
    let tempAddresses = [];
    let matched = 0;
    for(let i = 0; i < totalDealers; i++) {
      let dealer = dealers[i];
      let address = $(dealer).find('.dealer-Address:nth-of-type(1)').text().trim();
      tempAddresses.push(address);
      if (window.addresses.includes(address)) matched++;
    }
    if (matched == oldCount) {
      // console.log('failed 2');
      setTimeout(checkAddress, 1000)
    } else {
      window.addresses = tempAddresses;
      return true;
    }
  }

  if(checkAddress() === true) return true;
}

function* gen(city, district, state) {
  let data = yield nightmare.insert('#pac-input', '')
  .insert('#pac-input', city)
  .click('#showResults')
  // .wait(checkUpdate, city)
  .wait(5000)
  .evaluate((district, state) => {
    const html = document.querySelector('#places').innerHTML;
    return {city: district, state, html}
  }, district, state);
  
  return data;
}

function* forEach(states, fn) { // NEEDED BECAUSE FOREACH DOESN'T WORK IN GENERATORS
  let results = [];
  for (let i in states) {
    let data = states[i];
    city = data.District + ', ' + data.State + ', India';
    results.push(yield * fn(city, data.District, data.State));

    // if (i == 2) break;
  }
  return results;
}