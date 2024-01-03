import React, { useState } from "react";
import Header from "../components/Header";
import AuthLayout from "../layouts/authLayout";
import RecentTask from "../components/RecentTask";

const Home = () => {
    
    return (
        <AuthLayout>
            <Header/>
            <RecentTask/>
        </AuthLayout>
    )
};

export default Home;
