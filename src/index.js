import "./style.css";

const VISUAL_CROSSING_API_KEY = "G5WA9PGPMT6L5Z52AEBV72ZJ4"
const VISUAL_CROSSING_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"

async function getWeatherInfo(location) {
    const response = await fetch(`${VISUAL_CROSSING_URL}${location}?key=${VISUAL_CROSSING_API_KEY}`)
    const weatherData = await response.json()    
    
    console.log(weatherData)
}

getWeatherInfo("china")