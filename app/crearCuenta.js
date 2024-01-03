import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    TextInput,
    SafeAreaView,
    Pressable,
    ScrollView
} from "react-native";
import { AntDesign, Feather } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import clienteAxios from "../config/clienteAxios";


import Alerta from "../helpers/Alerta";


const CrearCuenta = () => {

    const router = useRouter();

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [mostrarPassword, setMostrarPassword] = useState(true);
    const [mostrarPassword2, setMostrarPassword2] = useState(true);

    const [alerta, setAlerta] = useState({})

    const handleSubmit = async () => {

        if ([nombre, email, password].includes('')) {
            setAlerta({ msg: 'Todos los campos son obligatorios', error: true });
            setTimeout(() => {
                setAlerta({});
            }, 2500)
            return
        }
        if (password !== password2) {
            setAlerta({ msg: 'Las contraseñas no son iguales', error: true })
            setTimeout(() => {
                setAlerta({});
            }, 2500)
            return
        }

        try {
            const { data } = await clienteAxios.post(`/usuarios`, { nombre, email, password })
            setAlerta({
                msg: data.msg,
                error: false
            })
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlerta({});
            }, 2500)
            return
        }

        setTimeout(() => {
            setAlerta({});
            router.push("/")
        }, 3000)
    }

    const msg = alerta.msg

    return (
        <SafeAreaView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView style={{ height: '100%', backgroundColor: 'black' }}>

                    <View style={{ alignItems: 'center', marginTop: 100 }}>
                        <AntDesign name="smileo" size={100} color="white" />
                    </View>

                    {msg && <Alerta alerta={alerta} />}
                    <View style={{ alignItems: 'center', marginTop: 50 }}>
                        <View>
                            <Text style={styles.text}>Nombre</Text>
                            <TextInput
                                style={styles.textinput}
                                placeholder='Introduce tu nombre'
                                onChangeText={(text) => setNombre(text)}
                            />
                        </View>

                        <View>
                            <Text style={styles.text}>E-mail</Text>
                            <TextInput
                                style={styles.textinput}
                                placeholder='Introduce el email'
                                onChangeText={(text) => setEmail(text)}
                            />
                        </View>

                        <View>
                            <Text style={styles.text}>Contraseña</Text>
                            <View style={styles.textinput}>
                                <TextInput
                                    style={{ width: 300 }}
                                    secureTextEntry={mostrarPassword}
                                    placeholder='Introduce tu contraseña'
                                    onChangeText={(text) => setPassword(text)}
                                />
                                <Pressable
                                    style={{ marginRight: 15 }}
                                    onPress={() => setMostrarPassword(!mostrarPassword)}
                                >
                                    {mostrarPassword ? <Feather name="eye" size={25} color="black" /> : <Feather name="eye-off" size={25} color="black" />}
                                </Pressable>
                            </View>
                        </View>

                        <View>
                            <Text style={styles.text}>Confirma la contraseña</Text>
                            <View style={styles.textinput}>
                                <TextInput
                                    style={{ width: 300 }}
                                    secureTextEntry={mostrarPassword2}
                                    placeholder='Repite la contraseña'
                                    onChangeText={(text) => setPassword2(text)}
                                />
                                <Pressable
                                    style={{ marginRight: 15 }}
                                    onPress={() => setMostrarPassword2(!mostrarPassword2)}
                                >
                                    {mostrarPassword2 ? <Feather name="eye" size={25} color="black" /> : <Feather name="eye-off" size={25} color="black" />}
                                </Pressable>
                            </View>
                        </View>

                        <Pressable
                            style={styles.boton}
                            onPress={() => handleSubmit()}
                        >
                            <Text style={{ fontSize: 20, fontWeight: '500' }}>Crear Cuenta</Text>
                        </Pressable>

                        <Pressable
                            style={{ marginVertical: 15, justifyContent: 'center', }}
                            onPress={() => router.push('/')}
                        >
                            <Text style={{ color: 'white', fontSize: 15, fontWeight: '500', marginBottom: 150 }}>Inicia Sesión</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>

    )
};

export default CrearCuenta;

const styles = StyleSheet.create({
    text: {
        color: 'white', marginVertical: 10, fontSize: 30, fontWeight: 'bold'
    },
    textinput: {
        width: 350, alignSelf: 'center', marginBottom: 10, fontSize: 15, backgroundColor: 'white', padding: 10, borderRadius: 20, flexDirection: 'row'
    },
    boton: {
        height: 50, width: 350, marginVertical: 50, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 20
    }
});
