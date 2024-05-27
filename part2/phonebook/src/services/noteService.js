import axios from "axios";

const baseUrl = 'api/persons'

const getAllPersons = () => {
    return axios.get(baseUrl)
        .then(response => response.data)
}

const createPerson = (newPerson) => {
    return axios.post(baseUrl, newPerson)
        .then(response => response.data)
}

const deletePerson = (personId) => {
    return axios.delete(`${baseUrl}/${personId}`)
}

const putPerson = (newPerson) => {
    return axios.put(`${baseUrl}/${newPerson.id}`, newPerson)
        .then(response => response.data)
}

export default { getAllNotes: getAllPersons, createNote: createPerson, deletePerson, putPerson }