import React, { useState} from 'react';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import { HomeHeader } from '../home/HomeHeader';
import { Footer } from '../home/Footer';
import { Banner } from './Banner';
import SwiperCore, { Pagination,Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import logo from '../../assets/media/german.png';
import { Container } from 'react-bootstrap';
import { Content } from './styles';
import { News } from './News';
import { GalleryContent } from '../GalleryPath';
import { Links } from '../Links';
import { getLinks, insertLinkFirestore } from '../../services/links';

SwiperCore.use([Pagination, Navigation]);

export const Palazzo = () => {
  const system = useAppSelector(state=>state.system);

  const [links,setLinks]  = React.useState<any[]>([]);
  React.useEffect(()=>{
    const getLinksFirestore = async () => {
        setLinks(await getLinks('palazzo','main'));
    }
      getLinksFirestore();
  },[])
  
  const images = [
    { id: 1, src: '../../assets/media/german.png' },
    { id: 2, src: '../../assets/media/german.png' },
];

    return(
        <div id="app">
        <HomeHeader logged={false} />
        <Banner/>
        <Content>
          <Container>
            <div>                
                <div className="top-inline-flex">
                  <div className="left-side">
                    <h1>Palazzo Comunale</h1>
                    <p>Tra i beni storico – culturali di Amaroni, oltre alla Chiesa Matrice di Santa Barbara, “ Palazzo Canale” costruito dal principe De Gregorio nel 1666.
                    L’edificio fu ereditato dalla famiglia Canale, che lo abitò fino al 1905.
                    Annota il prof. Mario Truglia: “ occupa una superficie di 760 mq; misura in lunghezza 38 m e in larghezza 20 m. Al piano terra sul lato nord ovest insistono cinque ampi magazzini; al primo piano tre stanze sul lato nord, detto “scivolata”, e tre stanze sul lato ovest.Il secondo piano si compone di dieci stanze. Il pavimento di alcune di esse è in cemento liscio, con disegni incisi raffiguranti quadrati e rettangoli; quello delle altre stanze è in mattoni di terracotta. Il soffitto è pitturato con sfondo bianco e nel centro sono disegnate figure di donne dell’epoca. I balconi sono in ferro battuto. Il cornicione è in pietra e lo stemma posto all’entrata dell’edificio raffigura un tulipano”, il fiore preferito dalle famiglie nobili.
                    </p>
                    <p>Il palazzo poggia sulla roccia e non ha fondamenta; il tetto è di tegole, in stile antico, mentre il cornicione è in pietra intagliata a zig zag.</p>
                    <p>Le porte erano di legno di castagno, realizzate da mano d’opera amaronese, pitturate in colore nero e raffiguranti gendarmi in stato di guerra.</p>
                    <p>Dopo anni di abbandono è stato acquisito al patrimonio comunale e ristrutturato, divenendo sede Municipale.</p>
                    <p>A Palazzo Canale è stato annesso “Palazzo Cancelliere” attraverso la realizzazione di una passerella di collegamento sospesa; ospita alcuni uffici comunali e la sala consiliare, inaugurata il 28 luglio 2002, dove è possibile ammirare il “polittico” di sei tavole raffiguranti la vita e il martirio di Santa Barbara, protettrice di Amaroni, realizzato dal maestro Giuseppe Rocca.</p>
                  </div>
                  <div className="right-side">
                    <News />
                  </div>
                </div>            
            </div>
            <GalleryContent path='palazio' />
            <Links vetor={links} />
          </Container>
        </Content>        
        <Footer/> 
    </div>
  );
}