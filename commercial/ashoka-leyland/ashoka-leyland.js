const fs = require('fs');
const fetch = require('node-fetch');
const dealers = require('./ashoka-leyland-dealers-list');
const totalDealers = dealers.length;
const headers = `"Dealer Name","Address","City","State","Contact","Email"\n`;
const fileName = 'ashoka-leyland-dealers.csv';
fs.writeFileSync(fileName, headers, (err) => {if (err) throw err;});

const pincodeApiUrl = 'http://www.postalpincode.in/api/pincode/';
const mapsApiKey = 'AIzaSyAAfN0RhhFfJl7zbs_USrQgYHU2KIVLM8c';
const googleMapsApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?sensor=true&key=${mapsApiKey}&latlng=`;

const getDealers = async () => {
  let write = [];
  for (i = 0; i < totalDealers; i++) {
    let dealer = dealers[i][0];
    let longitude = dealers[i][1];
    let latitude = dealers[i][2];
    let latlng = longitude + ',' + latitude;
    let city = '';
    let state = '';
    let gotFrom = '';
    dealer.address = dealer.address.trim().replace(/"/g,'""').replace(/[\r\n\t]+/g," ");
    let pincode = dealer.address.match(/(?:\d{6}$|\d{3}\s+\d{3}$|\d{6}|\d{3}\s+\d{3})/);
    pincode = pincode ? pincode[0].replace(' ', '') : '';
    
    if (pincode) {
      let pincodeResponse = await fetch(pincodeApiUrl + pincode);
      let data = await pincodeResponse.json();
      if (data.Status == 'Success') {
        city = data.PostOffice[0].District;
        state = data.PostOffice[0].State;
        gotFrom = 'Pincode';
      }
    }
    
    // Get State and City from Google Geocode API
    if (!state || !city) {
      let googleMapsResponse = await fetch(googleMapsApiUrl + latlng);
      let data = await googleMapsResponse.json();
      if (data.status == 'OK') {
        let components = data.results[0].address_components;
        city = components.find(component => component.types.includes('administrative_area_level_2') && component.types.includes('political'));
        state = components.find(component => component.types.includes('administrative_area_level_1') && component.types.includes('political'));
        city = city ? city.long_name : '';
        state = state ? state.long_name : '';
        if (state == 'Delhi') city = 'New Delhi';
        gotFrom = 'Maps';
      }
    }

    console.log(i + 1 + '. State: "' + state + '", City: "' + city + '", Got From: "' + gotFrom + '"');
    write.push(`"${dealer.name.trim().replace(/"/g,'""').replace(/[\r\n\t]+/g," ")}","${dealer.address}","${city}","${state}","${dealer.contact.trim().replace(/"/g,'""').replace(/[\r\n\t]+/g," ")}","${dealer.email.trim().replace(/"/g,'""').replace(/[\r\n\t]+/g," ")}"`);
    if (i !=0 && i%50 == 0) {
      let temp = write.join('\n') + '\n';
      fs.appendFileSync(fileName, temp, (err) => {if (err) throw err;})
      write = [];
    }
  };

  let temp = write.join('\n') + '\n';
  fs.appendFileSync(fileName, temp, (err) => {if (err) throw err;})
  write = [];
}

getDealers();