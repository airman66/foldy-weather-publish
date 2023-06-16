export default class Wapi {
    __getUrl = (city, units) => {
        return `https://api.openweathermap.org/data/2.5/weather?q=${city.toLowerCase()}&appid=1c3c95e0972967b40cd22c2840f3bf71&units=${units}&lang=ru`;
    }

    getWeatherByCity = async (city, units = "metric") => {
        const response = await fetch(this.__getUrl(city, units));
        return response.json();
    }
}