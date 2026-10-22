import "./style.css";

const VISUAL_CROSSING_API_KEY = "G5WA9PGPMT6L5Z52AEBV72ZJ4"
const VISUAL_CROSSING_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
const weatherDataDiv = document.querySelector(".weather-data")
const weatherIcons = {};

async function getWeatherInfo(location) {
    const selectedUnit = document.querySelector(`input[name="temp-unit"]:checked`).value
    const defaultFetchURL = `${VISUAL_CROSSING_URL}${location}?key=${VISUAL_CROSSING_API_KEY}`
    const celciusFetchURL = `${VISUAL_CROSSING_URL}${location}?unitGroup=metric&key=${VISUAL_CROSSING_API_KEY}`
    const url = selectedUnit === "f" ? defaultFetchURL : celciusFetchURL

    try {
        const response = await fetch(url)
        const weatherData = await response.json()    
        return weatherData
    } catch (error) {
        console.error("Error fetching weather: ", error)
    }
}

function processWeatherData(data) {
    const location = data.resolvedAddress
    const locationsElement = document.createElement("div")
    locationsElement.className = "location"
    locationsElement.textContent = `Current location: ${location}`

    const conditions = data.currentConditions.conditions
    const conditionsElement = document.createElement("div")
    conditionsElement.className = "current-conditions"
    conditionsElement.textContent = `Current condition: ${conditions}`

    const currentTemp = data.currentConditions.temp
    const currentTempElement = document.createElement("div")
    currentTempElement.className = "current-temp"
    currentTempElement.textContent = `Current temp: ${currentTemp}`

    // const changeTempUnitButton = document.createElement("button")
    // changeTempUnitButton.className = "change-temp-unit-button"
    // changeTempUnitButton.textContent = "Change to"
    // currentTempElement.appendChild(changeTempUnitButton)

    const description = data.description
    const descriptionElement = document.createElement("div")
    descriptionElement.className = "description"
    descriptionElement.textContent = `Forecast: ${description}`

    const icon = data.currentConditions.icon
    const iconElement = document.createElement("img")
    iconElement.className = "current-conditions-icon"
    iconElement.src = weatherIcons[icon]

    weatherDataDiv.appendChild(iconElement)
    weatherDataDiv.appendChild(locationsElement)
    weatherDataDiv.appendChild(conditionsElement)
    weatherDataDiv.appendChild(currentTempElement)
    weatherDataDiv.appendChild(descriptionElement)
    
}

function initIcons() {
    const iconContext = import.meta.webpackContext('./assets/icons', {
        recursive: false,
        regExp: /\.png$/,
        mode: 'sync'
    });
    iconContext.keys().forEach((item) => {
        const key = item.replace('./', '').replace('.png', '');
        weatherIcons[key] = iconContext(item);
    });
}

function initialize() {
    initIcons()
    const form = document.querySelector(".location-form")
    const locationInput = document.getElementById("location-input")
    form.addEventListener("submit", async (event) => {
        event.preventDefault()

        weatherDataDiv.replaceChildren()

        const data = await getWeatherInfo(locationInput.value)
        console.log(data)
        processWeatherData(data)

        form.reset()
    })
}

initialize()
// getWeatherInfo("china")
