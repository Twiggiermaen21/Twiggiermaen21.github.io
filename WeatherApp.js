
const searchInput = document.getElementById('city');

var tl = gsap.timeline({ repeat: 2, repeatDelay: 1 });


const apiKey = 'c629587a963b722705197497383d2c65';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

//tl.fromTo("#wind-middle", { y: 5 }, { x: -5, yoyo: true });
//tl.fromTo("#wind-up", { x: 5 }, { x: -5, yoyo: true });
//tl.fromTo("#wind-down", { x: 5 }, { x: -5, yoyo: true });


tl.fromTo('#weather-icon', { y: 0 }, { y: -200, duration: 1.5 });





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


            fetch("images/WEATHERAPP/" + data.weather[0].main + ".svg")
                .then(response => response.text()) // Pobiera zawartość pliku SVG jako tekst
                .then(svgText => {
                    document.getElementById("svgContainer").innerHTML = svgText; // Wstawia kod SVG do div-a
                })
                .catch(error => console.error("Błąd ładowania SVG:", error));



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
