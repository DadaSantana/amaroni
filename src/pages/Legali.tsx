import * as React from 'react'
import { HomeHeader } from '../components/home/HomeHeader';
import { Footer } from '../components/home/Footer';
import { Container } from 'react-bootstrap';
import { useAppSelector } from '../redux/hooks/useAppSelector';

export const Legali = () => {
    const system = useAppSelector(state => state.system);

    return(
        <div id="app">
            <HomeHeader logged={false} />
            <Container>
                <h1 style={{margin: '30px auto'}}>
                    {system.language[system.current] == 'italian' ? 'Note Legali' : null}
                    {system.language[system.current] == 'english' ? 'Note Legali' : null}
                    {system.language[system.current] == 'german' ? 'Note Legali' : null}
                </h1>
                <h3>Utilizzo dei cookie</h3>
                <p style={{textAlign: 'justify'}}>I cookie sono piccoli file di testo che il server web deposita sul dispositivo con cui l’utente naviga, senza identificarlo. Un cookie non può leggere dati personali salvati sul disco fisso o file di cookie creati da altri siti, poiché le sole informazioni che può contenere sono quelle fornite dall’utente stesso. Sul Portale della Fondazione non viene fatto uso di cookie per la trasmissione di informazioni di carattere personale, né vengono utilizzati cosiddetti cookie per il tracciamento degli utenti. I cookies utilizzati nel portale <a href="https://www.amaroniborgo.it" target='_blank'>https://www.amaroniborgo.it</a> solo di solo tipo tecnico e di carattere analitico, direttamente gestiti dall’ente e non da terze parti. Ogni sito tematico riporta al suo interno una opportuna informativa.
                Consulta la pagina di dettaglio <a href="https://www.amaroniborgo.it" target='_blank'>Cookies</a>
                </p>
                <h3>Copyright</h3>
                <p style={{textAlign: 'justify'}}>Tutti i contenuti e le informazioni presenti all’interno del sito del borgo amaroni sono protetti ai sensi delle normative sul diritto d’autore, pertanto nulla, neppure in parte, potrà essere copiato, modificato o rivenduto per fini di lucro.
                Gli oggetti presenti in questo sito per lo scaricamento (download) quali ad esempio la modulistica sono liberamente e gratuitamente disponibili.
                La riproduzione o l’impiego di informazioni testuali e multimediali (suoni, immagini, software ecc.) sono consentiti con indicazione della fonte e dietro richiesta di autorizzazione da parte dell’Ufficio CED.
                </p>
                <h3>Finalità del trattamento dei dati</h3>
                <p style={{textAlign: 'justify'}}>Tutti i dati trattati all’interno del portale, sono utilizzati con il fine unico di garantire il corretto funzionamento delle richieste e dei servizi forniti all’Utente. Eventuali utilizzi di carattere non tecnico dei dati, saranno segnalati in modo corretto e puntuale in relazione al servizio richiesto. Laddove vengano richiesti dati personali dell’Utente, per la fruizione di tali servizi verranno riportate tutte le informazioni relative al trattamento dei dati personali.</p>
                <h3>Privacy</h3>
                <p style={{textAlign: 'justify'}}>Il Borgo Amaroni garantisce che il trattamento dei dati che dovessero pervenire via posta elettronica o moduli elettronici di registrazione è conforme a quanto previsto dalla normativa sulla privacy DL196/2003.
                Consulta la pagina di dettaglio <a href="https://www.amaroniborgo.it" target='_blank'>Privacy</a>
                </p>    
                <h3>Conferimento dei dati</h3>
                <p style={{textAlign: 'justify'}}>L’utente ha facoltà di non fornire nessun dato, laddove ciò sia propedeutico alla fruizione del servizio richiesto lo stesso non sarà garantito</p>
                <h3>Collegamenti Esterni</h3>
                <p style={{textAlign: 'justify'}}>Il Borgo Amaroni si riserva di inserire nel portale collegamenti esterni, se valutati di interesse alle attività della Pubblica Amministrazione e devono risultare utili per approfondire un tema affrontato all’interno di una notizia. Pertanto la fondazione non si assume alcuna responsabilità sui contenuti dei collegamenti presenti sul portale <a href="https://www.amaroniborgo.it" target='_blank'>https://www.amaroniborgo.it</a> in quanto su questi, il portale non ha nessun controllo. Il portale del Borgo Amaroni non è un mezzo per fare promozione: tutti i link pubblicitari esterni al portale sono vietati.</p>
            </Container>            
            <Footer/>
        </div>
    );
}