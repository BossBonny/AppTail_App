import { View, Text, FlatList, Pressable, TextInput } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TicketComp = ({ count, etiquetas, setEtiquetaEliminar, etiquetaEliminada, setModalEtiqueta, modalEtiqueta, setEtiqueta, etiqueta, handleNuevaEtiqueta }) => {
    return (
        <>
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
        </>
    )
}

export default TicketComp