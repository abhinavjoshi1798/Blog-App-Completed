import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthContextProvider({children}){
    const [isAuth,setIsAuth] = useState(false)
    const [token,setToken] = useState("")
    const [user,setUser] = useState("")

    const login = (token,user) => {
        setIsAuth(true);
        setToken(token);
        setUser(user)
    }

    const logout = () => {
        setIsAuth(false);
        setToken("")
    }

    return (
        <AuthContext.Provider value={{isAuth, login, logout, token, user}}>
           {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider