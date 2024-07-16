import axios from "axios";

const api_key = import.meta.env.VITE_WEATHER_API_KEY
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'

const getWeather = (city) => {
    console.log(import.meta.env.VITE_WEATHER_API_KEY)
    return axios.get(`${baseUrl}q=${city}&appid=${api_key}&units=metric`)
}

export default {getWeather: getWeather}
