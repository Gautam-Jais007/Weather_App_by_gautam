const inputBox = document.querySelector(".inputBox");
const searchBtn = document.querySelector("#searchBtn");
const temp = document.querySelector(".temp");
const description = document.querySelector(".description");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#windSpeed");
const resetBtn = document.querySelector(".resetBtn");
const weatherBody = document.querySelector(".weatherBody");
const weatherImage = document.querySelector(".weatherImage");
const locationNotFound = document.querySelector(".locationNotFound");

async function checkWeather(city){
    const apiKey = "64fde23c52bae3cc77c153b349870137";
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const weatherData = await fetch (`${URL}`).then(response => response.json());

    console.log(weatherData);

    if(weatherData.cod == "404"){
        weatherBody.style.display = "none";
        locationNotFound.style.display = "flex";
        resetBtn.style.display = "flex";
        return
    }else if (inputBox.value === ""){
        weatherBody.style.display = "none";
        locationNotFound.style.display = "none";
        resetBtn.style.display = "flex";
        alert("Enter your location please");
        return
    }

    locationNotFound.style.display = "none";
    weatherBody.style.display = "flex";

    temp.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;
    description.innerHTML = `${weatherData.weather[0].description}`;
    windSpeed.innerHTML = `${weatherData.wind.speed}KM/H`;
    humidity.innerHTML = `${weatherData.main.humidity}%`;
    
    switch(weatherData.weather[0].main){
        case "Clouds":
            weatherImage.src = "assets/cloud.png";
            break;
        case "Clear":
            weatherImage.src = "assets/clear.png";
            break;
        case "Rain":
            weatherImage.src = "assets/rain.png";
            break;
        case "Mist":
            weatherImage.src = "assets/mist.png";
            break;
        case "Snow":
            weatherImage.src = "assets/snow.png";
            break;
    }
};


searchBtn.addEventListener("click", ()=>{
    checkWeather(inputBox.value);
});

resetBtn.addEventListener("click", ()=>{
    inputBox.value = "";
    weatherBody.style.display = "none";
    locationNotFound.style.display = "none";
});



