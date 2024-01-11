import { View, Text, Pressable, FlatList } from "react-native"
import { AntDesign } from '@expo/vector-icons';

const CategoriaComp = ({cat,setCat,categorias,setAddCategoria,addCategoria}) => {

    return (
        <>
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
                                style={[cat._id  === item._id && { backgroundColor: 'gray' }, { height: 40, width: 80, borderRadius: 5, borderWidth: 1, margin: 5, justifyContent: 'center' }]}
                                onPress={() => setCat(item)}
                            >
                                <Text style={{ fontSize: 10, textAlign: 'center' }}>{item.nombre}</Text>
                            </Pressable>
                        }
                        keyExtractor={item => item.id}
                    />
                </View>
            }
        </>
    )
}

export default CategoriaComp