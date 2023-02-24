import axios from 'axios'

const apiUrl = 'https://viacep.com.br/ws/'

const apiCEP = axios.create({
    baseURL : apiUrl
})

export default apiCEP