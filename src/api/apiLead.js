import axios from 'axios'

const apiUrlLead = 'https://spa-back-end-igor.onrender.com'

const apiLead = axios.create({
    baseURL : apiUrlLead,
    headers : {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'Content-Type, X-Request-With, X-Requested-By',
        'Access-Control-Allow-Methods' : 'POST,GET',
        'Access-Control-Allow-Origin': '*'

    }
})

export default apiLead;