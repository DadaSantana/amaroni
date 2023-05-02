import * as React from 'react'
import { HomeHeader } from '../components/home/HomeHeader';
import { Footer } from '../components/home/Footer';
import { Container } from 'react-bootstrap';
import image from '../assets/media/AmaroniComune.jpg';
import { useAppSelector } from '../redux/hooks/useAppSelector';
import { Banner } from '../components/home/Banner';
import first from '../assets/images/storia_one.jpeg';
import four from '../assets/images/storia_four.jpeg';
import { motion } from 'framer-motion';
import '../assets/styles/storia.css';

export const Storia = () => {
    const system = useAppSelector(state => state.system);
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
            <Container>
                <h1 style={{margin: '30px auto'}}>
                    {system.language[system.current] == 'italian' ? 'Storia' : null}
                    {system.language[system.current] == 'english' ? 'History' : null}
                    {system.language[system.current] == 'german' ? 'Geschichte' : null}
                </h1>
                <motion.div 
                    className="flex-content"
                    initial={{ opacity: 0, translateY: '50px' }}
                    whileInView={{ opacity: 1, translateY: '0px' }}
                    transition={{ ease: 'easeIn', duration: 0.5 }}
                >
                    <div className="texts">
                        <p style={{textAlign: 'justify'}}>Amaroni è un piccolo centro dell’entroterra Catanzarese, adagiato su una collina, alle falde del monte Carbonara, da cui è possibile ammirare lo splendido panorama del Golfo di Squillace. Ha origini magno greche e ciò è confermato dalla presenza di numerosi vocaboli nel lessico dialettale: “grupu” (buco), “fanò” (abbaino), “catarrattu” (apertura del pavimento verso il basso), “holea” (nido di uccelli), “ciaramidu”, (tegola).</p>
                        <p style={{textAlign: 'justify'}}>Diverse le interpretazioni sulla derivazione del nome Amaroni, la maggior parte delle quali riferibili a racconti e leggende tramandante nel tempo: discendenti di “Amarus” abitanti quel luogo, fusione dei nomi delle due famiglie che si contendevano il potere su Majurizzuni, gli Amari e i Moroni, oppure dal grido “Amari nui” che la popolazione emise in seguito alla distruzione dell’insediamento a causa di un violento temporale. </p>
                        <p style={{textAlign: 'justify'}}>Gli originari abitanti si insediarono lungo le rive del fiume Alessi, l’antico KARKINOS, nella località “Majurizzoni” (alias Monte Incantato), a circa 1 km dall’attuale insediamento.</p>
                    </div>
                    <img src={first} alt="" className='img-right' />
                </motion.div>
                <motion.div 
                    className="flex-content"
                    initial={{ opacity: 0, translateY: '50px' }}
                    whileInView={{ opacity: 1, translateY: '0px' }}
                    transition={{ ease: 'easeIn', duration: 0.5 }}
                >
                    <img src={four} alt="" className='img-left' />
                    <div className="texts">
                        <p style={{textAlign: 'justify'}}>Le prime notizie storiche annoverano Amaroni quale casale di Squillace, di cui seguì le vicende, soggiacendo agli stessi dominatori: Giovanni di Montfort, la famiglia Marzano (1314), i D’Aragona (1464), i Borgia - 1494 fino alla prima metà del secolo XVIII-, i De Gregorio, che lo mantennero fino al 1806.<br />
                        Nel 1783 Amaroni fu quasi totalmente distrutta da un rovinoso terremoto che, secondo Vivenzio,: “fu un vero e proprio colpo di grazia per tutti i paesi della zona”; la stima dei danni fu valutata in 60 mila ducati. In seguito, per volere di re Ferdinando IV, fu istituita la Cassa Sacra, una giunta chiamata ad amministrare i beni confiscati ai monasteri e ai luoghi pii, destinati a riparare i danni provocati dal sisma. 
                        </p>
                    </div>
                </motion.div>
                <motion.p 
                    className="flex-content"
                    initial={{ opacity: 0, translateY: '50px' }}
                    whileInView={{ opacity: 1, translateY: '0px' }}
                    transition={{ ease: 'easeIn', duration: 0.5 }}
                    style={{textAlign: 'justify'}}
                >
                    Nel Settecento Amaroni visse un secolo di avvenimenti importanti e nel 1799, anche se per poco, fece parte della Repubblica Partenopea.<br />
                    Nel 1850 acquisì l’autonomia politica da Squillace; in seguito, per le sue asperità, fu territorio prescelto come rifugio dai briganti.<br />
                    L’annessione plebiscitaria al Regno d’ Italia rappresentava per gli amaronesi l’opportunità per una divisione equa delle terre e una maggiore giustizia sociale.<br />
                    Il referendum del 1946 vide gli amaronesi esprimersi maggiormente in favore della forma Repubblicana.

                </motion.p>
            </Container>
            <Footer/>
        </div>
    );
}