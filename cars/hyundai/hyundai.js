const fetch = require('node-fetch');
const fs = require('fs');
const cities = require('./hyundai-cities-list');

const getDealers = async () => {
  const headers = `"Dealer Name","Address","City","State","Pincode","Phone 1","Phone 2","Mobile 1","Mobile 2","Email 1","Email 2","Email 3"\n`;
  const fileName = 'hyundai-dealers.csv';
  fs.writeFileSync(fileName, headers, (err) => {if (err) throw err;});

  const totalCities = cities.length;
  const apiUrl = 'https://api.hyundai.co.in/service/dealer/getDealers?dealerCategoryId=1&loc=IN&lan=en&cityId=';

  for (let i = 0; i < totalCities; i++) {
    let city = cities[i];
    let response = await fetch(apiUrl + city.id);
    let dealers = await response.json();
    let write = '';
    console.log(city.name);

    for (let j in dealers) {
      let dealer = dealers[j];
      if(dealer.phone1) dealer.phone1 = dealer.stdCode + dealer.phone1;
      if(dealer.phone2) dealer.phone2 = dealer.stdCode + dealer.phone2;
      let address = dealer.address1 && dealer.address1.trim() ? dealer.address1.trim() : '';
      address = dealer.address2 && dealer.address2.trim() ? address + ', ' + dealer.address2.trim() : address;
      address = address.replace(/"/g,'""').replace(/[\r\n]+/g," ");
      write += `"${dealer.dealerName}","${address}","${dealer.city || ''}","${dealer.state}","${dealer.postCode || ''}","${dealer.phone1 || ''}","${dealer.phone2 || ''}","${dealer.mobile1 || ''}","${dealer.mobile2 || ''}","${dealer.email1 || ''}","${dealer.email2 || ''}","${dealer.email3 || ''}"\n`;
    }
    fs.appendFileSync(fileName, write, (err) => {if (err) throw err;});
  }
}

getDealers();