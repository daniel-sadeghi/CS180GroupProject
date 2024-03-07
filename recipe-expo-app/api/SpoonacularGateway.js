import AsyncStorage from '@react-native-async-storage/async-storage';

const URI = 'https://api.spoonacular.com/recipes';
const API_KEY = "0e05e31e1192449ab972630943bc0865" //TODO Fetch the API Key from the backend server

const fetchSpoonData = async (endpoint, options=[]) => {
    let url = URI + `/${endpoint}?`;
    options.forEach(option => {
        url += `&${option}`;
    });
    console.log('URL:', url);

    const cachedResponse = await AsyncStorage.getItem(url);

    if (cachedResponse !== null) {
        return JSON.parse(cachedResponse);
    } else {
        const urlWithKey = url + `&apiKey=${API_KEY}`;
        const getResponse = await fetch(urlWithKey).then(response => response.json());
        await AsyncStorage.setItem(url, JSON.stringify(getResponse));
        return getResponse;
    }
}

export default fetchSpoonData;