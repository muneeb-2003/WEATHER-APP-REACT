import React, { useState, useEffect } from 'react';
import axios from 'axios';
import precipitationIcon from './rain.gif';
import windIcon from './wind.gif';
import temperatureIcon from './temperature.gif';
import humidityIcon from './humidity.gif';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('Karachi');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7853e5ecee041098e7767f5b31564f8a&units=metric`
                );
                setWeatherData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchWeather();
    }, [city]);

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const precipitation = weatherData?.rain ? weatherData.rain['1h'] : 0;

    return (
        <div className="weather-container">


            <h1>Tele Weather</h1>
            <div className="form-control">
                <input
                    type="text"
                    value={city}
                    onChange={handleCityChange}
                    placeholder=""
                    required
                />
                <label>
                    <span>Enter city name</span>
                </label>
            </div>
            {weatherData && (
                <div className="weather-info">
                    <h2>{weatherData.name}</h2>
                    <div className="weather-details">
                        <img src={temperatureIcon} alt="Temperature Icon" className="weather-icon" />
                        <p>Temperature: {weatherData.main.temp}°C</p>
                    </div>
                    <div className="weather-details">
                        <img src={precipitationIcon} alt="Precipitation Icon" className="weather-icon" />
                        <p>Precipitation: {precipitation} mm</p>
                    </div>
                    <div className="weather-details">
                        <img src={humidityIcon} alt="Humidity Icon" className="weather-icon" />
                        <p>Humidity: {weatherData.main.humidity}%</p>
                    </div>
                    <div className="weather-details">
                        <img src={windIcon} alt="Wind Icon" className="weather-icon" />
                        <p>Wind: {weatherData.wind.speed} km/h</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Weather;
