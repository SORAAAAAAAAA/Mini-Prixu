import React, { createContext, useContext, useState, useEffect, Children } from 'react';
import { Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context';

type AuthContextType = {
    signIn: (data: any) => Promise<void>;
    signOut: (data: any) => Promise<void>;
    session: any;
    user: any;   
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({children} : {children: React.ReactNode}) => {
    const [loading, setLoading] = useState(false);
    const [session, setSession] = useState(false);
    const [user, setUser] = useState('Jacob');

    const signIn = async (data: any ) => {
        // Implement sign-in logic here
    }

    const signOut = async (data: any) => {
        // Implement sign-out logic here
    }

    return (
        <AuthContext.Provider value={{signIn, signOut, session, user}}>
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
    return useContext(AuthContext);
}

export {useAuth, AuthContext, AuthProvider};