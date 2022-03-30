import {createSlice} from "@reduxjs/toolkit";

const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        items: [],
        changed: false,
        new: false,
        weatherData: {},
        getWeather: {}
    },
    reducers: {
        getHistory(state, action) {
            state.items = action.payload.items;
        },
        replaceData(state, action) {
            const getWeatherData = action.payload.getWeather;
            let myTime = '';
            if( getWeatherData.dt) {
                myTime = new Date(getWeatherData.dt*1000).toLocaleString();
            }

            state.getWeather = {
                id: getWeatherData.id,
                city: getWeatherData.name,
                country: getWeatherData.sys.country,
                weather: getWeatherData.weather[0].main,
                weatherDesc: getWeatherData.weather[0].description,
                maxTemp: getWeatherData.main.temp_min,
                minTemp: getWeatherData.main.temp_max,
                humidity: getWeatherData.main.humidity,
                setTime: myTime
            };
            state.weatherData = {};
            state.new = false;
            state.changed = false;
        },
        addItemToWeather(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            let myTime = '';
            if( newItem.setTime) {
                myTime = new Date(newItem.setTime*1000).toLocaleTimeString();
            }

            state.changed = true;
            if (!existingItem) {
                state.items.unshift({
                    id: newItem.id,
                    city: newItem.city,
                    country: newItem.country,
                    weather: newItem.weather,
                    weatherDesc: newItem.weatherDesc,
                    maxTemp: newItem.maxTemp,
                    minTemp: newItem.minTemp,
                    humidity: newItem.humidity,
                    setTime: myTime
                })
            }
        },
        removeItemFromWeather(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.changed = true;
            if (existingItem) {
                state.items = state.items.filter(item => item.id !== id);
            }
        },
        callWeather(state, action) {
            const newWeather = action.payload;
            state.new = true;
            state.weatherData = {
                city: newWeather.city,
                country: newWeather.country,
            }
        },
    },
});

export const weatherActions = weatherSlice.actions;
export default weatherSlice;
