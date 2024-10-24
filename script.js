let cityInput = document.getElementById('city_input'),
serchBtn =document.getElementById('searchBtn'),
api_key = 'beda313c4265f2b955eda5daf96fd69a';

function getweatherDetails(name, lat, lon, coutry, state){
    let FORECAST_API_URL = `api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${api_key}`
    let WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
    days = [
        'Sunday',
        'Monday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ],
    months = [
        'jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];

    fetch(WEATHER_API_URL)
    .then(res => res.json())
    .then(data =>{
        console.log(data);
    })
    .catch( ()=> {
        alert('Failed to fetch current weather');
    });


}

function getcityCoordinates(){
    let cityName = cityInput.value.trim();
    cityInput.value = '';
    if(!cityName) return;
    let GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},{state code},{country code}&limit=1&appid=${api_key}`;
    fetch(GEOCODING_API_URL)
    .then(res => res.json())
    .then(data =>{
        let {name, lat, lon, country, state} =data[0].state;
        getweatherDetails(name, lat, lon, coutry, state);
    })
    .catch( () =>{
        alert(`Failed to fetch coordinates of ${cityName}`)
    })
}

serchBtn.addEventListener('click',getcityCoordinates);