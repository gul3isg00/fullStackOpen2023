import axios from 'axios'
const url = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getAllCountries = () => {return axios.get(`${url}all`).then(r => r.data).catch(e => null)}
const getCountryByName = (n) => {return axios.get(`${url}name/${n}`).then(r => r.data).catch(e => null)}

export default { getAllCountries, getCountryByName }