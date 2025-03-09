const apiKey = 'c629587a963b722705197497383d2c65';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';



async function getWeather(searchInput) {
    const response = await fetch(apiUrl + searchInput + `&appid=${apiKey}`);
    const weatherIcon = document.getElementById('weather-icon');

    if (response.status == 404) {
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
        document.querySelector('weather-icon').style.display = 'none';

    } else {

        var data = await response.json();


        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';

        if (data.weather[0].icon) {
            console.log(data.weather[0].main);
            weatherIcon.src = "images/mist.png"
            //  weatherIcon.src = "/images/" + data.weather[0].main + ".png";
            //  console.log(weatherIcon);
        }

        document.querySelector('.weather').style.display = 'block';
        document.querySelector('.error').style.display = 'none';
    }


}


function button() {
    const pom = document.getElementById('city').value;
    getWeather(pom);
    console.log(pom);
}