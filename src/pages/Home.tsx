import * as React from 'react'
import { HomeHeader } from '../components/home/HomeHeader';
import { Footer } from '../components/home/Footer';
import { Banner } from '../components/home/Banner';
import { Events } from '../components/home/Events';
import { Attractions } from '../components/home/Attractions';
import { MapAndNumbers } from '../components/home/MapAndNumbers';
import { Cookies } from '../components/home/Cookies';
<<<<<<< HEAD

export const Home = () => {
    
=======
import { getAll } from "../services/tokens";



export const Home = () => {
>>>>>>> c415e8aca664a869c148a9d52dfce3b6b3bf6b24
    return(
        <div id="app">
        <HomeHeader logged={false} />
        <Banner />
        <Events />
        <Attractions />
        <Footer/>
        <Cookies />
        </div>
    );
}