import { View, Text } from 'react-native'
import React from 'react'

const Alerta = ({alerta}) => {
    return (
        <View style={[alerta.error ? {backgroundColor: 'red'} : {backgroundColor: 'green'},{ height: 50, width: 300, borderRadius: 40, alignSelf: 'center', justifyContent: 'center', marginVertical: 20}]}>
            <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold', color: 'white', fontWeight: 'bold' }}>{alerta.msg}</Text>
        </View>
    )
}

export default Alerta