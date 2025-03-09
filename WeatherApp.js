
const searchInput = document.getElementById('city');

var tl = gsap.timeline({ repeat: 2, repeatDelay: 1 });


const apiKey = 'c629587a963b722705197497383d2c65';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

//tl.fromTo("#wind-middle", { y: 0 }, { x: -30, duration: 1, yoyo: true, repeat: -1, duration: 1, delay: 1.5 });
tl.fromTo("#wind-middle", 1, { drawSVG: 0, yoyo: true, repeat: -1, delay: 1.5 });

//set the initial value

tl.fromTo("#wind-up, #wind-down", 1, { drawSVG: 0 }, { drawSVG: "90% 100%", ease: Bounce.easeOut, delay: 0.5, yoyo: true, repeat: -1 });



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

            weatherIcon.src = "images/WEATHERAPP/" + data.weather[0].main + ".svg";
            console.log(data.weather[0].main + ".svg");
        }

        document.querySelector('.weather').style.display = 'block';
        document.querySelector('.error').style.display = 'none';
    }


}



function searchWeather() {
    getWeather(searchInput.value)

}

searchInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        getWeather(searchInput.value)
    }
});
