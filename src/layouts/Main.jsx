import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Header from '../components/Navbar/Header';
import Footer from '../components/Footer/Footer';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <Header/>
           
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Main;