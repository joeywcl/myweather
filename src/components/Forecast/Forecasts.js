import {useSelector} from "react-redux";


import classes from './Forecasts.module.css';
import Card from "../UI/Card";
import ForecastItem from "./ForecastItem";

const Forecasts = () => {

    const weatherItem = useSelector(state => state.weather.getWeather);

    return (
        <Card className={classes.weather}>

            <ForecastItem weatherItem={weatherItem}/>

        </Card>
    );
};

export default Forecasts;
