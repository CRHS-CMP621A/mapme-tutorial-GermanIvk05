'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const submitBtn = document.querySelector('.form__btn');

let map;
let mapEvent;
let lat;
let lng;

navigator.geolocation.getCurrentPosition(
    function (position) {
        // console.log(position);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const coords= [latitude, longitude]
        
        var map = L.map('map').setView(coords, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker(coords).addTo(map)
            .bindPopup('A pretty CSS popup.<br> Easily customizable.')
            .openPopup();

        map.on('click', (mapE) => {
            form.classList.remove('hidden');
            inputDistance.focus();

            mapEvent = mapE;

            lat = mapEvent.latlng.lat
            lng = mapEvent.latlng.lng
        });
    },
    function() {
        alert("Could not get postion.");
    }
)

form.addEventListener('.form__btn', (e) => {
    L.marker([lat, lng]).addTo(map)
        .bindPopup(L.popup({
            maxWidth:250,
            minWidth:100,
            autoClose:false,
            closeOnClick:false,
            className:'running-popup',
        }))
        .setPopupContent('Workout')
        .openPopup();

    e.preventDefault();
})
