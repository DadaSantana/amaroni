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
                    <p>Palazzo Canale, oggi sede municipale, fu costruito dal principe De Gregorio nel 1666 e ereditato dalla famiglia Canale, che lo abitò fino al 1905.<br />
                    L’edificio, oggetto di interventi di recupero, dell’originaria struttura mantiene i balconi di ferro battuto e il cornicione in pietra intagliata a zigzag; lo stemma posto all’ingresso raffigura un tulipano, in passato simbolo delle famiglie nobili.<br />
                    A Palazzo Canale è stato annesso “Palazzo Cancelliere” attraverso la realizzazione di una passerella di collegamento sospesa; ospita alcuni uffici comunali e la sala consiliare, inaugurata il 28 luglio 2002, dove è possibile ammirare il “polittico” di sei tavole raffiguranti la vita e il martirio di Santa Barbara, protettrice di Amaroni, realizzato dal maestro dipintore Giuseppe Rocca.<br />
                    Su Palazzo Canale ancora viva nella memoria degli amaronesi la leggenda della “mano insanguinata”. Si narra che l’ultimo rampollo della famiglia, un giovane viziato e prepotente, frequentasse un giro poco raccomandabile di amici; ricercato dalle Forze dell’Ordine, trovò rifugio ad Amaroni nel Palazzo di famiglia dove, il pittore amaronese Francesco stava eseguendo dei lavori di restauro.<br />
                    Tra il baroncino e Francesco un giorno occorse un diverbio; la discussione attrasse l’attenzione dei passanti che, preoccupati, avvisarono i Carabinieri.<br />
                    Un brigadiere tentò una mediazione con il baroncino, chiedendo la collaborazione di Francesco per fare ingresso nel Palazzo; questi minacciò che avrebbe usato la pistola se solo qualcuno avesse tentato di avvicinarsi a lui.<br />
                    Il brigadiere s’introdusse con astuzia e il baroncino, colto di sorpresa, sparò un colpo ferendo a morte Francesco che, nell’accasciarsi al suolo, lasciò l’impronta della sua mano insanguinata sulla parete della stanza che oggi è occupata dal sindaco.<br />
                    L’omicida fu arrestato ma rilasciato su cauzione. Il rimorso non lo abbandonò mai, conducendolo a una morte terribile e solitaria.
                    </p>
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