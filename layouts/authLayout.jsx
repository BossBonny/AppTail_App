import React from "react";
import {
    SafeAreaView,
} from "react-native";
import { AuthProvider } from "../context/AuthProvider";
import { TareasProvider } from "../context/TareasProvider";

const AuthLayout = ({ children }) => {

    return (
        <SafeAreaView>
            <AuthProvider>
                <TareasProvider>
                    {children}
                </TareasProvider>
            </AuthProvider>
        </SafeAreaView>

    )
}

export default AuthLayout;