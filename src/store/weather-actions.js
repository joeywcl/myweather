import {uiActions} from "./ui-slice";
import {weatherActions} from "./weather-slice";

export const fetchWeatherData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                'https://weatherhistory-77a26-default-rtdb.firebaseio.com/history.json'
            );

            if (!response) {
                throw new Error('Unable to fetch history');
            }

            const data = await response.json();
            return data;
        };

        try {
            const weatherData = await fetchData();
            dispatch(weatherActions.getHistory({
                items: weatherData.items || []
            }));
        } catch (e) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Retrieving History',
                    message: 'No History Found'
                }));
        }
    }
};

export const sendWeatherData = (weather) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                status: 'pending',
                title: 'Retrieving...',
                message: 'Retrieving your history list!'
            }));

        const sendRequest = async () => {
            const response = await fetch('https://weatherhistory-77a26-default-rtdb.firebaseio.com/history.json', {
                method: 'PUT',
                body: JSON.stringify({
                    items: weather.items
                })
            });
            if (!response.ok) {
                throw new Error('Unable to update history')
            }
        };

        try {
            await sendRequest();
            dispatch(
                uiActions.showNotification({
                    status: 'success',
                    title: 'Success!',
                    message: 'Fetching completed!'
                }));
        } catch (e) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'History not found!'
                }));
        }

    }
};

export const getWeatherData = (data) => {
    const appid = 'ddd12c48007ccc04acae24afcdf70f62';
    return async (dispatch) => {

        const getData = async () => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data.weatherData.city},${data.weatherData.country}&units=metric&appid=${appid}`);

            if (!response.ok) {
                throw new Error('Weather forecast not found.')
            }

            const res = await response.json();


            return res;
        };
        try {
            const getWeather = await getData();
            dispatch(weatherActions.replaceData({
                getWeather: getWeather || {}
            }));
            dispatch(weatherActions.addItemToWeather({
                id: getWeather.id,
                city: getWeather.name,
                country: getWeather.sys.country,
                weather: getWeather.weather[0].main,
                weatherDesc: getWeather.weather[0].description,
                maxTemp: getWeather.main.temp_min,
                minTemp: getWeather.main.temp_max,
                humidity: getWeather.main.humidity,
                setTime: getWeather.dt
            }));
        } catch (e) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Fetching weather data failed!'
                }));
        }
    }
};