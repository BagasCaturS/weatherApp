const temperature = document.getElementById("temperature");
const search = document.getElementById("search");
const wind = document.getElementById("windSpeed");
const humid = document.getElementById("humidity");
const condition = document.getElementById("condition");
const image = document.getElementById("weatherConditionImg");
const error = document.getElementById("error");
const main = document.getElementById("main");

// saat user mengklik search akan menjalankan kode
// dibawah
search.addEventListener("click", async () => {
    const APIkey = "8013eb15ab60740a740ecf08e74ba7c0";
    const city = document.getElementById("location").value;
    if (city === '') return;
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`);
        const data = await response.json();
        // apabila menembalikkan code 404 atau error
        // maka akan menambahkan dan menghapuskan style seprti di code dibawah
        if (data.cod == "404"){
            main.classList.add("hidden");
            error.classList.remove("hidden");
            error.classList.add("block");   
            return; 
        }

        //tambahain lg kelas-kelasnya biar muncul lagi
        main.classList.remove("hidden");
        main.classList.add("block");
        error.classList.add("hidden");   

        // memasukkan data yang telah di fetch
        // kedalam elemen
        temperature.innerText = data.main.temp;
        wind.innerText = data.wind.speed;
        humid.innerText = data.main.humidity;
        condition.innerText = data.weather[0].description;

        // mengubah foto2 sesaui dengan kondisi
        // yang ada pada api
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
        // melakukan parsing agar data yang berisi decimal
        // di bulatkan
        temperature.innerHTML = `${parseInt(data.main.temp)}`;
        wind.innerHTML = `${parseInt(data.wind.speed)}`

        // menangkap error untuk debugging
    } catch (error) {
        console.error(error);
    }
});
