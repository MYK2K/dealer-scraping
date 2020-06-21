const fetch = require('node-fetch');
const fs = require('fs');

const getCities = async () => {
  let CITIES = [];
  const totalStates = 36;
  const apiUrl = 'https://api.hyundai.co.in/service/dealer/getCities?dealerCategory=1&loc=IN&lan=en&stateId=';

  for (let i = 1; i <= totalStates; i++) {
    let response = await fetch(apiUrl + i);
    let cities = await response.json();
    for (let j in cities) {
      CITIES.push({
        id: cities[j].id,
        name: cities[j].description
      });
    }
  }

  const fileName = 'hyundai-cities-list.js';
  const data = `module.exports = ${JSON.stringify(CITIES)}`;
  fs.writeFileSync(fileName, data, (err) => { if (err) throw err; })
}

getCities();