const fetch = require('node-fetch');
const fs = require('fs');
const statesCities = require('./toyota-states-cities-list');
const {parseString: parseXml} = require('xml2js');

const titleCase = (str) => {
  let splitStr = str.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }
  return splitStr.join(' '); 
}

const getDealers = async () => {
  const headers = `"Dealer Name","Address","City","State","Pincode","Contact"\n`;
  const fileName = 'toyota-dealers.csv';
  fs.writeFileSync(fileName, headers, (err) => {if (err) throw err;});
  let dealerIds = [];
  let count = 0;
  
  for (let i in statesCities) {
    let state = statesCities[i];
    let cities = state.cities;
    for (let j in cities) {
      let city = cities[j];
      let apiUrl = `https://webapi.toyotabharat.com/1.0/api/dealers/${state.id}/${city.id}/1`;
      let response = await fetch(apiUrl, {method: 'POST'});
      let xml = await response.text();
      parseXml(xml, function (err, dealers) {
        console.log(++count + '. State: "' + state.name + '", City: "' + city.name + '"');
        dealers = dealers.Dealers.Dealer;
        let write = '';
        for (let j in dealers) {
          let dealer = dealers[j];
          if (dealerIds.includes(dealer.Id[0].trim().toLowerCase())) continue;
          dealerIds.push(dealer.Id[0].trim().toLowerCase());

          let address = dealer.Address1 && dealer.Address1[0].trim() ? dealer.Address1[0].trim() : '';
          address = dealer.Address2 && dealer.Address2[0].trim() ? address + ', ' + dealer.Address2[0].trim() : address;
          address = dealer.Address3 && dealer.Address3[0].trim() ? address + ', ' + dealer.Address3[0].trim() : address;
          address = dealer.Address4 && dealer.Address4[0].trim() ? address + ', ' + dealer.Address3[0].trim() : address;
          address = address.replace(/"/g,'""').replace(/[\r\n]+/g," ").replace(/^, /,'').replace(/,\s?,/g, ',');
          write += `"${dealer.Name[0].replace(/"/g,'""').replace(/[\r\n]+/g," ")}","${address}","${city.name}","${state.name}","${dealer.Pincode ? dealer.Pincode[0] : ''}","${dealer.Phone ? dealer.Phone[0] : ''}"\n`;
        }

        if (write) fs.appendFileSync(fileName, write, (err) => {if (err) throw err;});
      });
    }
  }
}

getDealers();