const fetch = require('node-fetch');
const fs = require('fs');

const getStatesCities = async () => {
  const states = [
    'ANDAMAN',
    'ANDHRA PRADESH',
    'ARUNACHAL PRADESH',
    'ASSAM',
    'BIHAR',
    'CHANDIGARH',
    'CHHATTISGARH',
    'DADRA  HAVELI',
    'DAMAN',
    'DELHI',
    'GOA',
    'GUJARAT',
    'HARYANA',
    'HIMACHAL PRADESH',
    'JAMMU',
    'JHARKHAND',
    'KARNATAKA',
    'KERALA',
    'LAKSHADWEEP',
    'MADHYA PRADESH',
    'MAHARASHTRA',
    'MANIPUR',
    'MEGHALAYA',
    'MIZORAM',
    'NAGALAND',
    'ORISSA',
    'PONDICHERRY',
    'PUNJAB',
    'RAJASTHAN',
    'SIKKIM',
    'TAMIL NADU',
    'TELANGANA',
    'TRIPURA',
    'UTTAR PRADESH',
    'UTTARAKHAND',
    'WEST BENGAL'
  ];
  const totalStates = states.length;
  const apiUrl = 'http://dealerlocator.tatamotors.com:8080/tmdealerlocator/json/getCityJSON?state=';
  let statesCities = {};

  for (let i = 0; i < totalStates; i++) {
    let state = states[i];
    let response = await fetch(apiUrl + state);
    let {cityList: cities} = await response.json();
    statesCities[state] = [];

    for (let j in cities) {
      statesCities[state].push(cities[j]);
    }
  }

  const fileName = 'tata-states-cities-list.js';
  const data = `module.exports = ${JSON.stringify(statesCities)}`;
  fs.writeFileSync(fileName, data, (err) => { if (err) throw err; })
}

getStatesCities();