import {body,timeEl,sunIcon,moonIcon,dateEl,tempEl,humEl,windSEl,conditionEl,locationInput,loader} from './elems.js';
import { getWeatherData } from './api_calls.js';




function main() {
  if('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = parseFloat(position.coords.latitude.toFixed(2));
      let lon = parseFloat(position.coords.longitude.toFixed(2));
      getWeatherData(lat, lon)
      .then((data)=> {
        locationInput.value = data.city.name + ', ' + data.city.country;
        return data.list
      })
      .then((data)=>{
        let date = new Date(data[0].dt_txt);
        timeEl.textContent = date.toLocaleTimeString([],{hour: '2-digit', minute: '2-digit', hour12: false});
        let interval =  setInterval(()=>{
          updateDate(data[0]);
        }, 300)
        
        if (date.getHours() > 6 &&
            date.getHours() < 18) {
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
        tempEl.textContent = parseInt(data[0].main.temp - 273);
        humEl.textContent = data[0].main.humidity;
        windSEl.textContent = data[0].wind.speed;
        conditionEl.textContent = data[0].weather[0].description;
        return data;
      })
      .catch(e=>{
        console.log(e);
      })
      .finally(()=>{
        setTimeout(()=>{
          loader.style.opacity = '0%';
        }, 100);
        setTimeout(()=>{
          loader.style.display = 'none';
        }, 400);
        console.log("that's it for today's forecast");
      });

    })
  } else {
    // request city name!!!
  }
};

main();


function updateDate(data) {
  const DATE = new Date(data.dt_txt);
  timeEl.textContent = DATE.toLocaleTimeString([],{hour: '2-digit', minute: '2-digit', hour12: false});
  if (DATE.getHours() > 6 &&
      DATE.getHours() < 18) {
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