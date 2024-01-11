import { View, Text, Pressable } from "react-native"

const PrioridadComp = ({prioridad, setPrioridad}) => {
    return (
        <>
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
        </>
    )
}

export default PrioridadComp