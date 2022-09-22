const API_KEY = '50ea7d652e899286b51fc70b0bc100a7';

export const getWeatherData = async (lat,lon) => {
  try {
    const forecast = await fetch (`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    const forecast_data  = await forecast.json();
    return forecast_data;
  }
  catch(e) {
    console.log(e);
  }
}



// let lookup = require('country-data').lookup;
// console.log(lookup.countries({name: 'Nigeria'}))