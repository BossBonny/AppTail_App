import React, { useState, useEffect } from 'react'
import {
    Text,
    View,
    TextInput,
    Platform,
    Pressable,
    ScrollView,
    FlatList,
    Modal
} from 'react-native'
import { AntDesign, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from "@react-native-community/datetimepicker"
import { useRouter } from 'expo-router';

import useAuth from '../hook/useAuth';
import useTareas from '../hook/useTareas';
import clienteAxios from '../config/clienteAxios';
import Alerta from '../helpers/Alerta';
import { formatearFecha } from '../helpers/formatearFecha';

//TODO: Añadir el creador de la tarea
//TODO: Añadir funcionalidad para colaboradores

const AddTask = () => {

    const router = useRouter();

    const { mostrarAlerta, alerta } = useTareas();

    const [categorias, setCategorias] = useState([]);

    const [addFechaEntrega, setAddFechaEntrega] = useState(false);
    const [opcional, setOpcional] = useState(false);
    const [modalEtiqueta, setModalEtiqueta] = useState(false);
    const [etiquetaEliminar, setEtiquetaEliminar] = useState({});
    const [etiquetaEliminada, setEtiquetaEliminada] = useState(false);
    const [addCategoria, setAddCategoria] = useState(false);
    const [nombre, setNombre] = useState('');
    const [cat, setCat] = useState({});
    const [prioridad, setPrioridad] = useState('');
    const [etiqueta, setEtiqueta] = useState({
        nombre: '',
        id: 0
    });
    const [count, setCount] = useState(0);
    const [etiquetas, setEtiquetas] = useState([]);

    const [date, setDate] = useState(new Date());
    const [fechaEntrega, setFechaEntrega] = useState('');

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

    const onChange = ({ type }, selectedDate) => {
        if (type == 'set') {
            const currentDate = selectedDate;
            setDate(currentDate)

            if (Platform.OS === "android") {
                setFechaEntrega(currentDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }))
                setAddFechaEntrega(false)
            }
        } else {
            setAddFechaEntrega(false)
        }
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

        console.log('La categoria es:', cat);

        const categoria = cat.nombre

        try {

            await clienteAxios.post(`/tareas`, { nombre, categoria , prioridad ,etiquetas, fechaEntrega })

            mostrarAlerta({
                msg: 'Tarea Creada Correctamente',
                error: false
            })

            setTimeout(() => {
                router.push('/home')
            },2000)

        } catch (error) {
            console.log('Error creating the task', error);
        }

    }

    const { msg } = alerta;

    return (
        <ScrollView style={{ padding: 40 }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalEtiqueta}
                onRequestClose={() => {
                    setModalEtiqueta(!modalEtiqueta);
                }}
            >
                <View style={{ height: 250, width: 300, backgroundColor: 'white', borderRadius: 20, shadowRadius: 4, elevation: 5, alignSelf: 'center', marginTop: 350, alignItems: 'center', padding: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: '500', textTransform: 'uppercase', marginTop: 30 }}>¿Desea Eliminar {etiquetaEliminar.nombre}?</Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginVertical: 10, color: 'gray' }}>Sé eliminará para siempre</Text>
                    <View style={{ flexDirection: 'row', marginTop: 30 }}>
                        <Pressable
                            style={{ marginHorizontal: 30 }}
                            onPress={() => handleEliminarEtiqueta()}
                        >
                            <AntDesign name="checkcircleo" size={40} color="black" />
                        </Pressable>
                        <Pressable
                            style={{ marginHorizontal: 30 }}
                            onPress={() => setModalEtiqueta(false)}
                        >
                            <AntDesign name="closecircleo" size={40} color="black" />
                        </Pressable>
                    </View>
                </View>
            </Modal>
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
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: '700', alignSelf: 'baseline' }}>Categoria:</Text>
                <Pressable
                    onPress={() => setAddCategoria(!addCategoria)}
                >
                    {!addCategoria ? <AntDesign name="circledowno" size={30} color="black" /> : <AntDesign name="upcircleo" size={30} color="black" />}
                </Pressable>
            </View>
            {addCategoria &&
                <View style={{ marginBottom: 50 }}>
                    <Text style={{ fontSize: 15, color: 'gray', padding: 20, alignSelf: 'center' }}>Selecciona una categoria</Text>
                    <FlatList
                        style={{ padding: 5, marginTop: 20 }}
                        data={categorias}
                        scrollEnabled={false}
                        contentContainerStyle={{ alignSelf: 'flex-start' }}
                        numColumns={4}
                        renderItem={({ item }) =>
                            <Pressable
                                style={[cat._id === item._id && { backgroundColor: 'gray' }, { height: 40, width: 80, borderRadius: 5, borderWidth: 1, margin: 5, justifyContent: 'center' }]}
                                onPress={() => setCat(item)}
                            >
                                <Text style={{ fontSize: 10, textAlign: 'center' }}>{item.nombre}</Text>
                            </Pressable>
                        }
                        keyExtractor={item => item.id}
                    />
                </View>
            }
            <Text style={{ fontSize: 20, marginVertical: 20, fontWeight: '700', alignSelf: 'baseline', paddingHorizontal: 20 }}>Prioridad:</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Pressable
                    style={[prioridad === 'Baja' && { backgroundColor: 'green' }, { height: 40, width: 100, borderRadius: 5, borderWidth: 1, margin: 10, justifyContent: 'center' }]}
                    onPress={() => setPrioridad('Baja')}
                >
                    <Text style={[prioridad === 'Baja' ? { color: 'white' } : { color: 'green' }, { fontSize: 15, fontWeight: '600', alignSelf: 'center' }]}>Baja</Text>
                </Pressable>
                <Pressable
                    style={[prioridad === 'Media' && { backgroundColor: 'orange' }, { height: 40, width: 100, borderRadius: 5, borderWidth: 1, margin: 10, justifyContent: 'center' }]}
                    onPress={() => setPrioridad('Media')}
                >
                    <Text style={[prioridad === 'Media' ? { color: 'white' } : { color: 'orange' }, { fontSize: 15, fontWeight: '600', alignSelf: 'center' }]}>Media</Text>
                </Pressable>
                <Pressable
                    style={[prioridad === 'Alta' && { backgroundColor: 'red' }, { height: 40, width: 100, borderRadius: 5, borderWidth: 1, margin: 10, justifyContent: 'center' }]}
                    onPress={() => setPrioridad('Alta')}
                >
                    <Text style={[prioridad === 'Alta' ? { color: 'white' } : { color: 'red' }, { fontSize: 15, fontWeight: '600', alignSelf: 'center' }]}>Alta</Text>
                </Pressable>
            </View>
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
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: '700', alignSelf: 'baseline' }}>Etiquetas:</Text>
                    </View>
                    {count === 0
                        ? <Text style={{ fontSize: 15, color: 'gray', padding: 10, alignSelf: 'center' }}>No hay Etiquetas</Text>
                        : <Text style={{ fontSize: 15, color: 'gray', padding: 10, alignSelf: 'center' }}>(Máximo 9 etiquetas)</Text>}
                    <FlatList
                        style={{ padding: 5, marginTop: 20 }}
                        data={etiquetas}
                        scrollEnabled={false}
                        contentContainerStyle={{ alignSelf: 'flex-start' }}
                        numColumns={3}
                        renderItem={({ item }) =>
                            <Pressable
                                style={{ height: 35, width: 100, borderTopWidth: 1, borderBottomWidth: 1, margin: 5, justifyContent: 'center', marginHorizontal: 10 }}
                                delayLongPress={1000}
                                onLongPress={() => { setEtiquetaEliminar(item), setModalEtiqueta(!modalEtiqueta) }}
                            >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ height: 35, width: 10, justifyContent: 'center' }}>
                                        <View style={{ height: 10, width: 10, borderLeftWidth: 1 }}></View>
                                        <View style={{ height: 15, width: 10, borderBottomRightRadius: 10, borderTopRightRadius: 10, borderRightWidth: 1 }}></View>
                                        <View style={{ height: 10, width: 10, borderLeftWidth: 1 }}></View>
                                    </View>
                                    <Text style={{ fontSize: 10, textAlign: 'center', verticalAlign: 'middle' }}>{item.nombre}</Text>
                                    <View style={{ height: 35, width: 10, justifyContent: 'center' }}>
                                        <View style={{ height: 10, width: 10, borderRightWidth: 1 }}></View>
                                        <View style={{ height: 15, width: 10, borderBottomLeftRadius: 10, borderTopLeftRadius: 10, borderLeftWidth: 1 }}></View>
                                        <View style={{ height: 10, width: 10, borderRightWidth: 1 }}></View>
                                    </View>
                                </View>
                            </Pressable>
                        }
                        keyExtractor={item => item.id}
                    />
                    {etiquetaEliminada && <Text style={{ alignSelf: 'center', fontSize: 15, fontWeight: 'bold', color: 'green', fontWeight: '700', marginTop: 25 }}>Etiqueta eliminada correctamente</Text>}
                    {count !== 9
                        ? <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 30 }}>
                            <TextInput
                                style={{ width: 270, borderBottomWidth: 1, marginLeft: 20, marginBottom: 20, marginTop: 20, fontSize: 15 }}
                                placeholder='Introduce una nueva etiqueta'
                                value={etiqueta.nombre}
                                onChangeText={(text) => setEtiqueta({ ...etiqueta, nombre: text, id: Math.floor(Math.random() * (100000000000)) })}
                            />
                            <Pressable
                                style={{ marginRight: 20 }}
                                onPress={() => handleNuevaEtiqueta()}
                            >
                                <MaterialCommunityIcons name="ticket-outline" size={30} color="black" />
                            </Pressable>
                        </View>
                        : <View style={{ marginBottom: 50 }}></View>
                    }
                    <View style={{ padding: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: '700', alignSelf: 'baseline' }}>Fecha Entrega:</Text>
                        <Pressable
                            style={{ marginVertical: 20, width: 350, borderRadius: 20, height: 40, justifyContent: 'center', padding: 5, borderBottomWidth: 1 }}
                            onPress={() => setAddFechaEntrega(!addFechaEntrega)}
                        >
                            <TextInput
                                style={{ alignSelf: 'center', fontSize: 15 }}
                                value={date.toLocaleDateString('es-ES',{weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'})}
                                onChangeText={setAddFechaEntrega}
                                placeholderTextColor="#11182744"
                                editable={false}
                            />
                        </Pressable>
                    </View>
                    {addFechaEntrega &&
                        <DateTimePicker
                            mode='date'
                            display='spinner'
                            value={date}
                            onChange={onChange}
                        />
                    }
                </View>
            }
            <Pressable
                style={{ height: 60, marginVertical: 50, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}
                onPress={() => handleSubmit()}
            >
                <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', color: 'white' }}>Crear Tarea</Text>
            </Pressable>
        </ScrollView>
    )
}

export default AddTask;