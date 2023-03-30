import * as React from 'react';


import { HomeHeader } from '../components/home/HomeHeader';
import { Footer } from '../components/home/Footer';
import { EventDetails } from '../components/event/EventDetails';

export const Event = () => {
  return(
      <div id="app">
        <HomeHeader logged={false}/>
        <EventDetails />
        <Footer/>
      </div>
  );
}