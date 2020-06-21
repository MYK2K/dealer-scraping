const fetch = require('node-fetch');
const fs = require('fs');
const cities = require('./mahindra-cities');

const titleCase = (str) => {
  let splitStr = str.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }
  // Directly return the joined string
  return splitStr.join(' '); 
}

const getDealers = async () => {
  const headers = `"Dealer Name","Address","City","State","Pincode","Contact"\n`;
  const fileName = 'mahindra-dealers.csv';
  fs.writeFileSync(fileName, headers, (err) => {if (err) throw err;});
  const apiUrl = 'https://trinitygateway.azure-api.net/syouv2_0_td_prod/api/Masters/Book/GetDealerByCity';
  const pincodeApiUrl = 'http://www.postalpincode.in/api/pincode/';
  const mapsApiKey = 'AIzaSyAAfN0RhhFfJl7zbs_USrQgYHU2KIVLM8c';
  const googleMapsApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?sensor=true&key=${mapsApiKey}&latlng=`;

  let i = 0;
  for (let cityId in cities) {
    let body = JSON.stringify({cityId});
    let requestOptions = {
      method: 'POST',
      body,
      headers: {
        'host': 'trinitygateway.azure-api.net',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body, 'utf-8'),
        'Ocp-Apim-Subscription-Key': 'db0cd261fd774df4935527298028f02b'
      }
    };
    let response = await fetch(apiUrl, requestOptions);
    let dealers = await response.json();
    dealers = dealers.IsSuccessful ? dealers.ResponseData : [];
    if (!dealers.length) {
      continue;
    }
    let pincode = dealers[0].Pin ? dealers[0].Pin.trim() : '';
    let city = '', state = '';
    if (pincode) {
      let pincodeResponse = await fetch(pincodeApiUrl + pincode);
      let data = await pincodeResponse.json();
      if (data.Status == 'Success') {
        city = data.PostOffice[0].District;
        state = data.PostOffice[0].State;
      }
    } else if (dealers[0].Latitude &&  dealers[0].Longitude) {
      let latlng = dealers[0].Latitude + ',' +  dealers[0].Longitude;
      let googleMapsResponse = await fetch(googleMapsApiUrl + latlng);
      let data = await googleMapsResponse.json();
      if (data.status == 'OK') {
        let components = data.results[0].address_components;
        for (let k in components) {
          let component = components[k];
          if (component.types.length == 2 && component.types.includes('administrative_area_level_2') && component.types.includes('political')) {
            city = component.long_name;
          } else if (component.types.length == 2 && component.types.includes('administrative_area_level_1') && component.types.includes('political')) {
            state = component.long_name;
          }
        }
      }
    }

    city = city || titleCase(cities[cityId]);

    console.log( ++i + '.', 'City: ' + city + ', State: ' + state);

    let write = '';
    for (let j in dealers) {
      let dealer = dealers[j];
      write += `"${dealer.Name}","${dealer.Address.trim().replace(/"/g,'""').replace(/[\r\n]+/g," ") || ''}","${city}","${state}","${pincode}","${dealer.PhoneNumber || ''}"\n`;
    }
    fs.appendFileSync(fileName, write, (err) => {if (err) throw err;});
  }
}

getDealers();