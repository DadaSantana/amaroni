import * as React from 'react'
import { HomeHeader } from '../components/home/HomeHeader';
import { Footer } from '../components/home/Footer';
import { Container } from 'react-bootstrap';
import image from '../assets/media/AmaroniComune.jpg';
import { useAppSelector } from '../redux/hooks/useAppSelector';


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
            <Container>
                <h1 style={{margin: '30px auto'}}>
                    {system.language[system.current] == 'italian' ? 'Storia' : null}
                    {system.language[system.current] == 'english' ? 'History' : null}
                    {system.language[system.current] == 'german' ? 'Geschichte' : null}
                </h1>
                <img src={image} alt="" style={{marginBottom: '30px', maxHeight: '500px'}} />
                <p>Amaroni è un piccolo centro della provincia di Catanzaro, adagiato su una collina, alle falde del monte Carbonara, da cui è possibile ammirare lo splendido panorama del Golfo di Squillace. Ha origini antichissime, che risalgono alla preistoria, come dimostrano molti reperti.</p>
                <p>I primi abitanti s’insediarono lungo le rive del fiume Alessi, l’antico KARKINOS, dal nome della città greca che, secondo alcuni storici e archeologi, tra cui il Lenormant, qui sorgeva ed era identificato con la località “Majurizzoni”.</p>
                <p>Scrive il Lenormant che Amaroni, rectius tutta la Serralta di San Vito, rappresenta la parte più stretta dell’istmo che è la porta dell’ultimo tratto del prolungamento della penisola italiana verso mezzogiorno, in quel tratto che esso da solo portava il nome d’Italia, e in cui finiva l’Enotria.
                Gli amaronesi discendono dagli abitanti del vecchio borgo, denominato “Majurizzuni” (o “Monte Incantato”)- anticamente “Majorizonis-, da “Maju”- sambuco- e “Rizuni” – grossa radice,
                che sorgeva a circa un km dall’insediamento odierno su un originario sito abitato da popolazioni autoctone, fondato nel VI secolo in località San Luca. Qui sono stati rinvenuti oggetti in terra cotta, utensili e sarcofaghi.</p>
                <p>Si narra che i primi insediamenti nacquero per effetto della fuga delle comunità da alcune zone costiere, sotto assedio dei Saraceni e di predoni, o di monaci basiliani, costretti a fuggire a causa dell’iconoclastia dalla Siria, dalla Palestina e dall’Egitto verso luoghi più sicuri.</p>
                <p>Le origini Magno Greche di Amaroni sono confermate dalla forte presenza di vocaboli dialettali, tra cui: “grupu” (buco), “fanò” (abbaino), “catarrattu” (apertura del pavimento verso il basso), “holea” (nido di uccelli), “scifu” (recipiente in cui si versa il cibo per i maiali), “ciaramidu”, (tegola).
                Sull’origine di Amaroni diverse le interpretazioni; secondo alcuni il paese avrebbe origini medievali ed era situato su un colle boscoso del versante ionico.
                Il nome “Amaronum” non deriverebbe dal greco “oscuro, cupo ombroso” o da una città greca, bensì da “Amarus”, nome di persona con suffisso “oni”, formazione da interpretare come i “discendenti di Amarus abitanti quel luogo.
                Per la popolazione anziana la denominazione Amaroni deriva dalla fusione dei nomi delle due famiglie che si contendevano il potere su Majurizzuni: gli Amari e i Moroni. Secondo altra leggenda l’originario insediamento fu devastato da un violento temporale; i superstiti, spogliati di ogni bene, al grido di “Amari nui” si accamparono dove sorge l’attuale paese.
                Delle due famiglie si sa poco: i Maroniti probabilmente provenivano dall’Oriente mentre dubbia è l’origine degli Amari, il cui nome deriverebbe da “Amarus” (terre amare), termine che in età neolitica era attribuito ai villaggi costruiti su zone paludose. Majurizzuni, infatti, sorgeva su una piena alluvionale in cui ancora oggi si formano acquitrini, ed è proprio a causa di questa sua precaria situazione che fu distrutta da una pioggia torrenziale, costringendo la popolazione a spostarsi nell’attuale paese.
                Secondo la tradizione, il paese e il popolo dei Maroniti avrebbero prenderebbero il nome dal monaco Morone o Marone, patriarca del Libano, della Siria e del popolo Hittemeronita, e abate di San Nicola dei Maioli, la cui Abbazia fu distrutta nel 1783.</p>
                <p>Le prime notizie storiche lo annoverano casale di Squillace, di cui seguì le vicende, soggiacendo agli stessi dominatori: da Giovanni di Montfort alla famiglia Marzano (1314) ai D’Aragona (1464) ai Borgia, cui appartenne dal 1494 alla prima metà del secolo XVIII, quando fu infeudato ai De Gregorio, che lo mantennero fino al 1806.
                Secondo il prof. Raffaele Aversa, gli Amaroniti, popolo guerriero, forte, agile e fedele, provengono dalla Palestina, dove ancora oggi esiste una comunità cristiana chiamata, appunto, “Maruniti”.
                Per altri le popolazioni autoctone che abitavano la zona appartenevano agli Enotri (coltivatori della vite) o agli Itali (allevatori di vitelli).
                In Calabria, del resto, giungeva gente disperata in cerca di un futuro migliore;
                sui monti della Calabria Ionica insistono tracce di una civiltà neolitica.  </p>
                <p>Alla caduta dell’Impero Romano D’Occidente (476) le terre dell’odierna Amaroni, insieme con altre, furono conquistate dai Visigoti, e in seguito annesse all’Impero Romano d’Oriente. In seguito arrivarono i Saraceni che pare hanno lasciato segni evidenti della loro presenza in Amaroni; il paese fu dimora di una colonia di mercenari mori giunti come guardie personali di un principe di Amaroni.
                Alcuni tratti somatici della popolazione richiamano alla memoria i segni dell’appartenenza al mondo arabo. A sostegno di ciò gli studi del francese Marzial: “gli Amaronesi, siano stati una colonia dei pirati tenuti nascosti dal principe di Squillace, come sicari, nel periodo delle lotte feudali questi giovani erano molto coraggiosi e proteggevano il principe di Amaroni, nella lotta contro il feudalesimo”.
                Intorno all’anno mille Amaroni vede l’arrivo dei Normanni, periodo e la nascita di numerosi luoghi religiosi: S. Maria de Reto (Rito), S. Maria de Buttadi, San Luca e Santa Maria de Plano. Seguono il dominio Sevo (1194), quello Angioino (1265), le guerre del Vespro (1282), gli Aragonesi (1442); nel 1503 Amaroni passa alla Corona Spagnola e in seguito al Regno delle due Sicilie, durante il quale sorsero altri luoghi di culto: la Chiesa di S. Venere e S. Girolamo.
                Nel 1783 Amaroni fu quasi totalmente distrutta da un rovinoso terremoto che, secondo Vivenzio,: “fu un vero e proprio colpo di grazia per tutti i paesi della zona”; la stima dei danni fu valutata in 60 mila ducati. In seguito, per volere di re Ferdinando IV, fu istituita la Cassa Sacra, una giunta chiamata ad amministrare i beni confiscati ai monasteri e ai luoghi pii, destinati a riparare i danni provocati dal sisma.  
                Nel Settecento Amaroni visse un secolo di avvenimenti importanti e dal 1799, per poco, fece parte della Repubblica Partenopea; il movimento repubblicano fu più attivo nei paesi della Calabria Citeriore, meno in Calabria Ultra, cui apparteneva Amaroni.</p>
            </Container>
            
            <Footer/>
        </div>
    );
}