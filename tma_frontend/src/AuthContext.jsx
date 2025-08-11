import React, { createContext, useContext, useState } from 'react'
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(null);

    const login = async (username, password) => {
        const response = await axios.post("api/login", {username, password});
        if(response.data.success === true){
            window.sessionStorage.setItem("auth_token", response.data.access_token);
            setToken(response.data.access_token);
            setCurrentUser(response.data.user);
            return true;
        }
        return false;
    }

    const logout = async () => {
        const token = window.sessionStorage.getItem("auth_token");
        await axios.post("api/logout", null, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        window.sessionStorage.removeItem("auth_token");
        setToken(null);
        setCurrentUser(null);
    }

    return (
        <AuthContext.Provider value={{currentUser, token, login, logout}}>
            {children}
        </AuthContext.Provider>

    )
}

export const useAuth = () => useContext(AuthContext);

