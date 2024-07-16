import axios from "axios";

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const exactCountryBaseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

const getAll = () => {
    return axios.get(baseUrl)
}

const getExactCountry = (name) => {
    return axios.get(exactCountryBaseUrl + name)
}

export default {getAll: getAll, getExactCountry: getExactCountry}
