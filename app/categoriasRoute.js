import React from 'react'
import AuthLayout from '../layouts/authLayout'
import Header from '../components/Header'
import Categorias from '../components/categorias'

const categoriasRoute = () => {
    return (
        <AuthLayout>
            <Header />
            <Categorias/>
        </AuthLayout>
    )
}

export default categoriasRoute