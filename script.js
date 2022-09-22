import {body,timeEl,sunIcon,moonIcon,dateEl,tempEl,humEl,windSEl,conditionEl,locationEl,loader} from './elems.js';

const API_KEY = '50ea7d652e899286b51fc70b0bc100a7';

const getWeatherData = async (lat,lon) => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    const Weather_Data = response.json();
    return Weather_Data;
  }
  catch(e) {
    console.log('fuck', e);
  }
}

const getForecastData = async (lat,lon) => {
  try {
    const forecast = await fetch (`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    const forecast_data  = await forecast;
    return forecast_data;
  }
  catch(e) {
    console.log(e);
  }
}


function main() {
  if('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position)=>{
      setTimeout(()=>{
        loader.style.display = 'none';
      }, 3000);
      let lat = parseFloat(position.coords.latitude.toFixed(2));
      let lon = parseFloat(position.coords.longitude.toFixed(2));
      getWeatherData(lat, lon)
      .then((data)=>{
        let date = new Date();
        timeEl.textContent = date.toLocaleTimeString([],{hour: '2-digit', minute: '2-digit', hour12: false});
        let interval =  setInterval(()=>{
          updateDate(data);
        }, 300)
        
        if (date.getHours() > new Date(data.sys.sunrise).getHours() &&
            date.getHours() < (new Date(data.sys.sunset).getHours()) + 12) {
            sunIcon.style.display = '';
            body.style.background =  getComputedStyle(body).getPropertyValue('--day-bg');
            moonIcon.style.display = 'none';
            
        } else {
          moonIcon.style.display = '';
          body.style.background =  getComputedStyle(body).getPropertyValue('--night-bg');
          sunIcon.style.display = 'none';
        }
        const MONTHS = ['Jan','Feb','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec'];
        const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thurday','Friday','Saturday'] ;
        dateEl.textContent = `${DAYS[date.getDay()]} ${date.getDate()}, ${MONTHS[date.getMonth()]}`;
        return data;
      })
      .then((data)=>{
        tempEl.textContent = parseInt(data.main.temp - 273);
        humEl.textContent = data.main.humidity;
        windSEl.textContent = data.wind.speed;
        conditionEl.textContent = data.weather[0].description;
        return data;
      })
      .catch(e=>{
        console.log(e);
      })
      .finally(()=>{
        console.log("that's it for today's forecast");
      });

      getForecastData(lat,lon)
      .then(data=>{
        console.log(data);
      })

    })
  } else {
    // request city name!!!
  }
};

main();


function updateDate(data) {
  const DATE = new Date();
  timeEl.textContent = DATE.toLocaleTimeString([],{hour: '2-digit', minute: '2-digit', hour12: false});
  if (DATE.getHours() > new Date(data.sys.sunrise).getHours() &&
            DATE.getHours() < (new Date(data.sys.sunset).getHours()) + 12) {
            sunIcon.style.display = '';
            body.style.background =  getComputedStyle(body).getPropertyValue('--day-bg');
            moonIcon.style.display = 'none';
            
        } else {
          moonIcon.style.display = '';
          body.style.background =  getComputedStyle(body).getPropertyValue('--night-bg');
          sunIcon.style.display = 'none';
        }
        const MONTHS = ['Jan','Feb','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec'];
        const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thurday','Friday','Saturday'] ;
        dateEl.textContent = `${DAYS[DATE.getDay()]} ${DATE.getDate()}, ${MONTHS[DATE.getMonth()]}`;
        return data;
}