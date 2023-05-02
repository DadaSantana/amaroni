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
<<<<<<< HEAD
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
=======
                <h1>Gemellaggio di Risch-Rotkreuz</h1>
                <div>
                    <p>Dall’autunno 2003 è attivo il gemellaggio tra il comune di Risch, con le frazioni Rotkreuz, Holzhäusern, Buonas e Risch nel Cantone di Zugo e il comune di Amaroni in Italia.
                    Amaroni è ubicato in provincia di Catanzaro in Calabria, una splendida regione italiana. Il paese dista solo 13 km dalla costa ionica e 35 km dal mar Tirreno ed è circondato dal blu del mar Ionio e dal verde della Sila. Il comune conta circa 2500 abitanti, di cui 500 emigranti, la maggior parte dei quali vive in Svizzera, più di 50 dei quali nel nostro comune.
                    Nel 2007 il Consiglio comunale di Risch ha affidato all’associazione «Amici di Amaroni» il compito di gestire il gemellaggio attraverso un contratto di prestazione di servizi.
                    </p>
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
>>>>>>> c415e8aca664a869c148a9d52dfce3b6b3bf6b24
            </div>
            <GalleryContent path='gemmellagi' />
            <Links vetor={links} />
          </Container>
        </Content>        
        <Footer/> 
    </div>
  );
}