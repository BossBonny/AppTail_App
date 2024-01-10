import { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token =  await AsyncStorage.getItem('token');
            if(!token){
                setCargando(false)
                return
            }   

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const {data} = await clienteAxios('/usuarios/perfil',config);
                setAuth(data)
            } catch (error) {
                setAuth({})
                console.log(error);
            }
            setCargando(false)
        } 

        autenticarUsuario();
    },[])


    return (
        <AuthContext.Provider
            value={{
                setAuth,
                auth,
                cargando,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
};

export {
    AuthProvider
}

export default AuthContext;