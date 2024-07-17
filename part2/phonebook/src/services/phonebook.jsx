import axios from "axios";

const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const addNew = (phonebook) => {
    return axios.post(baseUrl, phonebook)
}

const deleteEntry = (id) => {
    return axios.delete(baseUrl + `/${id}`)
}

const update = (id, objectToUpdate) => {
    return axios.put(baseUrl + `/${id}`, objectToUpdate)
}

export default {getAll: getAll, addNew: addNew, deleteEntry: deleteEntry, update: update}