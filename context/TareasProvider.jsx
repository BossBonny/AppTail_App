import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io } from "socket.io-client";

let socket;

const TareasContext = createContext();

const TareasProvider = ({ children }) => {

    const router = useRouter();

    const [tareas, setTareas] = useState([]);
    const [tareasFiltradas, setTareasFiltradas] = useState([]);
    const [lista, setLista] = useState([])
    const [tarea, setTarea] = useState([]);
    const [alerta, setAlerta] = useState([]);
    const [categorias, setCategorias] = useState({})
    const [users, setUsers] = useState({})
    const [search, setSearch] = useState('')

    useEffect(() => {
        socket = io(process.env.EXPO_PUBLIC_BACKEND_URL)
    }, [])

    useEffect(() => {

    })

    useEffect(() => {
        const fetchTareasData = async () => {

            setSearch('')

            try {

                const token = await AsyncStorage.getItem('token');
                if (!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios('/usuarios/perfil', config);

                const response = await clienteAxios.get(`/tareas/${data._id}`);

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

    useEffect(() => {
        const fetchUsers = async () => {

            try {

                const token = await AsyncStorage.getItem('token');
                if (!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios('/usuarios/perfil', config);

                const response = await clienteAxios.get(`usuarios/usuarios/${data._id}`);
                
                setUsers(response.data)
            } catch (error) {
                console.log("error fetching Users Data", error);
            }
        }
        fetchUsers();

    }, [])

    useEffect(() => {
        if(search.length > 0){
            const newData = tareas.filter( t => {
                const itemData = t.nombre ? t.nombre.toLowerCase() : ''.toLowerCase();
                const textdata = search.toLowerCase();

                return itemData.indexOf(textdata) > -1;
            })

            setTareasFiltradas(newData)
        }else{
            setTareasFiltradas([])
        }
    },[search])

    const obtenerLista = () => {
        if(tareasFiltradas.length === 0){
            setLista(tareas)
        }else{
            setLista(tareasFiltradas)
        }
    }




    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(() => {
            setAlerta({})
        }, 4000)
    }


    const handleTarea = async (item) => {


        try {

            await AsyncStorage.setItem('tarea', item._id)


            router.push('/tareaRoute')


        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const obtenerCategoria = (id) => {

        const categoria = categorias.find(c => c._id === id);

        return categoria.nombre
    }


    const cerrarSesion = async () => {

        try {
            await AsyncStorage.removeItem('token')
            await AsyncStorage.removeItem('tarea')

            setTarea([]);
            setTareas([]);
            setAlerta([]);
            setCategorias({});

        } catch (error) {
            console.log(error);
        }

        setTimeout(() => {
            router.push('/loginRoute')
        }, 1000)
    }

    return (
        <TareasContext.Provider
            value={{
                tareas,
                mostrarAlerta,
                alerta,
                categorias,
                cerrarSesion,
                setTarea,
                tarea,
                handleTarea,
                obtenerCategoria,
                users,
                search,
                setSearch,
                tareasFiltradas,
                lista,
                obtenerLista
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