import React, { createContext, useContext, useState, useEffect } from 'react';
import { Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context';
import logIn from '../utils/apiCall/api.signin';
import logUp from '../utils/apiCall/api.signup';

type AuthContextType = {
    signIn: (data: any) => Promise<void>;
    signUp: (data: any) => Promise<void>;
    signOut: () => Promise<void>;
    session: any;
    loading: boolean; 
}

// User type definition
type UserType = {
    id: string;
    name: string;
    email: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({children} : {children: React.ReactNode}) => {
    const [loading, setLoading] = useState(false);
    const [session, setSession] = useState(false);

    useEffect(() => {
        const initializeApp = async () => {
            try {
                // Check for existing session in storage
                const storedSession = await SecureStore.getItemAsync('userSession');
                console.log(storedSession);

                if (storedSession) {
                    // User has a previous session
                    setSession(true);
                    // You can also restore user data here
                }
            } catch (error) {
                console.error('Error initializing app:', error);
            } finally {
                setLoading(false); // App is ready
            }
        };

        initializeApp();
    }, []);

    const signIn = async (data: any ) => {
        setLoading(true);

        try {
            const response = await logIn(data.email, data.password);

            if (response.ok) {
                const responseData = await response.json();
                setSession(true);
                await SecureStore.setItemAsync('userSession', JSON.stringify(responseData));
            } else {
                const error = await response.json()
                alert(error.error);
            }

        } catch (error) {
            console.error('Error signing in:', error);
        } finally {
            setLoading(false);
        }
    }

    const signUp = async (data: any) => {
        setLoading(true);

        try {
            const response = await logUp(data.name, data.email, data.password);
            console.log(response);
            
            if (response.ok) {
                const responseData = await response.json();
                setSession(true);
                await SecureStore.setItemAsync('userSession', JSON.stringify(responseData));
                return responseData.user;
            } else {
                const error = await response.json()
                alert(error.error);
            }

        } catch (error) {
            console.error('Error signing up:', error);
        } finally {
            setLoading(false);
        }
    }

    const signOut = async () => {
        // Implement sign-out logic here
        await SecureStore.deleteItemAsync('userSession');
        setSession(false);
    }

    return (
        <AuthContext.Provider value={{signIn, signUp, signOut, session, loading}}>
            {loading ? (
                <SafeAreaView
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: 'white'
                    }}
                    >
                    <Text>Loading...</Text>
                </SafeAreaView>
            ) : (
                children
                )
            }  
        </AuthContext.Provider>
    );
}

const useAuth = () => {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export {useAuth, AuthContext, AuthProvider};