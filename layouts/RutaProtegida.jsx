import { ActivityIndicator } from "react-native";
import useAuth from "../hook/useAuth";
import LoginRoute from "../app/loginRoute";
import Home from "../app/home";

const RutaProtegida = () => {

    const {auth, cargando} = useAuth();

    if(cargando) return <ActivityIndicator  style={{marginTop:400}} size="xl" color="black" />
    return (
        <>
            {auth._id ? <Home/> : <LoginRoute/>}
        </>
    )
}

export default RutaProtegida;