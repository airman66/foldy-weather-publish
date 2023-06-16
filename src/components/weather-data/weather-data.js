import React, {useContext} from "react";
import {Context} from "../context";
import Loader from "../loader";
import "./weather-data.css";

const WeatherData = () => {
    const {weatherData, weatherDataImperial, loading, imperialUnits, loaded} = useContext(Context);
    const Content = () => {
        if (weatherData.message) {
            return (
                <h2>Не удалось найти погодную информацию по данному городу</h2>
            );
        } else {
            if (imperialUnits) {
                return (
                    <React.Fragment>
                        <h2>Погодная информация по городу {weatherDataImperial.name}</h2>
                        <h4>
                            Погода описывается как {weatherDataImperial.weather[0].description}
                            <img
                                src={`http://openweathermap.org/img/wn/${weatherDataImperial.weather[0].icon}@2x.png`}
                                alt="погодная иконка"
                                width={45}
                                height={45}
                            />
                        </h4>
                        <ul>
                            <li className="weather-data-li">Температура: {weatherDataImperial.main.temp}&deg;F</li>
                            <li className="weather-data-li">
                                Минимальная температура: {weatherDataImperial.main.temp_min}&deg;F
                            </li>
                            <li className="weather-data-li">
                                Максимальная температура: {weatherDataImperial.main.temp_max}&deg;F
                            </li>
                            <li className="weather-data-li">
                                Ощущается как: {weatherDataImperial.main.feels_like}&deg;F
                            </li>
                            <li className="weather-data-li">Ветер: {weatherDataImperial.wind.speed} м/час</li>
                            <li className="weather-data-li">Давление: {weatherDataImperial.main.pressure} мм рт.ст</li>
                            <li className="weather-data-li">Влажность: {weatherDataImperial.main.humidity} %</li>
                        </ul>
                    </React.Fragment>
                );
            } else {
                return (
                    <React.Fragment>
                        <h2>Погодная информация по городу {weatherData.name}</h2>
                        <h4>
                            Погода описывается как {weatherData.weather[0].description}
                            <img
                                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                                alt="погодная иконка"
                                width={45}
                                height={45}
                            />
                        </h4>
                        <ul>
                            <li className="weather-data-li">Температура: {weatherData.main.temp}&deg;C</li>
                            <li className="weather-data-li">Минимальная температура: {weatherData.main.temp_min}&deg;C</li>
                            <li className="weather-data-li">Максимальная температура: {weatherData.main.temp_max}&deg;C</li>
                            <li className="weather-data-li">Ощущается как: {weatherData.main.feels_like}&deg;C</li>
                            <li className="weather-data-li">Ветер: {weatherData.wind.speed} м/с</li>
                            <li className="weather-data-li">Давление: {weatherData.main.pressure} мм рт.ст</li>
                            <li className="weather-data-li">Влажность: {weatherData.main.humidity} %</li>
                        </ul>
                    </React.Fragment>
                );
            }
        }
    };
    const data = loaded ? <Content /> : <h2>В этой сессии вы пока не делали запросов</h2>;
    const content = loading ? <Loader /> : data;

    return (
        <div className="mb-4">
            {content}
        </div>
    );
};

export default WeatherData;