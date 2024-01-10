import React from 'react';
import { AuthProvider } from '../context/AuthProvider';
import RutaProtegida from '../layouts/RutaProtegida';

const Index = () => {

    return (
        <AuthProvider>
            <RutaProtegida />
        </AuthProvider>
    )


}

export default Index