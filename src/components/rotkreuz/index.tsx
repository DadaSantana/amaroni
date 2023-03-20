import React, { useState} from 'react';
import { HomeHeader } from '../home/HomeHeader';
import { Footer } from '../home/Footer';
import { Banner } from './Banner';
import SwiperCore, { Pagination,Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import logo from '../../assets/media/german.png';
import { Container } from 'react-bootstrap';
import { Content } from './styles';
SwiperCore.use([Pagination, Navigation]);

export const Rotkreuz = () => {
  
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
                <h1>Gemmellagio di Rotkreuz</h1>
                <div style={{display:'flex'}}>
                    <p>Dall’autunno 2003 è attivo il gemellaggio tra il comune di Risch, con le frazioni Rotkreuz, Holzhäusern, Buonas e Risch nel Cantone di Zugo e il comune di Amaroni in Italia.
                    Amaroni è ubicato in provincia di Catanzaro in Calabria, una splendida regione italiana. Il paese dista solo 13 km dalla costa ionica e 35 km dal mar Tirreno ed è circondato dal blu del mar Ionio e dal verde della Sila. Il comune conta circa 2500 abitanti, di cui 500 emigranti, la maggior parte dei quali vive in Svizzera, più di 50 dei quali nel nostro comune.
                    Nel 2007 il Consiglio comunale di Risch ha affidato all’associazione «Amici di Amaroni» il compito di gestire il gemellaggio attraverso un contratto di prestazione di servizi.
                    </p>
                    <div style={{padding:20,borderWidth:1,borderStyle:'solid',borderRadius:10}}>
                        <h1>Links</h1>
                        <hr/>
                        <ul>
                            <li><a href="https://www.google.com" target="_blank">Google</a></li>
                            <li><a href="https://www.facebook.com" target="_blank">Facebook</a></li>
                            <li><a href="https://www.twitter.com" target="_blank">Twitter</a></li>
                        </ul>
                    </div>
                </div>
                <h3>Estratto dell’accordo di prestazione di servizi:</h3>
                <p>L’associazione Amici di Amaroni</p>
                <li>promuove le relazioni reciproche in campo culturale e sociale attraverso visite di persone singole o gruppi</li>
                <li>estende il gemellaggio a diversi ambiti</li>
                <li>coltiva l’amicizia comune e promuove la comprensione reciproca tra i due paesi</li>
                <li>coordina e supporta i contatti tra le scuole</li>
                <li>presenta al Consiglio comunale un rapporto annuale di attività con relativo bilancio</li>
                <li>può realizzare autonomamente ulteriori progetti che non rientrino nell’ambito dei servizi del presente contratt</li>
                <p style={{marginTop:30}}>Da questi presupposti è nata negli ultimi anni una stretta e vivace collaborazione. Durante le nostre visite reciproche abbiamo avuto modo di conoscere e apprezzare le due diverse culture in tutte le loro sfaccettature. Il nostro gemellaggio prospera grazie a persone di tutte le età di entrambi i comuni.</p>
                <p>Coltiviamo e rafforziamo la nostra collaborazione grazie ad Auxilia (sostegno di Spitex ad Amaroni) e attraverso varie attività come i corsi di cucito, realizzati con macchine da cucire donate dalle scuole di Rotkreuz, le indimenticabili gite scolastiche, i corsi di cucina con Renato dalla Calabria, il mercato paesano, gli straordinari viaggi di gruppo ad Amaroni, le campagne di vendita di arance per beneficienza e molto altro.</p>   
                <Swiper
                spaceBetween={30}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                >
                {images.map((image) => (
                    <SwiperSlide key={image.id}>
                    <img src={logo} alt={`Imagem ${image.id}`} />
                    </SwiperSlide>
                ))}
                </Swiper>
            
            </div>
          </Container>
        </Content>        
        <Footer/> 
    </div>
  );
}