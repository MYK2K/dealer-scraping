const fetch = require('node-fetch');
const fs = require('fs');

const getCities = async () => {
  const states = [
    'andaman-nicobar-islands',
    'andhra-pradesh',
    'arunachal-pradesh',
    'assam',
    'bihar',
    'chandigarh',
    'chhattisgarh',
    'dadra-nagar-haveli',
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
    'manipur',
    'meghalaya',
    'mizoram',
    'nagaland',
    'odisha',
    'puducherry',
    'punjab',
    'rajasthan',
    'tamil-nadu',
    'telangana',
    'tripura',
    'uttar-pradesh',
    'uttarakhand',
    'west-bengal'
  ];
  const totalStates = states.length;
  const apiUrl = 'https://dealers.nissan.in/getCitiesByMasterOutletIdAndStateName.php?master_outlet_id=76367&state_name=';
  let stateCities = {};

  for (let i = 0; i < totalStates; i++) {
    let state = states[i];
    let response = await fetch(apiUrl + state);
    let cities = await response.json();
    stateCities[state] = [];
    for (let id in cities) {
      stateCities[state].push({ id, name: cities[id] });
    }
  }

  const fileName = 'nissan-cities-list.js';
  const data = `module.exports = ${JSON.stringify(stateCities)}`;
  fs.writeFileSync(fileName, data, (err) => { if (err) throw err; })
}

getCities();