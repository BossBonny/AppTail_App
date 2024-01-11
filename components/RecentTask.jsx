import {
    Text,
    View,
    FlatList,
    Pressable,
} from "react-native";
import { Ionicons, Fontisto } from '@expo/vector-icons';
import { Link } from "expo-router";

import { formatearFecha } from "../helpers/formatearFecha";

import useTareas from "../hook/useTareas";


const RecentTask = () => {

    const { tareas, handleTarea, obtenerCategoria } = useTareas();

    return (
        <View style={{ height: '88%', marginTop: 20 }}>
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 50 }}>
                <Text style={{ marginLeft: 200, alignSelf: 'center', fontSize: 20, textTransform: 'uppercase', fontWeight: 'bold' }}>Tasks</Text>
                <Link
                    href="/addTaskRoute"
                    style={{ marginHorizontal: 120, padding: 5 }}
                >
                    <Ionicons name="add-circle-outline" size={40} color="black" />
                </Link>
            </View>
            <FlatList
                style={{ width: '100%', paddingHorizontal: 15 }}
                data={tareas}
                renderItem={({ item }) =>
                    <Pressable style={{
                        marginBottom: 40,
                        marginHorizontal: 16,
                        backgroundColor: 'white',
                        height: 120,
                        borderRadius: 20,
                        shadowRadius: 4,
                        elevation: 5,
                        padding: 20
                    }}
                        onPress={() => handleTarea(item)}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                            <View style={{ height: 30, maxWidth: 250, width: 250}}>
                                <Text style={[item.estado ? {color: 'green'} : {color: 'red'},{ fontSize: 20, marginLeft: 10, marginTop: 3, fontWeight: 'bold' }]}>{item.nombre}</Text>
                            </View>
                            <View style={{height: 30, width: 100, maxWidth: 250, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                                {item.colaboradores.length > 0 && <Fontisto name="persons" size={18} color="black" style={{padding: 5}}/>}
                                {item.etiquetas.length > 0 && <Fontisto name="ticket" size={18} color="black" style={{padding: 5}}/>}
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, padding: 10 }}>
                            <Text style={{ fontSize: 15, color: 'gray' }}>{formatearFecha(item.createdAt)}</Text>
                            <Text style={{ fontSize: 15, color: 'gray' }}>{obtenerCategoria(item.categoria)}</Text>
                            {item.prioridad === 'Baja' && <Text style={{ color: 'green', fontSize: 15 }}>{item.prioridad}</Text>}
                            {item.prioridad === 'Media' && <Text style={{ color: 'orange', fontSize: 15 }}>{item.prioridad}</Text>}
                            {item.prioridad === 'Alta' && <Text style={{ color: 'red', fontSize: 15 }}>{item.prioridad}</Text>}
                        </View>
                    </Pressable>
                }
                keyExtractor={item => item._id}
            />
        </View>
    )
}

export default RecentTask;