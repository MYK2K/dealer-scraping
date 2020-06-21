const fetch = require('node-fetch');

const createFile = (dealers) => {
  console.info('Create File')
  const fs = require('fs');
  const totalDealers = dealers.length;
  const headers = `"Dealer Name","Address","City","State","Pincode","Contact","Email"\n`;
  const fileName = 'royal-enfield-dealers.csv';
  let write = [];
  fs.writeFileSync(fileName, headers, (err) => {if (err) throw err;})

  for (i = 0; i < totalDealers; i++) {
    let dealer = dealers[i];
    write.push(`"${dealer.dealerName}","${dealer.addressLine1}, ${dealer.addressLine2 || ''}","${dealer.city || ''}","${dealer.state}","${dealer.pincode}","${dealer.phone || ''}","${dealer.emailId || ''}"`);
    if (i%50 == 0) {
      let temp = write.join('\n') + '\n';
      fs.appendFileSync(fileName, temp, (err) => {if (err) throw err;})
      write = [];
    }
  };

  let temp = write.join('\n') + '\n';
  fs.appendFileSync(fileName, temp, (err) => {if (err) throw err;})
  write = [];
}

const getData = async () => {
  const apiUrl = 'https://api.royalenfield.com/v1/core/dealers/locate-dealers';
  let states = [
    'Andaman & Nicobar Islands',
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chandigarh',
    'Chhattisgarh',
    'Delhi',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu & Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Puducherry',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal'
  ]
  const totalStates = states.length;
  let dealers = [];
  
  for (let i = 0; i < totalStates; i++) {
    console.info(states[i]);
    let body = JSON.stringify({
      country: 'in',
      searchType: 'dealer',
      state: states[i]
    });
    let dealerOptions = {
      method: 'POST',
      body,
      headers: {
        host: 'api.royalenfield.com',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body, 'utf-8')
      }
    };
    let dealerResponse = await fetch(apiUrl, dealerOptions);
    let stateDealers = await dealerResponse.json();
    dealers.push(...stateDealers.data);
    console.info('Done');
  }

  createFile(dealers);
}

getData();