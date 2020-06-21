const fetch = require('node-fetch');

const byCoordinates = async (longitude, latitude) => {
  const apiKey = 'AIzaSyAAfN0RhhFfJl7zbs_USrQgYHU2KIVLM8c';
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?sensor=true&key=${apiKey}&latlng=`;
  let state = ''
  let city = '';
  let latlng = longitude + ',' + latitude;

  let googleMapsResponse = await fetch(apiUrl + latlng);
  let data = await googleMapsResponse.json();
  if (data.status == 'OK') {
    let components = data.results[0].address_components;
    city = components.find(component => component.types.includes('administrative_area_level_2') && component.types.includes('political'));
    state = components.find(component => component.types.includes('administrative_area_level_1') && component.types.includes('political'));
    city = city ? city.long_name : '';
    state = state ? state.long_name : '';
    if (state == 'Delhi') city = 'New Delhi';
  }

  return {state, city};
}

const byPincode = async (pincode) => {
  const apiUrl = 'http://www.postalpincode.in/api/pincode/';
  let state = ''
  let city = '';

  let pincodeResponse = await fetch(apiUrl + pincode);
  let data = await pincodeResponse.json();
  if (data.Status == 'Success') {
    city = data.PostOffice[0].District;
    state = data.PostOffice[0].State;
  }

  return {state, city};
}

module.exports = {byCoordinates, byPincode};