const fs = require('fs');
const dealers = require('./jeep-dealers-list');
const totalDealers = dealers.length;
const headers = `"Dealer Name","Address","City","State","Pincode","Contact","Email"\n`;
const fileName = 'jeep-dealers.csv';
let write = [];
fs.writeFileSync(fileName, headers, (err) => {if (err) throw err;})

for (i = 0; i < totalDealers; i++) {
  let dealer = dealers[i];
  write.push(`"${dealer.dealerName.replace(/"/g,'""').replace(/[\r\n]+/g," ").replace(' - Showroom', '')}","${dealer.dealerAddress1.replace(/"/g,'""').replace(/[\r\n]+/g," ")}","${dealer.dealerCity || ''}","${dealer.dealerState || ''}","${dealer.dealerZipCode || ''}","${dealer.phoneNumber || ''}","${dealer.demail || ''}"`);
  if (i%50 == 0) {
    let temp = write.join('\n') + '\n';
    fs.appendFileSync(fileName, temp, (err) => {if (err) throw err;})
    write = [];
  }
};

let temp = write.join('\n') + '\n';
fs.appendFileSync(fileName, temp, (err) => {if (err) throw err;})
write = [];