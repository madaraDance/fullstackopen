import axios from 'axios'
const baseUrl = '/api/login'

const loginUser = async credentials => {
    try {
        const response = await axios.post(baseUrl, credentials)
        return response.data
    } catch (e) {
        console.log(e)
        return null
    }

}

export default { loginUser }