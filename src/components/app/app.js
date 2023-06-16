import React, {useState, useEffect} from "react";
import Form from "../form";
import {Context} from "../context";
import Wapi from "../../services/wapi.service";
import LastRequests from "../last-requests";

const UnitsMode = React.lazy(() => import("../units-mode"));
const WeatherData = React.lazy(() => import("../weather-data"));
const AppHeader = React.lazy(() => import("../app-header"));

const App = () => {
    const [label, setLabel] = useState("");
    const [weatherData, setWeatherData] = useState({});
    const [weatherDataImperial, setWeatherDataImperial] = useState({});
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const units = localStorage.getItem("imperialUnits") || false;
    const [imperialUnits, setImperialUnits] = useState(units === "true");
    const [lastRequests, setLastRequests] = useState(JSON.parse(localStorage.getItem("lastRequests") || "[]"));
    const [areThereRequests, setAreThereRequests] = useState(lastRequests.length !== 0);
    const wapi = new Wapi();
    const onInputChange = (e) => {
        setLabel(e.target.value);
    };
    const onFormSubmit = async (e) => {
        e.preventDefault();
        await setLoading(true);
        await setLoaded(false);
        await wapi.getWeatherByCity(label)
            .then(data => {
                setWeatherData(data);
            });
        await wapi.getWeatherByCity(label, "imperial")
            .then(data => {
                setWeatherDataImperial(data);
                if (!data.message) {
                    if (lastRequests.length >= 5) {
                        let filteredRequests = lastRequests.filter(el => el);
                        filteredRequests.push(data.name);
                        filteredRequests = Array.from(new Set(filteredRequests));
                        if (filteredRequests.length > 5) {
                            filteredRequests = filteredRequests.filter((el, idx) => {
                                return idx < 6 && idx !== 0;
                            });
                        } else {
                            filteredRequests = filteredRequests.filter((el, idx) => {
                                return idx < 6;
                            });
                        }
                        setLastRequests(filteredRequests);
                    } else {
                        let filteredRequests = lastRequests.filter(() => {
                            return true;
                        });
                        filteredRequests.push(data.name);
                        filteredRequests = Array.from(new Set(filteredRequests));
                        setLastRequests(filteredRequests);
                    }
                }
                setLabel("");
            });
        await setLoading(false);
        await setLoaded(true);
    };
    const onUnitsModeChange = (e) => {
        switch (e.target.value) {
            case "metric":
                setImperialUnits(false);
                break;
            case "imperial":
                setImperialUnits(true);
                break;
            default:
                console.log("Не удалось сменить единицы");
        }
    };
    const onLastRequestClick = async (label) => {
        await setLoading(true);
        await setLoaded(false);
        await wapi.getWeatherByCity(label)
            .then(data => {
                setWeatherData(data);
            });
        await wapi.getWeatherByCity(label, "imperial")
            .then(data => {
                setWeatherDataImperial(data);
            });
        await setLoading(false);
        await setLoaded(true);
    };
    useEffect(() => {
        localStorage.setItem("imperialUnits", imperialUnits.toString());
    }, [imperialUnits]);
    useEffect(() => {
        localStorage.setItem("lastRequests", JSON.stringify(lastRequests));
        setAreThereRequests(lastRequests.length !== 0);
    }, [lastRequests]);

    return (
        <Context.Provider value={{
            label,
            onInputChange,
            onFormSubmit,
            weatherData,
            weatherDataImperial,
            loading,
            loaded,
            imperialUnits,
            onUnitsModeChange,
            lastRequests,
            onLastRequestClick,
            areThereRequests
        }}>
            <div className="container">
                <div className="mb-2 d-flex justify-content-between align-items-center">
                    <React.Suspense fallback={<p>Loading app name...</p>}>
                        <AppHeader />
                    </React.Suspense>
                    <React.Suspense fallback={<p>Loading units modes...</p>}>
                        <UnitsMode />
                    </React.Suspense>
                </div>
                <Form />
                <React.Suspense fallback={<p>Loading weather information...</p>}>
                    <WeatherData />
                </React.Suspense>
                <LastRequests />
            </div>
        </Context.Provider>
    );
};

export default App;