import { API_URL } from '../../constants/const.url';

export default async function signIn(email: string, password: string) {
    console.log("API_URL:", API_URL);
    return fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
}
