const fetch = require('node-fetch');
const fs = require('fs');
const dealers = require('./renault-dealers-list');
const totalDealers = dealers.length;

const titleCase = (str) => {
  let splitStr = str.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }
  return splitStr.join(' '); 
}

const getDealers = async () => {
  const headers = `"Dealer Name","Address","City","State","Pincode","Contact"\n`;
  const fileName = 'renault-dealers.csv';
  let write = [];
  fs.writeFileSync(fileName, headers, (err) => {if (err) throw err;})
  const apiUrl = 'http://www.postalpincode.in/api/pincode/';

  for (i = 0; i < totalDealers; i++) {
    let dealer = dealers[i];
    let pincode = dealer.address.postalCode.replace(' ', '');
    let response = await fetch(apiUrl + pincode);
    let data = await response.json();
    let state = '';
    if (data.Status == 'Success') {
      state = data.PostOffice[0].State;
    }
    let address = dealer.address.addressLine1 && dealer.address.addressLine1.trim() ? dealer.address.addressLine1.trim() : '';
    address = dealer.address.addressLine2 && dealer.address.addressLine2.trim() ? address + ', ' + dealer.address.addressLine2.trim() : address;
    address = address.replace(/"/g,'""').replace(/[\r\n]+/g," ").replace(/^, /,'').replace(/,\s?,/g, ',');
    dealer.address.city = titleCase(dealer.address.city);
    console.log(i + 1 + '. State: "' + state + '", City: "' + dealer.address.city + '"');

    write.push(`"${dealer.name.replace(/"/g,'""').replace(/[\r\n]+/g," ")}","${address}","${dealer.address.city}","${state}","${pincode}","${dealer.contact ? dealer.contact.phone : ''}"`);
    if (i % 50 == 0) {
      let temp = write.join('\n') + '\n';
      fs.appendFileSync(fileName, temp, (err) => {if (err) throw err;})
      write = [];
    }
  };

  let temp = write.join('\n') + '\n';
  fs.appendFileSync(fileName, temp, (err) => {if (err) throw err;})
}

getDealers();