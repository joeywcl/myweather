import React, {useRef, Fragment} from 'react';
import {useDispatch} from "react-redux";
import {weatherActions} from "../../store/weather-slice";

import classes from './ForecastItem.module.css';

const ForecastItem = (props) => {
    const {city, country, weather, weatherDesc, minTemp, maxTemp, humidity, setTime} = props.weatherItem;

    const dispatch = useDispatch();
    const cityRef = useRef('');
    const countryRef = useRef('');
    const formRef = useRef();


    const addWeatherHandler = (event) => {
        event.preventDefault();
        dispatch(weatherActions.callWeather({
            city: cityRef.current.value,
            country: countryRef.current.value
        }));
        formRef.current.reset();
    };

    const clearHandler = (event) => {
        event.preventDefault();
        formRef.current.reset();
    };

    return (
        <Fragment>

            <section className="container">
                <form ref={formRef} onSubmit={addWeatherHandler}>
                    <div className={classes.inline}>
                        <label htmlFor='city'>City : </label>
                        <input type='text' name="city" id='city' ref={cityRef}/>
                    </div>
                    <div className={classes.inline}>
                        <label htmlFor='country'>Country : </label>
                        <input type='text' name="country" id='country' ref={countryRef}/>
                    </div>
                    <button type="submit">Get Weather</button>
                    <button onClick={clearHandler}>Clear</button>
                </form>
            </section>
            {Object.keys(props.weatherItem).length !== 0 ? <section className="container">
                <div className={classes.showWeather}>
                    <p>{city} , {country}</p>
                    <h2>{weather}</h2>
                    <p>{weatherDesc}</p>
                    <p>{minTemp} &#8451; ~ {maxTemp} &#8451;</p>
                    <p>{humidity} %</p>
                    <p>{setTime}</p>

                </div>
            </section> : null}
        </Fragment>
    );
};
export default ForecastItem;

