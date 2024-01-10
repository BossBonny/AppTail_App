import {
    Text,
    View,
    FlatList,
    Pressable,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Link } from "expo-router";

import { formatearFecha } from "../helpers/formatearFecha";

import useTareas from "../hook/useTareas";


const RecentTask = () => {

    const { tareas, handleTarea, obtenerCategoria } = useTareas();

    return (
        <View style={{ height: '88%', marginTop: 20 }}>
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 50 }}>
                <Text style={{ marginLeft: 170, alignSelf: 'center', fontSize: 20, textTransform: 'uppercase', fontWeight: 'bold' }}>Recent Tasks</Text>
                <Link
                    href="/addTaskRoute"
                    style={{ marginHorizontal: 100, padding: 5 }}
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
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 20 }}>{item.nombre}</Text>
                            <Text style={{ fontSize: 15, color: 'gray' }}>{obtenerCategoria(item.categoria)}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                            <Text style={{ fontSize: 15, color: 'gray' }}>{formatearFecha(item.createdAt)}</Text>
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