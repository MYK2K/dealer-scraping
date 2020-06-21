const fetch = require('node-fetch');
let states = [
  { id: "2", name: "Andhra Pradesh" },
  { id: "3", name: "Arunachal Pradesh" },
  { id: "4", name: "Assam" },
  { id: "5", name: "Bihar" },
  { id: "6", name: "Chandigarh" },
  { id: "7", name: "Chattisgarh" },
  { id: "8", name: "Dadra and Nagar Haveli" },
  { id: "9", name: "Delhi" },
  { id: "10", name: "Goa" },
  { id: "11", name: "Gujarat" },
  { id: "12", name: "Haryana" },
  { id: "13", name: "Himachal Pradesh" },
  { id: "14", name: "Jammu and Kashmir" },
  { id: "15", name: "Jharkhand" },
  { id: "16", name: "Karnataka" },
  { id: "17", name: "Kerala" },
  { id: "18", name: "Madhya Pradesh" },
  { id: "19", name: "Maharashtra" },
  { id: "20", name: "Manipur" },
  { id: "21", name: "Mizoram" },
  { id: "22", name: "Nagaland" },
  { id: "23", name: "Odisha" },
  { id: "24", name: "Pondicherry" },
  { id: "25", name: "Punjab" },
  { id: "26", name: "Rajasthan" },
  { id: "28", name: "Tamil Nadu" },
  { id: "29", name: "Telangana" },
  { id: "30", name: "Tripura" },
  { id: "31", name: "Uttar Pradesh" },
  { id: "32", name: "Uttarakhand" },
  { id: "34", name: "West Bengal" },
]

const getData = async (states) => {
  const apiUrl = 'https://www.honda2wheelersindia.com/network/FillCity?NetworkLocatorTypeID=1&StateId=';

  for (let i in states) {
    let state = states[i];
    console.log(state.name);
    let request = await fetch(apiUrl + state.id);
    let response = await request.json();
    state.cities = response;
    console.log('End');
  }

  const fs = require('fs');
  const fileName = 'states-cities.json';
  fs.writeFileSync(fileName, JSON.stringify(states), (err) => { if (err) throw err; });
}

getData(states);