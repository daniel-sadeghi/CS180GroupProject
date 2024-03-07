const URI = 'https://api.spoonacular.com/recipes';
const API_KEY = "0e05e31e1192449ab972630943bc0865" //TODO Fetch the API Key from the backend server

const fetchSpoonData = async (endpoint, options=[]) => {
    url = URI + `/${endpoint}?apiKey=${API_KEY}`;
    options.forEach(option => {
        url += `&${option}`;
    });
    return await fetch(url);
};

export default fetchSpoonData;
