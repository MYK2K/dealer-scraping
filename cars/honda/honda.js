const fs = require('fs');
const dealers = require('./honda-dealers-list');
const totalDealers = dealers.length;
const headers = `"Dealer Name","Address","City","State","Contact","Email"\n`;
const fileName = 'honda-car-dealers.csv';
let write = [];
fs.writeFileSync(fileName, headers, (err) => {if (err) throw err;})

const titleCase = (str) => {
  let splitStr = str.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }
  return splitStr.join(' '); 
}

for (i = 0; i < totalDealers; i++) {
  let dealer = dealers[i];
  write.push(`"${dealer.Name.replace(/"/g,'""').replace(/[\r\n]+/g," ")}","${dealer.Address.replace(/"/g,'""').replace(/[\r\n]+/g," ")}","${dealer.CityName ? titleCase(dealer.CityName) : ''}","${dealer.StateName ? titleCase(dealer.StateName) : ''}","${dealer.Telephone || ''}","${dealer.Email || ''}"`);
  if (i % 50 == 0) {
    let temp = write.join('\n') + '\n';
    fs.appendFileSync(fileName, temp, (err) => {if (err) throw err;})
    write = [];
  }
};

let temp = write.join('\n') + '\n';
fs.appendFileSync(fileName, temp, (err) => {if (err) throw err;})
write = [];