const timeEl = document.getElementById('time-span');
const sunIcon = document.getElementById('time-icon-sun');
const moonIcon = document.getElementById('time-icon-moon');
const dateEl = document.getElementById('date-span');
const tempEl = document.getElementById('temp');
const humEl = document.getElementById('humidity');
const windSEl = document.getElementById('wind-speed');
const conditionEl = document.getElementById('conditions');
const locationInput = document.getElementById('location');
const body = document.getElementsByTagName('body')[0];
const loader = document.querySelector('.loader');


export {body,timeEl,sunIcon,moonIcon,dateEl,tempEl,humEl,windSEl,conditionEl,locationInput,loader};