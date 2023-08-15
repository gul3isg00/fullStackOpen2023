import axios from 'axios'
const url = 'http://localhost:3001/people'

const getAllPeople = () => {return axios.get(url).then(r => r.data)}
const getPerson = (id) => {return axios.get(`${url}/${id}`).then(r => r.data)}
const createPerson = p => {return axios.post(url,p).then(r => r.data)}
const updatePerson = (id, p) => {return axios.put(`${url}/${id}`,p).then(r => r.data)}
const deletePerson = (id) => {return console.log("implement")};

export default { getAllPeople, getPerson, createPerson, updatePerson, deletePerson }