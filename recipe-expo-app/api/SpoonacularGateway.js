import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_KEY = "0e05e31e1192449ab972630943bc0865" //TODO Fetch the API Key from the backend server

const fetchSpoonGateway = async (endpoint, options=[]) => {
    let url = `https://api.spoonacular.com/${endpoint}?`;
    for (let i = 0; i < options.length; i++) {
        if (i !== 0) {
            url += '&';
        }
        url += options[i];
    }

    const cachedResponse = await AsyncStorage.getItem(url);

    if (cachedResponse !== null) {
        console.log(`Fetched ${url} from cache`);
        return JSON.parse(cachedResponse);
    } else {
        const urlWithKey = url + `&apiKey=${API_KEY}`;
        try {
            const response = await axios.get(urlWithKey);
            console.log(`Fetched ${url} from API`);
            await AsyncStorage.setItem(url, JSON.stringify(response.data));
            return response.data;
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                console.error('Error status:', error.response.status);
                console.error('Error headers:', error.response.headers);
            } else if (error.request) {
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
        }
    }
}

export default fetchSpoonGateway;