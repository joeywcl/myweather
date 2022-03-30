import {useSelector} from "react-redux";
import WeatherItem from './HistoryItem';
import classes from './History.module.css';
import Card from '../UI/Card';

const History = () => {
    const weatherItems = useSelector(state => state.weather.items);

    return (
        <Card className={classes.history}>
            <h2>Search History</h2>
            { weatherItems.length > 0 ? <ul>
                {weatherItems.map((item, index) => <WeatherItem
                    key={item.id}
                    item={{
                        index: index + 1,
                        id: item.id,
                        city: item.city,
                        country: item.country,
                        setTime: item.setTime
                    }}
                />)}
            </ul>: <p className={classes.empty}>No Records</p>}
        </Card>
    );
};

export default History;
