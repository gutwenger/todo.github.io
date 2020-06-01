document.addEventListener('DOMContentLoaded', () => {

    let long;
    let lat;
    let accuweatherAPI = "D6Kl8KD5QbGo8EL4XS1XzIG3GJKEH5Uu";
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( (position) => {
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const geoApi = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${accuweatherAPI}&q=${lat}%2C%20${long}`;

            fetch(geoApi)
                .then( response => {
                    return response.json();
                })
                .then( data => {
                    console.log(data.Key);
                    locationKey = data.Key;
                    console.log(locationKey);

                    const weatherApi = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${accuweatherAPI}&details=false`;

                    fetch(weatherApi)
                    .then( response => {
                        return response.json();
                    })
                    .then ( data => {
                        console.log(data[0].Temperature.Metric);
                        
                    })
                });

        })
    }


});