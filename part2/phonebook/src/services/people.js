import axios from 'axios'
const url = 'http://localhost:3001/people'

const getAllPeople = () => {return axios.get(url).then(r => r.data).catch(e => e)}
const getPerson = (id) => {return axios.get(`${url}/${id}`).then(r => r.data).catch(e => e)}
const createPerson = p => {return axios.post(url,p).then(r => r.data).catch(e => e)}
// Use .catch clauses for whenever a bad request happens, stops program
// from breaking and allows you to hbandle the error appropriately.
const updatePerson = (id, p) => {return axios.put(`${url}/${id}`,p).then(r => r.data).catch(e => e)}
const deletePerson = (id) => {return axios.delete(`${url}/${id}`).then(r => r.data).catch(e => e)}

export default { getAllPeople, getPerson, createPerson, updatePerson, deletePerson }