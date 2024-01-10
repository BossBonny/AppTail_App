import React from 'react';
import AuthLayout from '../layouts/authLayout';
import Tarea from '../components/Tarea';


const addtaskRoute = () => {
    return (
        <AuthLayout>
            <Tarea/>
        </AuthLayout>
    )
}

export default addtaskRoute