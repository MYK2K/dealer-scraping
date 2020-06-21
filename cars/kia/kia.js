const fetch = require('node-fetch');
const fs = require('fs');
const statesCities = require('./kia-states-cities');

const titleCase = (str) => {
  let splitStr = str.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }
  return splitStr.join(' '); 
}

const getDealers = async () => {
  const headers = `"Dealer Name","Address","City","State","Contact"\n`;
  const fileName = 'kia-dealers.csv';
  fs.writeFileSync(fileName, headers, (err) => {if (err) throw err;});
  const apiUrl = 'https://www.kia.com/api/kia2_in/findAdealer.getDealerList.do?dealerType=S&';
  let dealerIds = [];
  let count = 0;

  for (let i in statesCities) {
    let state = statesCities[i].val1;
    let cities = statesCities[i].val2;
    for (let j in cities) {
      let city = cities[j];
      let response = await fetch(apiUrl + `state=${encodeURIComponent(state.key)}&city=${encodeURIComponent(city.key)}`);
      let {data: dealers} = await response.json();
      let write = '';

      console.log(++count + '. State: "' + state.value + '", City: "' + city.value + '"');
      for (let j in dealers) {
        let dealer = dealers[j];
        if (dealerIds.includes(dealer.id.trim().toLowerCase())) continue;
        dealerIds.push(dealer.id.trim().toLowerCase());
        let address = dealer.address1 && dealer.address1.trim() ? dealer.address1.trim() : '';
        address = dealer.address2 && dealer.address2.trim() ? address + ', ' + dealer.address2.trim() : address;
        address = dealer.address3 && dealer.address3.trim() ? address + ', ' + dealer.address3.trim() : address;
        address = address.replace(/"/g,'""').replace(/[\r\n]+/g," ").replace(/^, /,'');
        write += `"${dealer.dealerName}","${address}","${city.value}","${state.value}","${dealer.phone1 || ''}"\n`;
      }

      if (write) fs.appendFileSync(fileName, write, (err) => {if (err) throw err;});
    }
  }
}

getDealers();