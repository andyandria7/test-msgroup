import { createContext, ReactNode, useEffect, useState } from "react";
import { AuthResponse, User } from "../types";
import api from "../api/axios";

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthentificated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string, password_confirmation: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext =  createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}:{children: ReactNode}){
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(
        localStorage.getItem('token')
    );
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(()=>{
        const checkAuth = async () => {
            const saveToken = localStorage.getItem('token');
            if(!saveToken){
                setIsLoading(false)
                return;
            }
            try {
                const {data} = await api.get<User>('/user');
                setUser(data);
                setToken(saveToken);
            } catch (error) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setToken(null);
                setUser(null);
            }finally{
                setIsLoading(false);
            }
        }
        checkAuth();
    }, []);
    const login = async(email: string, password:string)=>{
        const {data} = await api.post<AuthResponse>('/login',{email,password});
        localStorage.setItem('token',data.token);
        setToken(data.token);
        setUser(data.user);
    };
    const register = async (name: string, email: string, password: string, password_confirmation: string) => {
        const {data} = await api.post<AuthResponse>('/register',{name,email,password,password_confirmation});
        localStorage.setItem('token',data.token);
        setToken(data.token);
        setUser(data.user);
    }
    const logout = async () =>{
        try {
            await api.post('/logout');
        } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('user'),
            setToken(null);
            setUser(null);
        }
    }
    return (
        <AuthContext.Provider value={{ 
            user, token, isAuthentificated: !!token, isLoading, login, register, logout
         }}>
            {children}
         </AuthContext.Provider>
    )
}

export {AuthContext};