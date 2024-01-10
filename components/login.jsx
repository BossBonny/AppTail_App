import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    TextInput,
    SafeAreaView,
    Pressable,
    ScrollView,
} from "react-native";
import { AntDesign, Feather } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';


import clienteAxios from "../config/clienteAxios";
import Alerta from "../helpers/Alerta";
import useAuth from "../hook/useAuth";

//TODO: Hacer textos planos para los correos

const Login = () => {

    const router = useRouter();
    const { setAuth, auth } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const [mostrarPassword, setMostrarPassword] = useState(true);


    const handleSubmit = async () => {

        if ([email, password].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });
            return
        }

        try {
            const { data } = await clienteAxios.post('/usuarios/login', { email, password })

            if(!data) return

            setAlerta({
                msg: "Usuario Correcto",
                error: false
            })
            
            await AsyncStorage.setItem('token', data.token)

            setAuth(data)

            setTimeout(() => {
                setAlerta({})
                router.push('/home');
            }, 3000)
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            return
        }
    }

    const { msg } = alerta

    return (
        
        <SafeAreaView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView style={{ height: '100%', backgroundColor: 'black' }}>
                    <View style={{ alignItems: 'center', marginTop: 150 }}>
                        <AntDesign name="smileo" size={100} color="white" />
                    </View>
                    {msg && <Alerta alerta={alerta} />}
                    <View style={{ alignItems: 'center', marginTop: 50 }}>
                        <View>
                            <Text style={styles.text}>E-mail</Text>
                            <TextInput
                                style={styles.textinput}
                                placeholder='Introduce el email'
                                onChangeText={(text) => setEmail(text)}
                            />
                        </View>

                        <View>
                            <Text style={styles.text}>Password</Text>
                            <View style={styles.textinput}>
                                <TextInput
                                    style={{width: 300}}
                                    secureTextEntry={mostrarPassword}
                                    placeholder='Introduce el password'
                                    onChangeText={(text) => setPassword(text)}
                                />
                                <Pressable
                                    style={{ marginRight: 1}}
                                    onPress={() => setMostrarPassword(!mostrarPassword)}
                                >
                                    {mostrarPassword ? <Feather name="eye" size={25} color="black" /> : <Feather name="eye-off" size={25} color="black" />}
                                </Pressable>
                            </View>
                        </View>
                        <Pressable
                            style={styles.boton}
                            onPress={() => handleSubmit()}
                        >
                            <Text style={{ fontSize: 20, fontWeight: '500' }}>LogIn</Text>
                        </Pressable>

                        <Pressable
                            style={{ marginVertical: 15, justifyContent: 'center', marginBottom: 100 }}
                            onPress={() => router.push('crearCuenta')}
                        >
                            <Text style={{ color: 'white', fontSize: 15, fontWeight: '500' }}> ¿No tienes cuenta? </Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>

    )
};

export default Login;

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
