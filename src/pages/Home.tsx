import * as React from 'react'
import { HomeHeader } from '../components/home/HomeHeader';
import { Footer } from '../components/home/Footer';
import { Banner } from '../components/home/Banner';
import { Events } from '../components/home/Events';
import { Attractions } from '../components/home/Attractions';
import { MapAndNumbers } from '../components/home/MapAndNumbers';
import { Cookies } from '../components/home/Cookies';



export const Home = () => {
    const [en, setEn] = React.useState(false);

    const handleLanguage = (current: boolean) => {
        if (current) {
          setEn(false);
        } else {
          setEn(true);
        }
    }

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