import clearDay from '../icons/sun.gif';
import cloudy from '../icons/clouds.gif';
import foggy from '../icons/foggy.gif';
import thunderstorm from '../icons/storm.gif';
import snowy from '../icons/snowy.gif';
import windy from '../icons/wind.gif';
import partiallyCloudy from '../icons/partially-cloudy.gif';
import rainy from '../icons/rain.gif';

const iconMap = {
    'Sunny': clearDay,
    'Cloudy': cloudy,
    'Partially Cloudy': partiallyCloudy,
    'Rainy': rainy,
    'Snowy': snowy,
    'Windy': windy,
    'Foggy': foggy,
    'Thunderstorm': thunderstorm
}

export function getWeatherIcon(iconName) {
    return iconMap[iconName] || clearDay;
}
