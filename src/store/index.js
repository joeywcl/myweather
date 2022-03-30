import {configureStore} from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import weatherSlice from "./weather-slice";

const store = configureStore({
    reducer: {ui: uiSlice.reducer, weather: weatherSlice.reducer}
});

export default store;