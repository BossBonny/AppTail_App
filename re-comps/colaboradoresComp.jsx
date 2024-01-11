import { View, Text, FlatList, Pressable, TextInput } from "react-native"

const ColaboradoresComp = ({colaboradores, setColabEliminar, setModalColab, modalColab, setCol, col, filtrarUsers, usuariosFiltrados, agregarColaborador}) => {
    return (
        <>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, marginBottom: 30 }}>
                <Text style={{ fontSize: 20, fontWeight: '700', alignSelf: 'baseline' }}>Colaboradores:</Text>
            </View>
            {
                colaboradores &&
                <FlatList
                    style={{ padding: 5, marginTop: 20, marginBottom: 50 }}
                    data={colaboradores}
                    scrollEnabled={false}
                    contentContainerStyle={{ alignSelf: 'flex-start' }}
                    numColumns={3}
                    renderItem={({ item }) =>
                        <Pressable
                            style={{ height: 40, width: 110, backgroundColor: '#CEE4FE', margin: 5, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}
                            delayLongPress={1000}
                            onLongPress={() => { setColabEliminar(item), setModalColab(!modalColab) }}
                        >
                            <Text style={{ fontSize: 12, fontWeight: '600' }}>{item.nombre}</Text>
                        </Pressable>
                    }
                    keyExtractor={item => item.id}
                />
            }
            <TextInput
                style={{ width: 350, borderBottomWidth: 1, marginLeft: 20, marginBottom: 20, fontSize: 15 }}
                placeholder='Busca el colaborador'
                onChangeText={(text) => { setCol(text), filtrarUsers() }}
            />
            {col &&
                usuariosFiltrados.map((item, index) => {
                    return (
                        <Pressable
                            key={index}
                            style={{ height: 50, width: 300, backgroundColor: '#CEE4FE', margin: 5, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10 }}
                            onPress={() => agregarColaborador(item)}
                        >
                            <Text style={{ fontSize: 15, fontWeight: '600' }}>{item.nombre}</Text>
                            <Text style={{ fontSize: 15, fontWeight: '600', color: 'gray' }}>{item.email}</Text>
                        </Pressable>
                    )
                })
            }
        </>
    )
}

export default ColaboradoresComp