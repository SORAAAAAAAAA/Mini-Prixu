import React, { createContext, useContext, useState, useEffect } from 'react';
import { Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context';

type AuthContextType = {
    signIn: (data: any) => Promise<void>;
    signOut: (data: any) => Promise<void>;
    session: any;
    user: any;  
    loading: boolean; 
}

type UserType = {
    id: string;
    name: string;
    email: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({children} : {children: React.ReactNode}) => {
    const [loading, setLoading] = useState(false);
    const [session, setSession] = useState(false);
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        const initializeApp = async () => {
            try {
                await SecureStore.deleteItemAsync('userSession');
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
        // Implement sign-in logic here
    }

    const signOut = async (data: any) => {
        // Implement sign-out logic here
        await SecureStore.deleteItemAsync('userSession');
        setSession(false);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{signIn, signOut, session, user, loading}}>
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