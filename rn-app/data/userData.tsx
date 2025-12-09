import * as SecureStore from 'expo-secure-store';

export const getUserData = async () => {
    try {
        const userDataString = await SecureStore.getItemAsync('userSession');
        if (userDataString) {
            return JSON.parse(userDataString).user;
        }
    } catch (error) {
        console.error('Error getting user data:', error);
    }
    return null;
}