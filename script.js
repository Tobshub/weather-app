import {body,timeEl,sunIcon,moonIcon,dateEl,tempEl,humEl,windSEl,conditionEl,locationInput,loader,predicitonHum,predictionDays,predictionTemps,predictionWindS} from './elems.js';
import { getWeatherData } from './api_calls.js';




function main() {
  if('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = parseFloat(position.coords.latitude.toFixed(2));
      let lon = parseFloat(position.coords.longitude.toFixed(2));

      getWeatherData(lat, lon)
      .then((data)=> {
        locationInput.value = data.city.name + ', ' + data.city.country;
        // console.log(data)
        setInterval(()=>{
          updateDate(data);
        }, 100)
        return data.list;
      })
      .then(data=>{
        updatePrediction(data);
        setInterval(()=>{
          updatePrediction(data);
        }, 3600000)
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

const MONTHS = ['Jan','Feb','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec'];
const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thurday','Friday','Saturday'] ;

function updateDate(data) {
  const DATE = new Date();
  timeEl.textContent = DATE.toLocaleTimeString([],{hour: '2-digit', minute: '2-digit', hour12: false});
  let sunrise = new Date(data.city.sunrise).getHours();
  let sunset = new Date(data.city.sunset).getHours();

  if(DATE.getMinutes() % 60 > 1) return;
  
  if (DATE.getHours() > sunrise &&
      DATE.getHours() < sunset + 12) {
    sunIcon.style.display = '';
    body.style.background =  getComputedStyle(body).getPropertyValue('--day-bg');
    moonIcon.style.display = 'none';
      
  } else {
    moonIcon.style.display = '';
    body.style.background =  getComputedStyle(body).getPropertyValue('--night-bg');
    sunIcon.style.display = 'none';
  }
  
  if(DATE.getHours() & 12 > 1) return;

  dateEl.textContent = `${DAYS[DATE.getDay()]} ${DATE.getDate()}, ${MONTHS[DATE.getMonth()]}`;
  
}

function updatePrediction(data) {
  let ListI = 7;
  
  for (let i = 1; i < predictionDays.length; i++) {
    let pred = data[ListI];
    let day = new Date(pred.dt_txt).getDay();
    predictionDays[i].textContent = DAYS[day];
    predictionTemps[i-1].textContent = parseInt(pred.main.temp - 273);
    predictionWindS[i-1].textContent = pred.wind.speed.toFixed(1);
    predicitonHum[i-1].textContent = pred.main.humidity;
    ListI += 8;
  }

}