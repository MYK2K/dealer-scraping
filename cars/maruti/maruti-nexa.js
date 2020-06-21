const fs = require('fs');
const dealers = require('./maruti-nexa-dealers-list');
const totalDealers = dealers.length;
const headers = `"Dealer Name","Address","City","State","Contact","Email"\n`;
const fileName = 'maruti-nexa-dealers.csv';
let write = [];
fs.writeFileSync(fileName, headers, (err) => {if (err) throw err;})

for (i = 0; i < totalDealers; i++) {
  let dealer = dealers[i];
  write.push(`"${dealer.dealername}","${dealer.dealeraddress}","${dealer.cityname || ''}","${dealer.statename}","${dealer.dealerphone1 || ''}","${dealer.dealeremail || ''}"`);
  if (i%50 == 0) {
    let temp = write.join('\n') + '\n';
    fs.appendFileSync(fileName, temp, (err) => {if (err) throw err;})
    write = [];
  }
};

let temp = write.join('\n') + '\n';
fs.appendFileSync(fileName, temp, (err) => {if (err) throw err;})
write = [];