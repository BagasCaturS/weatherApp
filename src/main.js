const temperature = document.getElementById("temperature");
const search = document.getElementById("search");
const wind = document.getElementById("windSpeed");
const humid = document.getElementById("humidity");
const condition = document.getElementById("condition");
const image = document.getElementById("weatherConditionImg");

search.addEventListener("click", async () => {
    const APIkey = "8013eb15ab60740a740ecf08e74ba7c0";
    const city = document.getElementById("location").value;
    if (city === '') return;
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`);
        const data = await response.json();
        temperature.innerText = data.main.temp;
        wind.innerText = data.wind.speed;
        humid.innerText = data.main.humidity;
        condition.innerText = data.weather[0].description;
        switch (data.weather[0].main) {
            case 'Clear':
                image.src = 'images/clear.png'
                break;
            case 'Clouds':
                image.src = 'images/cloud.png'
                break;
            case 'Haze':
                image.src = 'images/mist.png'
                break;
            case 'Rain':
                image.src = 'images/rain.png'
                break;
            case 'Snow':
                image.src = 'images/snow.png'
                break;
        
            default:
                image.src = 'images/WiCloudy.png';
        }
        temperature.innerHTML = `${parseInt(data.main.temp)}`;
        wind.innerHTML = `${parseInt(data.wind.speed)}`
    } catch (error) {
        console.error(error);
    }
});
