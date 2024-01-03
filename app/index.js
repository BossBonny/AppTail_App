import React from 'react';
import { AuthProvider } from '../context/AuthProvider';
import RutaProtegida from '../layouts/RutaProtegida';

const index = () => {

    return (
        <AuthProvider>
            <RutaProtegida />
        </AuthProvider>
    )


}

export default index