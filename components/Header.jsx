import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Pressable,
    Modal,
} from "react-native";
import { AntDesign, Feather, EvilIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";

import useAuth from "../hook/useAuth";
import useTareas from "../hook/useTareas";

const Header = () => {

    const router = useRouter();

    const {auth} = useAuth();
    const {cerrarSesion} = useTareas();

    const [modalVisible, setModalVisible] = useState(false);



    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={{ backgroundColor: 'black', width: 300, height: '80%', borderColor: 'black', padding: 25, justifyContent: 'flex-start', borderBottomRightRadius: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'space-between' }}>
                        <Pressable
                            onPress={() => setModalVisible(false)}
                        >
                            <AntDesign name="menufold" size={24} color="white" />
                        </Pressable>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', textTransform: 'uppercase' }}>{auth.nombre}</Text>
                        <Pressable
                            onPress={() => setModalVisible(false)}
                        >
                            <EvilIcons style={{ marginBottom: 10 }} name="user" size={40} color="white" />
                        </Pressable>
                    </View>
                    <View style={{ marginTop: 60, height: '60%', width: '100%' }}>
                        <Pressable
                            style={{ height: 40, marginBottom: 15 }}
                            onPress={() => router.push('/')}
                        >
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 20 }}>Inicio</Text>
                        </Pressable>
                        <Pressable
                            style={{ height: 40, marginBottom: 15 }}
                            onPress={() => router.push('categoriasRoute')}
                        >
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 20 }}>Categorias</Text>
                        </Pressable>
                        <Pressable
                            style={{ height: 40, marginBottom: 15 }}
                        >
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 20 }}>Configuración</Text>
                        </Pressable>
                    </View>
                    <Pressable
                        style={{ marginTop: 20 }}
                        onPress={() => cerrarSesion()}
                    >
                        <Feather name="log-out" size={24} color="white" />
                    </Pressable>
                </View>
            </Modal>
            <View style={styles.contHeader}>
                <Pressable
                    onPress={() => setModalVisible(true)}
                >
                    <AntDesign name="menuunfold" size={24} color="white" />
                </Pressable>
                <View style={styles.contSearchBar}>
                    <TextInput
                        style={{ marginLeft: 20, flex: 1 }}
                        placeholder="Search..."
                    />
                    <Pressable
                        style={{ marginRight: 10, padding: 5 }}
                    >
                        <AntDesign name="search1" size={24} color="black" />
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    contHeader: {
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 25,
        alignItems: 'center'
    },
    taskList: {
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
});