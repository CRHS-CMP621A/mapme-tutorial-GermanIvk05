
navigator.geolocation.getCurrentPosition(
    function (position) {
        console.log(position);
        const latitude = position.coords.latitude;
        const longtitude = position.coords.longitude;
        console.log(`https://www.google.com/maps/@${latitude},${longtitude},15z`);
    },
    function() {
        alert("Could not get postion.");
    }
)