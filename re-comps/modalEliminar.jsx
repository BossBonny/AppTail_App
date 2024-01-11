import {
    Text,
    View,
    Pressable,
    Modal
} from 'react-native'
import { AntDesign } from '@expo/vector-icons';

const ModalEliminar = ({item, setModal, modal, eliminarEtiqueta}) => {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
            onRequestClose={() => {
                setModal(!modal);
            }}
        >
            <View style={{ height: 250, width: 300, backgroundColor: 'white', borderRadius: 20, shadowRadius: 4, elevation: 5, alignSelf: 'center', marginTop: 350, alignItems: 'center', padding: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: '500', textTransform: 'uppercase', marginTop: 30 }}>¿Desea Eliminar {item.nombre || item}?</Text>
                <Text style={{ fontSize: 15, fontWeight: '400', marginVertical: 10, color: 'gray' }}>Sé eliminará para siempre</Text>
                <View style={{ flexDirection: 'row', marginTop: 30 }}>
                    <Pressable
                        style={{ marginHorizontal: 30 }}
                        onPress={() => eliminarEtiqueta()}
                    >
                        <AntDesign name="checkcircleo" size={40} color="black" />
                    </Pressable>
                    <Pressable
                        style={{ marginHorizontal: 30 }}
                        onPress={() => setModal(false)}
                    >
                        <AntDesign name="closecircleo" size={40} color="black" />
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

export default ModalEliminar