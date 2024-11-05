import React, { useState } from 'react';
import './Weather.css';

const apiKey = 'e2f64cc2191e8ac7a5ef78bc57976f6d';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather`;

const Weather = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState(null); // Initialize as null for clearer checks
    const [loadingWeather, setLoadingWeather] = useState(false);
    const [showBar, setShowBar] = useState(false);

    const search = async (e) => {
        e.preventDefault();
        setLoadingWeather(true);
        setWeather(null); // Reset weather data before fetching new data

        try {
            const response = await fetch(`${apiUrl}?q=${query}&units=metric&appid=${apiKey}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const result = await response.json();
            setWeather(result);
            setShowBar(false);
        } catch (error) {
            console.error(error);
            setWeather(null);
        } finally {
            setLoadingWeather(false);
        }
    };

    const setInputRefFocus = (input) => {
        if (input) {
            input.focus();
        }
    };

    const openSearchBox = () => {
        setQuery('');
        setShowBar(true);
    };

    const closeSearchBox = () => {
        setShowBar(false);
        setQuery('');
    };

    return (
        <div className={`weather ${weather && weather.main.temp > 15 ? 'weather-warm' : ''}`}>
            <div className={`search-box ${showBar ? 'bar-shown' : 'bar-not-shown'}`}>
                <form onSubmit={search}>
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search for a city"
                        onChange={(e) => setQuery(e.target.value)}
                        ref={setInputRefFocus}
                        value={query}
                    />
                </form>
                <button className="btn-close" onClick={closeSearchBox}>X</button>
            </div>
            <button
                style={{ opacity: showBar ? '0' : '1' }}
                className="btn-search"
                onClick={openSearchBox}
            >
                Search
            </button>
            {weather ? (
                <div className="weather-widget">
                    <div className="weather-box">
                        <div className="temp">
                            <div className="celcius">{Math.round(weather.main.temp)}°C</div>
                            <div className="main">{weather.weather[0].main}</div>
                        </div>
                        <div className="weather-icon">
                            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
                        </div>
                    </div>
                    <div className="location">{`${weather.name}, ${weather.sys.country}`}</div>
                </div>
            ) : (
                <div className="weather-widget">
                    {loadingWeather ? (
                        <h4 className="clean-search">Loading data...</h4>
                    ) : (
                        <h3 className="clean-search">Search for a proper city name</h3>
                    )}
                </div>
            )}
        </div>
    );
};

export default Weather;
