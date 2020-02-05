import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const CountryDetails = (props) => {
    const { country } = props;
    const ACCESS_KEY = '74c2740372d1fe2dd1a742d505d83848';
    const [weather, setWeather] = useState({
        temperature: 0,
        weatherIcon: '',
        windSpeed: 0,
        windDirection: ''
    });

    const effectHook = () => {
        axios
        .get(`http://api.weatherstack.com/current?access_key=${ACCESS_KEY}&query=${country.capital}`)
        .then(response => {
            const currentData = response.data.current;

            const currentWeather = {
                temperature: currentData.temperature,
                weatherIcon: currentData.weather_icons[0],
                windSpeed: currentData.wind_speed,
                windDirection: currentData.wind_dir
            }

            setWeather(currentWeather);
        })
        .catch(err => {
            console.log(`Unable to get data from weather api: ${err}`);
        });
    }

    useEffect(effectHook, []);

    return (
        <div>
            <h2>{country.name}</h2>
            <p>Capital {country.capital}</p>
            <p>Population {country.population}</p>
            <h3>Languages</h3>
            <ul>
                {country.languages.map(lang => <li key={lang.iso639_1}>{lang.name}</li>)}
            </ul>
            <img src={country.flag} alt='flag' width={300} height={200}/>
            <h3>Weather in {country.capital}</h3>
            <div><b>temperature: </b>{weather.temperature} Celsius</div>
            <div><img src={weather.weatherIcon} alt='Weather Icon' width={80} height={80} /></div>
            <div><b>wind: </b>{weather.windSpeed} kph direction {weather.windDirection}</div>
        </div>
    );
}

export default CountryDetails;