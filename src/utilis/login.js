import axios from 'axios'


export function signup() {
    return async () => {
        const response = await axios.post('http://localhost:5000/auth/sign')
        return response.data
    }
}


