import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useRouter } from "expo-router";

const TareasContext = createContext();

const TareasProvider = ({ children }) => {

    const router = useRouter();

    const [tareas, setTareas] = useState([]);
    const [alerta, setAlerta] = useState([]);
    const [categorias, setCategorias] = useState({})

    useEffect(() => {
        const fetchTareasData = async () => {

            try {
                const response = await clienteAxios.get(`/tareas`);
                setTareas(response.data)
            } catch (error) {
                console.log("error fetching Task Data", error);
            }
        }
        fetchTareasData();

    }, [])

    useEffect(() => {
        const fetchCategorieData = async () => {

            try {
                const response = await clienteAxios.get(`/categorias`);
                setCategorias(response.data)
            } catch (error) {
                console.log("error fetching Categorie Data", error);
            }
        }
        fetchCategorieData();

    }, [])



    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(() => {
            setAlerta({})
        }, 4000)
    }

    const cerrarSesion = () => {
        setTareas([]);
        setAlerta([]);
        setCategorias({})
        router.push('/loginRoute')
    }

    return (
        <TareasContext.Provider
            value={{
                tareas,
                mostrarAlerta,
                alerta,
                categorias,
                cerrarSesion
            }}
        >
            {children}
        </TareasContext.Provider>
    )
};

export {
    TareasProvider
};

export default TareasContext;