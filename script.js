import {body,timeEl,sunIcon,moonIcon,dateEl,tempEl,humEl,windSEl,conditionEl,locationInput,locationSearchBtn,loader,predicitonHum,predictionDays,predictionTemps,predictionWindS} from './elems.js';
import { getCountries, getWeatherData, searchCountry, getLocationData, searchCountryByAlpha } from './api_calls.js';




function main(lat = null,lon = null) {
  if (lat == null && lon == null) {
    if('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position)=>{
        let lat = parseFloat(position.coords.latitude.toFixed(2));
        let lon = parseFloat(position.coords.longitude.toFixed(2));
  
        getWeatherData(lat, lon)
        .then((data)=> {
          let obj = data;
          getCountries()
          .then(data=>{
            locationInput.value = obj.city.name + ', ' + searchCountryByAlpha(obj.city.country, data);
          })
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
      // use default city
    }
  } else {
    getWeatherData(lat, lon)
    .then((data)=> {
      let obj = data;
      getCountries()
      .then(data=>{
        locationInput.value = obj.city.name + ', ' + searchCountryByAlpha(obj.city.country, data);
      })
      const interval_id = window.setInterval(function(){}, Number.MAX_SAFE_INTEGER);
      for (let i = 1; i < interval_id; i++) {
        window.clearInterval(i);
      }
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
  }
  
};

main(); 

locationSearchBtn.onclick = () => {
  let query = locationInput.value.split(', ');
  // console.log(query)
  let country = query[1];
  getCountries()
  .then(data => {
    let countryData = searchCountry(country, data);
    return countryData;
  })
  .then(obj=>{
    let country_code = obj.alpha2;
    return country_code;
  })
  .then(code=>{
    let locationData = getLocationData(query[0], code);
    return locationData;
  })
  .then(data=>{
    let lat = data[0].lat.toFixed(2);
    let lon = data[0].lon.toFixed(2);
    main(lat,lon);
  })
  .catch(e=>{
    console.log(e)
  })
}

const MONTHS = ['Jan','Feb','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec'];
const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thurday','Friday','Saturday'] ;

function updateDate(data) {
  const DATE = new Date();
  DATE.setTime(DATE.getTime() + (data.city.timezone * 1000) + (DATE.getTimezoneOffset() * 60 * 1000)); 
  
  timeEl.textContent = DATE.toLocaleTimeString([],{hour: '2-digit', minute: '2-digit', hour12: false});
  let sunrise = new Date(data.city.sunrise).getHours();
  let sunset = new Date(data.city.sunset).getHours();
  
  if (DATE.getHours() > sunrise &&
      DATE.getHours() < sunset + 12) {
    sunIcon.style.display = '';
    body.style.background =  getComputedStyle(body).getPropertyValue('--day-bg');
    body.style.setProperty('--main-info-bounds', 'hsl(0 0% 0%)');
    moonIcon.style.display = 'none';
  } else {
    moonIcon.style.display = '';
    body.style.background =  getComputedStyle(body).getPropertyValue('--night-bg');
    body.style.setProperty('--main-info-bounds', 'hsl(0 0% 100%)');
    sunIcon.style.display = 'none';
  }

  dateEl.textContent = `${DAYS[DATE.getDay()]} ${DATE.getDate()}, ${MONTHS[DATE.getMonth()]}`;
  
}

function updatePrediction(data) {
  let ListI = 7;
  
  for (let i = 1; i < predictionDays.length; i++) {
    let pred = data[ListI];
    let day = new Date(pred.dt_txt).getDay();
    predictionDays[i].textContent = DAYS[day];
    predictionTemps[i-1].textContent = (parseInt(pred.main.temp - 273) < 10)? '0' + parseInt(pred.main.temp - 273) : parseInt(pred.main.temp - 273);
    predictionWindS[i-1].textContent = pred.wind.speed.toFixed(1);
    predicitonHum[i-1].textContent = pred.main.humidity.toFixed(0);
    ListI += 8;
  }

}