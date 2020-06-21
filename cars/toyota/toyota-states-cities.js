const fetch = require('node-fetch');
const fs = require('fs');
const {parseString: parseXml} = require('xml2js');

const getStatesCities = async () => {
  const states = require('./toyota-states-list');
  const totalStates = states.length;
  let statesCities = [];
  
  for (let i = 0; i < totalStates; i++) {
    let state = states[i];
    let apiUrl = `https://webapi.toyotabharat.com/1.0/api/businessstates/${state.Id}/businesscities`;
    let response = await fetch(apiUrl, {method: 'POST'});
    let xml = await response.text();

    statesCities.push({
      id: state.Id,
      name: state.Name,
      cities: []
    });
    stateCities = statesCities[i].cities;
    parseXml(xml, function (err, cities) {
      cities = cities.Cities.City;
      for (let j in cities) {
        let city = cities[j];
        stateCities.push({
          id: city.Id[0],
          name: city.Name[0]
        });
      }
    });
  }

  const fileName = 'toyota-states-cities-list.js';
  const data = `module.exports = ${JSON.stringify(statesCities)}`;
  fs.writeFileSync(fileName, data, (err) => { if (err) throw err; })
}

getStatesCities();