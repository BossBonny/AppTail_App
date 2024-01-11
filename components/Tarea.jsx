import React, { useState, useEffect } from 'react'
import {
    Text,
    View,
    TextInput,
    Pressable,
    ScrollView,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import useTareas from '../hook/useTareas';
import clienteAxios from '../config/clienteAxios';
import Alerta from '../helpers/Alerta';
import ModalEliminar from '../re-comps/modalEliminar';
import CategoriaComp from '../re-comps/categoriaComp';
import PrioridadComp from '../re-comps/prioridadComp';
import TicketComp from '../re-comps/ticketComp';
import ColaboradoresComp from '../re-comps/colaboradoresComp';


const Tarea = () => {

    const router = useRouter();

    const { mostrarAlerta, alerta, categorias, users } = useTareas();

    const [opcional, setOpcional] = useState(false);
    const [modalEtiqueta, setModalEtiqueta] = useState(false);
    const [modalColab, setModalColab] = useState(false);
    const [etiquetaEliminar, setEtiquetaEliminar] = useState({});
    const [colabEliminar, setColabEliminar] = useState({});
    const [etiquetaEliminada, setEtiquetaEliminada] = useState(false);
    const [addCategoria, setAddCategoria] = useState(false);
    const [actualizado, setActualizado] = useState(false);
    const [nombre, setNombre] = useState('');
    const [cat, setCat] = useState({});
    const [prioridad, setPrioridad] = useState('');
    const [etiqueta, setEtiqueta] = useState({
        nombre: '',
        id: 0
    });
    const [count, setCount] = useState(0);
    const [etiquetas, setEtiquetas] = useState([]);

    const [modalEliminar, setModalEliminar] = useState(false);

    const [col, setCol] = useState('')
    const [colaboradores, setColaboradores] = useState([])
    const [usuariosFiltrados, setUsuariosFiltrados] = useState({})

    const [realizada, setRealizada] = useState(false)



    useEffect(() => {
        const obtenerTarea = async () => {
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

                const tareaId = await AsyncStorage.getItem('tarea');

                const params = [tareaId, data._id]

                if (!tareaId) {
                    console.log('No hay Tarea')
                } else {
                    const { data } = await clienteAxios(`/tareas/tarea/${params}`);

                    setNombre(data.nombre);
                    setCat(data.categoria);
                    setPrioridad(data.prioridad);
                    setEtiquetas(data.etiquetas);
                    setColaboradores(data.colaboradores)
                    setRealizada(data.estado)
                }
            } catch (error) {
                console.log("error obteniendo la tarea", error);
            }
        }
        obtenerTarea()
    }, [])



    const handleNuevaEtiqueta = () => {
        if (etiqueta.nombre !== '') {
            setEtiquetas([...etiquetas, etiqueta])
            setCount(count + 1)
            setEtiqueta({ nombre: '', id: 0 })
        }

        if (etiqueta.nombre === '') {
            mostrarAlerta({
                msg: 'Etiqueta Vacía, Introduzca algo',
                error: true
            });
        }
    }

    const handleEliminarEtiqueta = () => {

        const nuevasEtiquetas = etiquetas.filter(eti => eti.id !== etiquetaEliminar.id);

        setEtiquetas(nuevasEtiquetas);
        setCount(count - 1)

        setModalEtiqueta(false)
        setEtiquetaEliminada(true)

        setTimeout(() => {
            setEtiquetaEliminada(false)
        }, 3000)

    }

    const filtrarUsers = () => {
        if (col) {
            const newData = users.filter(item => {
                const itemData = item.nombre ? item.nombre.toLowerCase() : ''.toLowerCase();
                const textdata = col.toLowerCase();

                return itemData.indexOf(textdata) > -1;
            })
            setUsuariosFiltrados(newData)
        } else {
            setUsuariosFiltrados(users)
        }
    }

    const agregarColaborador = (item) => {

        let existe = false;

        colaboradores.map(c => {
            if (c._id === item._id) {
                existe = true;
                return
            }
        })

        if (!existe) {
            setColaboradores([...colaboradores, item])
        }
    }

    const eliminarColaborador = () => {
        const nuevosColaboradores = colaboradores.filter(c => c._id !== colabEliminar._id);

        setColaboradores(nuevosColaboradores);

        setModalColab(false)
    }

    const handleUpdate = async () => {

        if (nombre === '') {
            return mostrarAlerta({ msg: 'El nombre es Obligatorio', error: true });
        }
        if (cat === '') {
            return mostrarAlerta({ msg: 'La categoria es obligatoria', error: true });
        }
        if (prioridad === '') {
            return mostrarAlerta({ msg: 'La prioridad es obligatoria', error: true });
        }

        const categoria = cat;
        const estado = realizada;

        const token = await AsyncStorage.getItem('token');
        if (!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await clienteAxios('/usuarios/perfil', config);

        const tareaId = await AsyncStorage.getItem('tarea');

        const params = [tareaId, data._id]

        try {

            await clienteAxios.put(`/tareas/tarea/${params}`, { nombre, categoria, prioridad, etiquetas, colaboradores, estado })

            setActualizado(true)

            await AsyncStorage.removeItem('tarea');

            setTimeout(() => {
                setActualizado(false)
                router.push('/home')
            }, 2000)

        } catch (error) {
            console.log('Error updating the task', error);
        }
    }

    const eliminarTarea = async () => {

        const token = await AsyncStorage.getItem('token');
        if (!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await clienteAxios('/usuarios/perfil', config);

        const tareaId = await AsyncStorage.getItem('tarea');

        const params = [tareaId, data._id]

        try {
            await clienteAxios.delete(`/tareas/tarea/${params}`)

            await AsyncStorage.removeItem('tarea');

            router.push('/home')

        } catch (error) {
            console.log(error);
        }

        setModalEliminar(false)
    }

    const { msg } = alerta;

    return (
        <ScrollView style={{ padding: 40 }}>
            {modalEtiqueta && <ModalEliminar item={etiquetaEliminar} setModal={setModalEtiqueta} modal={modalEtiqueta} eliminarEtiqueta={handleEliminarEtiqueta} />}
            {modalColab && <ModalEliminar item={colabEliminar} setModal={setModalColab} modal={modalColab} eliminarEtiqueta={eliminarColaborador} />}
            {modalEliminar && <ModalEliminar item={nombre} setModal={setModalEliminar} modal={modalEliminar} eliminarEtiqueta={eliminarTarea} />}
            <Text style={{ fontSize: 40, fontWeight: '900', marginVertical: 50, alignSelf: 'center' }}>
                New Task
            </Text>
            {msg && <Alerta alerta={alerta} />}
            <Text style={{ fontSize: 20, marginVertical: 20, fontWeight: '700', alignSelf: 'baseline', paddingHorizontal: 20 }}>Nombre:</Text>
            <TextInput
                style={{ width: 350, borderBottomWidth: 1, marginLeft: 20, marginBottom: 20, fontSize: 15 }}
                value={nombre}
                onChangeText={(text) => setNombre(text)}
            />

            <CategoriaComp cat={cat} setCat={setCat} categorias={categorias} setAddCategoria={setAddCategoria} addCategoria={addCategoria} />

            <PrioridadComp prioridad={prioridad} setPrioridad={setPrioridad} />

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 }}>
                <Text style={{ fontSize: 15, color: 'gray', padding: 20, alignSelf: 'center', marginTop: 20, marginLeft: 120, marginBottom: 10 }}>(Opcional)</Text>
                <Pressable
                    onPress={() => setOpcional(!opcional)}
                >
                    {!opcional ? <AntDesign name="circledowno" size={30} color="black" /> : <AntDesign name="upcircleo" size={30} color="black" />}
                </Pressable>
            </View>
            {opcional &&
                <View>
                
                    <TicketComp count={count} etiquetas={etiquetas} setEtiquetaEliminar={setEtiquetaEliminar} etiquetaEliminada={etiquetaEliminada}
                        setModalEtiqueta={setModalEtiqueta} modalEtiqueta={modalEtiqueta} setEtiqueta={setEtiqueta} etiqueta={etiqueta} handleNuevaEtiqueta={handleNuevaEtiqueta} />

                    <ColaboradoresComp colaboradores={colaboradores} setColabEliminar={setColabEliminar} setModalColab={setModalColab} modalColab={modalColab} setCol={setCol}
                        col={col} filtrarUsers={filtrarUsers} usuariosFiltrados={usuariosFiltrados} agregarColaborador={agregarColaborador} />

                </View>
            }
            <Pressable
                style={[ realizada ? { backgroundColor: 'green'} : { backgroundColor: 'orange'} , { height: 60, alignItems: 'center', justifyContent: 'center', borderRadius: 20 }]}
                onPress={() => { setRealizada(!realizada) }}
            >
                <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>{realizada ? 'Realizada' : 'Pendiente'}</Text>
            </Pressable>
            <Pressable
                style={[actualizado ? { backgroundColor: 'green' } : { backgroundColor: 'black' }, { height: 60, alignItems: 'center', justifyContent: 'center', borderRadius: 20 , marginVertical: 20}]}
                onPress={() => handleUpdate()}
            >
                {actualizado
                    ? <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Tarea Actualizada</Text>
                    : <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Actualizar Tarea</Text>
                }
            </Pressable>
            <Pressable
                style={{ height: 60, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: 'red', marginBottom: 200 }}
                onPress={() => { setModalEliminar(true) }}
            >
                <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Eliminar Tarea</Text>
            </Pressable>
        </ScrollView>
    )
}

export default Tarea;
