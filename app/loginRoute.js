import React from "react";
import { AuthProvider } from "../context/AuthProvider";
import Login from "../components/login";

const Home = () => {

    return (
        <AuthProvider>
            <Login/>
        </AuthProvider>
    )
};

export default Home;
