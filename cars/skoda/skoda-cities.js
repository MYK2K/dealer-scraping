const fetch = require('node-fetch');
const fs = require('fs');

const getCities = async () => {
  const states = [
    'andhra-pradesh',
    'bihar',
    'chandigarh',
    'chhattisgarh',
    'delhi',
    'goa',
    'gujarat',
    'haryana',
    'himachal-pradesh',
    'jammu-kashmir',
    'jharkhand',
    'karnataka',
    'kerala',
    'madhya-pradesh',
    'maharashtra',
    'odisha',
    'punjab',
    'rajasthan',
    'tamil-nadu',
    'telangana',
    'uttar-pradesh',
    'uttarakhand',
    'west-bengal'
  ];
  const totalStates = states.length;
  const apiUrl = 'https://dealers.skoda-auto.co.in/getCitiesByMasterOutletIdAndStateName.php?master_outlet_id=67021&state_name=';
  let stateCities = {};

  for (let i = 0; i < totalStates; i++) {
    let state = states[i];
    let response = await fetch(apiUrl + state);
    let cities = await response.json();
    stateCities[state] = [];
    for (let id in cities) {
      stateCities[state].push({id, name: cities[id]});
    }
  }

  const fileName = 'skoda-cities-list.js';
  const data = `module.exports = ${JSON.stringify(stateCities)}`;
  fs.writeFileSync(fileName, data, (err) => { if (err) throw err; })
}

getCities();