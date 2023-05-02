import * as React from 'react';


import { HomeHeader } from '../components/home/HomeHeader';
import { Footer } from '../components/home/Footer';
import { NewsDetails } from '../components/news';

export const News = () => {
  return(
      <div id="app">
        <HomeHeader logged={false}/>
        <NewsDetails />
        <Footer/>
      </div>
  );
}