const states = require('./bajaj-ktm-states-cities').Pb.Sales;
const subDealers = require('./bajaj-ktm-subDealers');
const fs = require('fs');
const headers = `"Dealer Name","Type","Address","City","State","Pincode","Contact","Email"\n`;
const fileName = 'ktm-dealers.csv';
fs.writeFileSync(fileName, headers, (err) => {if (err) throw err;})


for (let i in states) {
  let write = [];
  let cities = states[i];
  for (let j in cities) {
    let city = cities[j];
    for (let k in city) {
      let dealer = city[k];
      write.push(`"${dealer.dealer_name}","Dealer","${dealer.addressline1}, ${dealer.addressline2}","${dealer.city || ''}","${dealer.state}","${dealer.pincode}","${dealer.showroom_mobile || ''}","${dealer.email || ''}"`);
      let subDealer = subDealers.filter((sub) => {
        if(sub.masterDealerCode == dealer.dealer_code) {
          return sub;
        }
      });
      if (subDealer.length) {
        for (let l in subDealer) {
          let subD = subDealer[l];
          write.push(`"${subD.dealership}","Branch","${subD.address1}, ${subD.address2}, ${subD.address3}, ${subD.address4}","${dealer.city || ''}","${dealer.state}","${subD.pincode}","${subD.branchPhone || ''}","${subD.email || ''}"`);
        }
      }
    }
  }
  let temp = write.join('\n') + '\n';
  fs.appendFileSync(fileName, temp, (err) => {if (err) throw err;})
}