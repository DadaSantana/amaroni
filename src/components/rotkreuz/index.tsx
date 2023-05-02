import * as React from 'react';
import { HomeHeader } from '../home/HomeHeader';
import { Footer } from '../home/Footer';
import { Banner } from './Banner';
import SwiperCore, { Pagination,Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import logo from '../../assets/media/german.png';
import { Container } from 'react-bootstrap';
import { Content } from './styles';
import { GalleryContent } from '../GalleryPath';
import { Links } from '../Links';
import { getLinks, insertLinkFirestore } from '../../services/links';
SwiperCore.use([Pagination, Navigation]);

export const Rotkreuz = () => {
    const [links,setLinks]  = React.useState<any[]>([]);
    React.useEffect(()=>{
      const getLinksFirestore = async () => {
          setLinks(await getLinks('gemmellagio','rotkreuz'));
      }
        getLinksFirestore();
    },[])

    const handleSubmitLink = async () => {
        await insertLinkFirestore('gemmellagio','rotkreuz',links);
    }
    return(
        <div id="app">
        <HomeHeader logged={false} />
        <Banner/>
        <Content>
          <Container>
            <div>
                <h1>Gemellaggio Amaroni e Risch-Rotkreuz</h1>
                <div>
                    <p>Nel 2003 è stato sottoscritto il gemellaggio tra la municipalità elvetica di Risch, con le frazioni Rotkreuz, Holzhäusern, Buonas e il comune di Amaroni, in provincia di Catanzaro.<br />
                    Nel corso degli anni il progetto è stato alimentato grazie  alla stretta e vivace collaborazione tra i due rispettivi comitati per il gemellaggio, “ Amici di Amaroni” e “ Amici di Risch”, con l’organizzazione di eventi, scambi culturali, iniziative di promozione turistica e laboratori di cucina.<br /> 
                    Il progetto, in cui sono coinvolte le amministrazioni comunali dei comuni gemellati, ha assunto nel tempo un grande valore nel processo di integrazione tra le due comunità, coinvolgendo direttamente cittadine e cittadini di qualsiasi estrazione sociale  e età anagrafica.
                    </p>
                </div>
                <h3>L’ accordo del 2003</h3>
                <p>
                  <i>Il Consiglio Comunale di Amaroni, Italia, e il Consiglio Comunale di Risch, Svizzera, 
                    in rappresentanza dei rispettivi abitanti,
                    dichiarano la nascita del gemellaggio tra i due Comuni, Amaroni e Risch, 
                    proponendosi di raggiungere insieme i seguenti risultati:<br /><br />
                    - Favorire reciproci  scambi culturali tra le due comunità,  visite di gruppi e singole persone nei rispettivi territori;<br />
                    - Ampliare  le opportunità del gemellaggio in diversi settori;<br />
                    - Curare l’amicizia tra i due Comuni e favorire la reciproca comprensione;<br />
                    - Promuovere lo scambio di esperienze  tra le due popolazioni;<br />
                    - Impegnarsi in azioni di solidarietà, salvaguardando la pace e la libertà di entrambi i Paesi.
                  </i>
                </p>
            </div>
            <GalleryContent path='gemmellagi' />
            <Links vetor={links} />
          </Container>
        </Content>        
        <Footer/> 
    </div>
  );
}