/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import WeatherService from '../services/WeatherService.js';

const ShowWatherInCapitalCity = ({capital}) => {
    const [weatherInfo, setWeatherInfo] = useState(null)


    useEffect(() => {
        if (capital) {
            WeatherService.getWeather(capital)
            .then(response => {
                setWeatherInfo(response.data)
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            })
        }
    }, [capital])
    if (weatherInfo) {
        return(
            <>
            <h3>Weather in {capital}</h3>
            <p>temperature {weatherInfo.main.temp} Celcius</p>
            <img src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`} alt={weatherInfo.weather.description} />
            <p>wind {weatherInfo.wind.speed} m/s</p>
            </>
        )
    }

}

export default ShowWatherInCapitalCity