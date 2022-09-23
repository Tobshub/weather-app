
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

export const getLocationData = async (city, country_code) => {
  try {
    const location = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${country_code}&appid=${API_KEY}`);
    const locationData = await location.json();
    return locationData;
  }
  catch(e) {
    console.log(e);
  }
}

export async function getCountries() {
  let country_data = await fetch('countries.json');
  let countries = await country_data.json();
  return countries;
}

export function searchCountry(country, countryArr) {
  for (let i = 0; i < countryArr.length; i++) {
    if (countryArr[i].name == country) {
      return countryArr[i];
    }
  }
  return 'Country not found'
}

export function searchCountryByAlpha(alpha, countryArr) {
  for (let i = 0; i <countryArr.length; i++) {
    if (countryArr[i].alpha2 == alpha || countryArr[i].alpha3 == alpha) {
      return countryArr[i].name;
    }
  }
  return '';
}
