
const searchInput = document.getElementById('city');




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

            fetch("images/WEATHERAPP/" + data.weather[0].main + ".svg")
                .then(response => response.text())
                .then(svgText => {
                    const container = document.getElementById("svgContainer");
                    container.innerHTML = svgText;
                    setTimeout(() => {
                        const sunElement = container.querySelector("#svgContainer #main");
                        if (sunElement) {


                            gsap.fromTo(sunElement.querySelector('#sun'), { y: 0 }, { y: -1, duration: 1.5, yoyo: true, repeat: -1 });
                            gsap.fromTo(sunElement.querySelector('#cloud'), { x: 0 }, { x: -2, duration: 3, yoyo: true, repeat: -1 });

                        } else {
                            console.log("Nie znaleziono #sun!");
                        }
                    }, 50);


                })
                .catch(error => console.error("Błąd ładowania SVG:", error));



        }

        document.querySelector('.weather').style.display = 'block';
        document.querySelector('.error').style.display = 'none';
    }


}

gsap.fromTo("#wind-middle", { x: 2 }, { x: -3, yoyo: true, repeat: -1, duration: 5 }, ">");
gsap.fromTo("#wind-up", { x: 4 }, { x: 0, yoyo: true, repeat: -1, duration: 7 }, ">");
gsap.fromTo("#wind-down", { x: 2 }, { x: -2, yoyo: true, repeat: -1, duration: 4 }, ">");

gsap.fromTo("#h-1", { x: 1 }, { x: -1, yoyo: true, repeat: -1, duration: 3 });

gsap.fromTo("#h-2", { x: 1 }, { x: -2, yoyo: true, repeat: -1, duration: 3 });

gsap.fromTo("#h-3", { x: 2 }, { x: -2, yoyo: true, repeat: -1, duration: 3 });

gsap.fromTo("#h-4", { x: 2 }, { x: -2, yoyo: true, repeat: -1, duration: 3 });

gsap.fromTo("#h-5", { x: 1 }, { x: -2, yoyo: true, repeat: -1, duration: 3 });

gsap.fromTo("#h-6", { x: 3 }, { x: -2, yoyo: true, repeat: -1, duration: 3 });



function searchWeather() {
    getWeather(searchInput.value)

}

searchInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        getWeather(searchInput.value)
    }
});
