import { API_URL } from '../../constants/const.url';

export default async function signUp(name: string, email: string, password: string) {
    return fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password })
    })
}
