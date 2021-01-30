import React, { useContext } from 'react';
import { auth } from '../firebase/firebase';
import { login, logout, signup } from '../firebase/firebase-auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [currentUser, loading] = useAuthState(auth);

    const value = {
        currentUser,
        signup,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children }
        </AuthContext.Provider>
    );
}