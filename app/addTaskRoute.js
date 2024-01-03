import React from 'react';
import AuthLayout from '../layouts/authLayout';
import AddTask from '../components/addTask';


const addtaskRoute = () => {
    return (
        <AuthLayout>
            <AddTask/>
        </AuthLayout>
    )
}

export default addtaskRoute
