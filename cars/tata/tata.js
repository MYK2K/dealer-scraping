const fetch = require('node-fetch');
const fs = require('fs');
const statesCities = require('./tata-states-cities-list');

const titleCase = (str) => {
  let splitStr = str.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }
  // Directly return the joined string
  return splitStr.join(' '); 
}

const getDealers = async () => {
  const headers = `"Dealer Name","Address","City","State","Pincode","Contact","Email"\n`;
  const fileName = 'tata-dealers.csv';
  fs.writeFileSync(fileName, headers, (err) => {if (err) throw err;});
  const apiUrl = 'http://dealerlocator.tatamotors.com:8080/tmdealerlocator/json/budealers?buType=CARS%2FUVs&locType=Vehicle+Showroom&';
  let dealerIds = [];
  let count = 0;

  for (let state in statesCities) {
    let cities = statesCities[state];
    for (let i in cities) {
      let city = cities[i];
      let response = await fetch(apiUrl + `state=${encodeURIComponent(state)}&city=${encodeURIComponent(city)}`);
      let {dealerList: dealers} = await response.json();
      let write = '';

      city = titleCase(city);
      state = titleCase(state);

      console.log(++count + '. State: "' + state + '", City: "' + city + '"');
      for (let j in dealers) {
        let dealer = dealers[j];
        if (dealerIds.includes(dealer.id.trim().toLowerCase())) continue;
        dealerIds.push(dealer.id.trim().toLowerCase());
        let address = dealer.address1 && dealer.address1.trim() ? dealer.address1.trim() : '';
        address = dealer.address2 && dealer.address2.trim() ? address + ', ' + dealer.address2.trim() : address;
        address = address.replace(/"/g,'""').replace(/[\r\n]+/g," ");
        write += `"${dealer.orgName}","${address}","${city}","${state}","${dealer.zipCode || ''}","${dealer.phone || ''}","${dealer.email || ''}"\n`;
      }

      if (write) fs.appendFileSync(fileName, write, (err) => {if (err) throw err;});
    }
  }
}

getDealers();