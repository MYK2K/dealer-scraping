const fs = require('fs');
const dealers = require('./volkswagen-dealers-list');
const totalDealers = dealers.length;
const headers = `"Dealer Name","Address","City","State","Pincode","Contact","Email"\n`;
const fileName = 'volkswagen-dealers.csv';
let write = [];
fs.writeFileSync(fileName, headers, (err) => {if (err) throw err;})

for (i = 0; i < totalDealers; i++) {
  let dealer = dealers[i];
  write.push(`"${dealer.DealerName.trim().replace(/"/g,'""').replace(/[\r\n]+/g," ")}","${dealer.DealerAddress.trim().replace(/"/g,'""').replace(/[\r\n]+/g," ")}","${dealer.DealerCity || ''}","${dealer.DealerState || ''}","${dealer.DealerPincode.replace(/\s/g, '') || ''}","${dealer.DealerContact || ''}","${dealer.DealerEmail || ''}"`);
  if (i%50 == 0) {
    let temp = write.join('\n') + '\n';
    fs.appendFileSync(fileName, temp, (err) => {if (err) throw err;})
    write = [];
  }
};

let temp = write.join('\n') + '\n';
fs.appendFileSync(fileName, temp, (err) => {if (err) throw err;})
write = [];