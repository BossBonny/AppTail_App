import React, { useState } from 'react'
import {
    Text,
    View,
    TextInput,
    Pressable,
    ScrollView,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import useTareas from '../hook/useTareas';
import clienteAxios from '../config/clienteAxios';
import Alerta from '../helpers/Alerta';
import useAuth from '../hook/useAuth';
import ModalEliminar from '../re-comps/modalEliminar';
import CategoriaComp from '../re-comps/categoriaComp';
import PrioridadComp from '../re-comps/prioridadComp';
import TicketComp from '../re-comps/ticketComp';
import ColaboradoresComp from '../re-comps/colaboradoresComp';

const AddTask = () => {

    const router = useRouter();

    const { auth } = useAuth();
    const { mostrarAlerta, alerta, categorias, users } = useTareas();

    const [cat, setCat] = useState([]);

    const [opcional, setOpcional] = useState(false);
    const [modalEtiqueta, setModalEtiqueta] = useState(false);
    const [modalColab, setModalColab] = useState(false);
    const [etiquetaEliminar, setEtiquetaEliminar] = useState({});
    const [colabEliminar, setColabEliminar] = useState({});
    const [etiquetaEliminada, setEtiquetaEliminada] = useState(false);
    const [addCategoria, setAddCategoria] = useState(false);
    const [creado, setCreado] = useState(false);
    const [nombre, setNombre] = useState('');
    const [prioridad, setPrioridad] = useState('');
    const [etiqueta, setEtiqueta] = useState({
        nombre: '',
        id: 0
    });
    const [count, setCount] = useState(0);
    const [etiquetas, setEtiquetas] = useState([]);

    const [col, setCol] = useState('')
    const [colaboradores, setColaboradores] = useState([])
    const [usuariosFiltrados, setUsuariosFiltrados] = useState({})

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

    //Las funciones FiltrarUsers, agregarcolaborador  y eliminarColaborador se repiten

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


    const handleSubmit = async () => {

        if (nombre === '') {
            return mostrarAlerta({ msg: 'El nombre es Obligatorio', error: true });
        }
        if (cat === '') {
            return mostrarAlerta({ msg: 'La categoria es obligatoria', error: true });
        }
        if (prioridad === '') {
            return mostrarAlerta({ msg: 'La prioridad es obligatoria', error: true });
        }


        const categoria = cat
        const creador = auth._id


        try {

            await clienteAxios.post(`/tareas`, { nombre, categoria, prioridad, etiquetas, creador, colaboradores })

            setCreado(true)

            setTimeout(() => {
                setCreado(false)
                router.push('/home')
            }, 2000)

        } catch (error) {
            console.log('Error creating the task', error);
        }

    }

    const { msg } = alerta;

    return (
        <ScrollView style={{ padding: 40 }}>
            <View>
                {modalEtiqueta && <ModalEliminar item={etiquetaEliminar} setModal={setModalEtiqueta} modal={modalEtiqueta} eliminarEtiqueta={handleEliminarEtiqueta} />}
                {modalColab && <ModalEliminar item={colabEliminar} setModal={setModalColab} modal={modalColab} eliminarEtiqueta={eliminarColaborador} />}
                <Text style={{ fontSize: 40, fontWeight: '900', marginVertical: 50, alignSelf: 'center' }}>
                    New Task
                </Text>
                {msg && <Alerta alerta={alerta} />}
                <Text style={{ fontSize: 20, marginVertical: 20, fontWeight: '700', alignSelf: 'baseline', paddingHorizontal: 20 }}>Nombre:</Text>
                <TextInput
                    style={{ width: 350, borderBottomWidth: 1, marginLeft: 20, marginBottom: 20, fontSize: 15 }}
                    placeholder='Introduce el nombre de la tarea'
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
                    style={[creado ? { backgroundColor: 'green' } : { backgroundColor: 'black' }, { height: 60, marginVertical: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 20, marginBottom: 200 }]}
                    onPress={() => handleSubmit()}
                >
                    {creado
                        ? <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', color: 'white' }}>Tarea Creada</Text>
                        : <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', color: 'white' }}>Crear Tarea</Text>
                    }
                </Pressable>
            </View>
        </ScrollView>
    )
}

export default AddTask;