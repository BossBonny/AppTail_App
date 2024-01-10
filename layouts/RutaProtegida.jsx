
import { ActivityIndicator } from "react-native";

import LoginRoute from "../app/loginRoute";
import Home from "../app/home";
import useAuth from "../hook/useAuth";


const RutaProtegida = () => {


    const {auth, cargando} = useAuth();

    if(cargando) return <ActivityIndicator  style={{marginTop:400}} size="xl" color="black" />

    if(auth._id) return (<><Home /></>)
    
    if(!auth._id) return (<><LoginRoute/></>)
}

export default RutaProtegida;