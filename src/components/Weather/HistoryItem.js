import {useDispatch} from "react-redux";
import {weatherActions} from "../../store/weather-slice";
import classes from './HistoryItem.module.css';
import { BiSearch } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";

const WeatherItem = (props) => {
    const dispatch = useDispatch();
    const { index, id, city, country, setTime} = props.item;

    const removeItemHandler = () => {
        dispatch(weatherActions.removeItemFromWeather(id));
    };

    const addItemHandler = () => {
        dispatch(weatherActions.callWeather({city, country}))
    };

    return (
        <li className={classes.item}>
            <div className={classes.leftDetails}>
                <p> {index}. </p>
                <p>{city} , {country}</p>
            </div>
            <div className={classes.details}>
                <div className={classes.actions}>
                    <p>{setTime}</p>
                    <button onClick={addItemHandler}><BiSearch/></button>
                    <button onClick={removeItemHandler}><MdOutlineDeleteForever/></button>

                </div>
            </div>
        </li>
    );
};

export default WeatherItem;
