const timeEl = document.getElementById('time-span');
const sunIcon = document.getElementById('time-icon-sun');
const moonIcon = document.getElementById('time-icon-moon');
const dateEl = document.getElementById('date-span');
const tempEl = document.getElementById('temp');
const humEl = document.getElementById('humidity');
const windSEl = document.getElementById('wind-speed');
const conditionEl = document.getElementById('conditions');
const locationInput = document.getElementById('location');
const locationSearchBtn = document.getElementById('search-location');
const body = document.getElementsByTagName('body')[0];
const loader = document.querySelector('.loader');
const predictionDays = document.querySelectorAll('.prediction-day');
const predictionTemps = document.querySelectorAll('.prediction-temp');
const predictionWindS = document.querySelectorAll('.prediction-wind-speed');
const predicitonHum = document.querySelectorAll('.prediction-humidity');


export {body,timeEl,sunIcon,moonIcon,dateEl,tempEl,humEl,windSEl,conditionEl,locationInput,locationSearchBtn,loader,predicitonHum,predictionDays,predictionTemps,predictionWindS};