import {Fragment, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {fetchWeatherData, sendWeatherData, getWeatherData} from "./store/weather-actions";
import History from './components/Weather/History';
import Layout from './components/Layout/Layout';
import Forecasts from './components/Forecast/Forecasts';
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
    const dispatch = useDispatch();
    const weather = useSelector((state) => state.weather);
    const notification = useSelector(state => state.ui.notification);

    useEffect(() => {

        dispatch(fetchWeatherData());

    }, [dispatch]);

    useEffect(() => {
        if (isInitial) {
            isInitial = false;
            return;
        }

        if (weather.changed) {
            dispatch(sendWeatherData(weather));
        }
    }, [weather, dispatch]);

    useEffect(() => {
        if (isInitial) {
            isInitial = false;
            return;
        }

        if (weather.new) {
            dispatch(getWeatherData(weather));
        }
    }, [weather, dispatch]);

    return (
        <Fragment>
            {notification &&
            <Notification
                status={notification.status}
                title={notification.title}
                message={notification.message}
            />}
            <Layout>
                <Forecasts/>
                <History/>
            </Layout>
        </Fragment>
    );
}

export default App;
