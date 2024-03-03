const URI = 'https://api.spoonacular.com/recipes';
const API_KEY = "0e05e31e1192449ab972630943bc0865" //TODO Fetch the API Key from the backend server
const url = URI + `?apiKey=${API_KEY}`;

export const fetchComplex = async (options = {}) => {
    const response = await fetch(url, options);
    return await response.json();
};
