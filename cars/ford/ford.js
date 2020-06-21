const fetch = require('node-fetch');
const fs = require('fs');
const cities = require('./capital-coordinates');

const getDealers = async () => {
  const headers = `"Dealer Name","Address","City","State","Pincode","Contact","Email"\n`;
  const fileName = 'ford-dealers.csv';
  fs.writeFileSync(fileName, headers, (err) => {if (err) throw err;});

  const totalCities = cities.length;
  const apiUrl = 'https://spatial.virtualearth.net/REST/v1/data/1652026ff3b247cd9d1f4cc12b9a080b/FordEuropeDealers_Transition/Dealer?$select=*,__Distance&$filter=CountryCode%20Eq%20%27IND%27%20And%20Language%20Eq%20%27en%27%20And%20Brand%20Eq%20%27Ford%27%20And%20HasSalesDepartmentPV%20Eq%20%271%27&$top=10000&$format=json&key=Al1EdZ_aW5T6XNlr-BJxCw1l4KaA0tmXFI_eTl1RITyYptWUS0qit_MprtcG7w2F&spatialFilter=';
  let dealerIds = [];

  for (let i = 0; i < totalCities; i++) {
    let city = cities[i];
    let spatialFilter = `nearby(${city.lat},${city.long},1000)`;
    let response = await fetch(apiUrl + spatialFilter);
    let dealers = await response.json();
    dealers = dealers.d.results || [];
    let write = '';
    console.log(city.name);

    for (let j in dealers) {
      let dealer = dealers[j];
      if (dealerIds.includes(dealer.DealerID.trim().toLowerCase())) continue;
      dealerIds.push(dealer.DealerID.trim().toLowerCase());
      let address = dealer.AddressLine1 && dealer.AddressLine1.trim() ? dealer.AddressLine1.trim() : '';
      address = dealer.AddressLine2 && dealer.AddressLine2.trim() ? address + ', ' + dealer.AddressLine2.trim() : address;
      address = dealer.AddressLine3 && dealer.AddressLine3.trim() ? address + ', ' + dealer.AddressLine3.trim() : address;
      address = dealer.SubLocality && dealer.SubLocality.trim() ? address + ', ' + dealer.SubLocality.trim() : address;
      address = address.replace(/"/g,'""').replace(/[\r\n]+/g," ");
      write += `"${dealer.DealerName.replace(/"/g,'""').replace(/[\r\n]+/g," ")}","${address}","${dealer.Locality || ''}","${dealer.AdministrativeArea || ''}","${dealer.PostCode || ''}","${dealer.PrimaryPhone || ''}","${dealer.PrimaryEmail || ''}"\n`;
    }
    fs.appendFileSync(fileName, write, (err) => {if (err) throw err;});
  }
}

getDealers();