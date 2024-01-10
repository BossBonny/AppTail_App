import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, Pressable, Modal, FlatList } from 'react-native'
import clienteAxios from '../config/clienteAxios';

import { AntDesign, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';

import { formatearFecha } from '../helpers/formatearFecha';


//TODO: Hacer componente de el header, se usa en el index y aqui tmbn 
//TODO: Optimizar los datos de las categorias a solo lo necesario
//TODO: no se pueden crear dos categorias iguales, y añadir mensaje de error, añadir limite de caracteres
//TODO: Añadir stylos como el de "Eliminado corerctamente" o editado o creado, (OPCIONAL)

//TODO: Modal EliminarTarea se puede reusar en RecentTask y más, checkar otros modales


const Categorias = () => {

    const [modalCrearCat, setModalCrearCat] = useState(false);
    const [modalEditarCat, setModalEditarCat] = useState(false);
    const [modalEliminarCat, setModalEliminarCat] = useState(false);
    const [categoriaElegida, setCategoriaElegida] = useState({});
    const [categorias, setCategorias] = useState([]);

    const [nuevaCategoria, setNuevaCategoria] = useState({});


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



    const handleAddCategorie = async () => {

        const nombre = nuevaCategoria;

        try {
            await clienteAxios.post(`/categorias`, { nombre });
            //Actualizar el state - añadiendo la nueva categoria
            const categoriasAtcualizadas = await clienteAxios.get(`/categorias`);

            setCategorias(categoriasAtcualizadas.data)
        } catch (error) {
            console.log("error adding new Categorie Data", error);
        }

        setModalCrearCat(!modalCrearCat)
        setNuevaCategoria('');
    }

    const handleEditar = (item) => {
        setCategoriaElegida(item)
        setModalEditarCat(true)
    }

    const editarCat = async () => {

        const nombre = categoriaElegida.nombre

        try {
            await clienteAxios.put(`/categorias/${categoriaElegida._id}`, { nombre });

            //Actualizar el state - Editando la categoria

            const categoriasActualizadas = [...categorias];

            for (let index = 0; index < categoriasActualizadas.length; index++) {
                const element = categoriasActualizadas[index];
                if (element._id !== categoriaElegida._id) {
                    categoriasActualizadas[index] = element;
                } else {
                    categoriasActualizadas[index] = categoriaElegida;
                }
            }

            setCategorias(categoriasActualizadas)

        } catch (error) {
            console.log("error editing the category", error);
        }

        setModalEditarCat(!modalEditarCat);
        setCategoriaElegida({});

    }

    const handleEliminar = (item) => {
        setCategoriaElegida(item)
        setModalEliminarCat(true)
    }

    const eliminarCat = async () => {

        try {
            await clienteAxios.delete(`/categorias/${categoriaElegida._id}`);

            //Actualizar el state - eliminando la categoria
            const categoriasActualizadas = categorias.filter(eti => eti._id !== categoriaElegida._id);

            setCategorias(categoriasActualizadas)

        } catch (error) {
            console.log("error deleting the category", error);
        }

        setModalEliminarCat(!modalEliminarCat)
        setCategoriaElegida('')
    }


    return (

        <View style={{ height: '100%' }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalCrearCat}
                onRequestClose={() => {
                    setModalCrearCat(!modalCrearCat);
                }}
            >
                <View style={{ height: 250, width: 300, backgroundColor: 'white', borderRadius: 20, shadowRadius: 4, elevation: 5, alignSelf: 'center', marginTop: 350, alignItems: 'center', padding: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: '500', textTransform: 'uppercase', marginTop: 30 }}>Nueva Categoria</Text>
                    <TextInput
                        style={{ width: 200, borderBottomWidth: 1, alignSelf: 'center', marginTop: 30, fontSize: 15 }}
                        placeholder='Introduce una nueva categoria...'
                        onChangeText={(text) => setNuevaCategoria(text)}
                    />
                    <Pressable
                        style={{ marginTop: 30, backgroundColor: 'black', height: 40, width: 150, borderRadius: 20, justifyContent: 'center' }}
                        onPress={() => handleAddCategorie()}
                    >
                        <AntDesign style={{ alignSelf: 'center', fontWeight: 'bold' }} name="check" size={30} color="white" />
                    </Pressable>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalEditarCat}
                onRequestClose={() => {
                    setModalEditarCat(!modalEditarCat);
                }}
            >
                <View style={{ height: 250, width: 300, backgroundColor: 'white', borderRadius: 20, shadowRadius: 4, elevation: 5, alignSelf: 'center', marginTop: 350, alignItems: 'center', padding: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: '500', textTransform: 'uppercase', marginTop: 30 }}>Editar Categoria</Text>
                    <TextInput
                        style={{ width: 200, borderBottomWidth: 1, alignSelf: 'center', marginTop: 30, fontSize: 15 }}
                        value={categoriaElegida.nombre}
                        onChangeText={(text) => setCategoriaElegida({ ...categoriaElegida, nombre: text })}
                    />
                    <Pressable
                        style={{ marginTop: 30, backgroundColor: 'black', height: 40, width: 150, borderRadius: 20, justifyContent: 'center' }}
                        onPress={() => editarCat()}
                    >
                        <AntDesign style={{ alignSelf: 'center', fontWeight: 'bold' }} name="check" size={30} color="white" />
                    </Pressable>
                </View>
            </Modal>


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalEliminarCat}
                onRequestClose={() => {
                    setModalEliminarCat(!modalEliminarCat);
                }}
            >
                <View style={{ height: 250, width: 300, backgroundColor: 'white', borderRadius: 20, shadowRadius: 4, elevation: 5, alignSelf: 'center', marginTop: 350, alignItems: 'center', padding: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: '500', textTransform: 'uppercase', marginTop: 30 }}>¿Desea Eliminar {categoriaElegida.nombre}?</Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', marginVertical: 10, color: 'gray' }}>Sé eliminará para siempre</Text>
                    <View style={{ flexDirection: 'row', marginTop: 30 }}>
                        <Pressable
                            style={{ marginHorizontal: 30 }}
                            onPress={() => eliminarCat()}
                        >
                            <AntDesign name="checkcircleo" size={40} color="black" />
                        </Pressable>
                        <Pressable
                            style={{ marginHorizontal: 30 }}
                            onPress={() => setModalEliminarCat(false)}
                        >
                            <AntDesign name="closecircleo" size={40} color="black" />
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <View style={styles.categoriasCont}>
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ marginLeft: 150, alignSelf: 'center', padding: 20, fontSize: 20, textTransform: 'uppercase', fontWeight: 'bold' }}>Categorias</Text>
                    <Pressable
                        style={{ marginRight: 32, padding: 5 }}
                        onPress={() => setModalCrearCat(!modalCrearCat)}
                    >
                        <Ionicons name="add-circle-outline" size={40} color="black" />
                    </Pressable>
                </View>
                <FlatList
                    style={{ width: '100%', paddingHorizontal: 15 }}
                    data={categorias}
                    renderItem={({ item }) =>
                    (
                        <View style={{
                            marginVertical: 20,
                            marginHorizontal: 16,
                            backgroundColor: 'white',
                            height: 120,
                            borderRadius: 20,
                            shadowRadius: 4,
                            elevation: 5,
                            padding: 20,
                            flexDirection: 'row',
                        }}>

                            <View style={{ flexDirection: 'row', flex: 2, justifyContent: 'space-evenly' }}>
                                <Pressable
                                    style={{ backgroundColor: 'black', height: 50, width: 50, borderRadius: 20, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}
                                    onPress={() => handleEditar(item)}
                                >
                                    <Feather name="edit-2" size={28} color="white" />
                                </Pressable>
                                <View style={{ justifyContent: 'space-between', alignItems: 'center', flex: 3 }}>
                                    <Text style={{ fontSize: 20 }}>{item.nombre}</Text>
                                    <Text style={{ fontSize: 15, color: 'gray' }}>{formatearFecha(item.createdAt)}</Text>
                                </View>
                                <Pressable
                                    style={{ backgroundColor: 'black', height: 50, width: 50, borderRadius: 20, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}
                                    onPress={() => handleEliminar(item)}
                                >
                                    <MaterialIcons name="delete-outline" size={30} color="white" />
                                </Pressable>
                            </View>
                        </View>
                    )}
                    keyExtractor={item => item._id}
                />
            </View>
        </View>

    )
}

export default Categorias

const styles = StyleSheet.create({
    contHeader: {
        height: '12%',
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 25,
        alignItems: 'center'
    },
    categoriasCont: {
        height: '88%',
        alignItems: 'center'
    },
    contSearchBar: {
        backgroundColor: 'white',
        width: 300,
        borderRadius: 20,
        marginRight: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },
})