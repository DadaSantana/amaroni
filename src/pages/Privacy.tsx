import * as React from 'react'
import { HomeHeader } from '../components/home/HomeHeader';
import { Footer } from '../components/home/Footer';
import { Container } from 'react-bootstrap';
import { useAppSelector } from '../redux/hooks/useAppSelector';

export const Privacy = () => {
    const system = useAppSelector(state => state.system);

    return(
        <div id="app">
            <HomeHeader logged={false} />
            <Container>
                <h1 style={{margin: '30px auto'}}>
                    {system.language[system.current] == 'italian' ? 'Privacy Policy' : null}
                    {system.language[system.current] == 'english' ? 'Privacy Policy' : null}
                    {system.language[system.current] == 'german' ? 'Privacy Policy' : null}
                </h1>
                <h2>Trattamento dei dati</h2>
                <ol style={{textAlign: 'justify'}}>
                    <li>Utilizzando il sito l’utente autorizza il trattamento dei suoi dati personali. La presente informativa ha valore anche ai fini dell’ art. 13 del D.Lgs. n. 196/2003, Codice in materia di protezione dei dati personali, e ai fini dell’articolo 13 del Regolamento UE n. 2016/679, relativo alla protezione delle persone fisiche con riguardo al trattamento dei dati personali nonché alla libera circolazione di tali dati.</li>
                    <li>Titolare del trattamento è il Comune di Amaroni</li>
                    <li>Responsabile del trattamento è il Sindaco: Luigi Ruggiero</li>
                    <li>I dati verranno trattati presso Comune di Amaroni Via Indipendenza, 60, 88050 Amaroni (CZ)</li>
                    <li>Il trattamento dei dati avviene in forma esclusivamente elettronica, attraverso strumenti e supporti informatici atti ad assicurare la sicurezza e riservatezza dei dati medesimi. Le informazioni immagazzinate sono protette da accessi non autorizzati.</li>
                    <li>Si procede al trattamento dei dati forniti dagli utenti relativamente agli ordini di acquisto, ai pagamenti (che possono contenere nome, indirizzo, recapiti), indirizzo IP, tutti gli altri dati comunicati.</li>
                    <li>La finalità dell’utilizzazione di tali dati è l’esecuzione dell’ordine di acquisto e dei pagamenti, la comunicazione dei dati stessi a terzi fornitori dei servizi di pagamento, di spedizione nonché i contatti di natura informativa circa le attività e i servizi del sito, offerte di natura commerciale delle società affiliate e partners commerciali.</li>
                    <li>Il conferimento dei dati ed il consenso al trattamento per le finalità di cui allo scopo del contratto ovvero l’evasione dell’ordine ed il relativo pagamento è necessario alla conclusione stessa nonché all’esecuzione del contratto pertanto il rifiuto di fornire tali dati o di prestare il consenso al relativo trattamento ha come conseguenza l’impossibilità per l’utente di acquistare i prodotti e i sevizi di offerti.</li>
                    <li>Il conferimento dei dati ed il consenso al trattamento per le finalità di comunicazioni commerciali è facoltativo. Tuttavia, un eventuale rifiuto di fornire tali dati o di prestare il consenso al relativo trattamento potrà come conseguenza l’impossibilità per l’utente di ricevere tali ulteriori servizi.</li>
                    <li>L’utente, in ha sempre diritto affinché i suoi dati siano aggiornati, rettificati o integrati, la cancellazione, la trasformazione in forma anonima o il blocco dei dati trattati in violazione di legge ivi compresi quelli di cui non è necessaria la conservazione in relazione agli scopi per i quali i dati sono stati raccolti o successivamente trattati, l’attestazione che le operazioni sono state portate a conoscenza, anche per quanto riguarda il loro contenuto, di coloro ai quali i dati sono stati comunicati o diffusi, eccettuato il caso in cui tale adempimento si rivela impossibile o comporta un impiego di mezzi manifestamente sproporzionato rispetto al diritto tutelato.</li>
                    <li>L’utente ha diritto di opporsi, in tutto o in parte al trattamento dei dati personali che lo riguardano per motivi legittimi, ancorché pertinenti allo scopo della raccolta e al trattamento di dati personali che lo riguardano a fini di invio di materiale pubblicitario o di vendita diretta o per il compimento di ricerche di mercato o di comunicazione commerciale.</li>
                    <li>L’utente può inoltre revocare in qualsiasi momento il consenso al trattamento dei propri dati precedentemente dato al Comune di Amaroni.</li>
                    <li>Tutti i diritti previsti dal Regolamento UE 2016/679 e dalla legge 196/2003, possono essere esercitati dall’utente, scrivendo alla seguente mail: <a href="">sindaco@comunediamaroni.it</a></li>
                    <li>Alla prima visita l’utente sarà invitato a scegliere la propria lingua ed offrirà la possibilità di salvare la lingua di preferenza. A tal fine, l’utente autorizza l’utilizzazione dei codici di identificazione c.d. cookies, i.e. piccoli file inviati dal proprio internet server e registrabili sul disco rigido del computer dell’utente.</li>
                    <li>Il disco rigido raccoglie le informazioni sulla preferenza della lingua dell’utente e memorizza le pagine del sito visitate. I cookies sono utilizzati allo scopo di evitare che l’utente riceva la stessa informazione ripetutamente o nella lingua sbagliata, e per adattare il contenuto e la presentazione del sito al tipo di browser dell’utente.</li>
                </ol>
                <h2>Cookie</h2>
                <h3>1 – Tipo di Cookies</h3>
                <ol style={{textAlign: 'justify'}}>
                    <li>Il sito www.amaroniborgo.it utilizza cookies per rendere l’esperienza di navigazione dell’utente più facile ed intuitiva: i cookies sono piccole stringhe di testo utilizzate per memorizzare alcune informazioni che possono riguardare l’utente, le sue preferenze o il dispositivo di accesso a Internet (computer, tablet o cellulare) e vengono utilizzate principalmente per adeguare il funzionamento del sito alle aspettative dell’utente, offrendo un’esperienza di navigazione più personalizzata e memorizzando le scelte effettuate in precedenza.</li>
                    <li>Un cookie consiste in un ridotto insieme di dati trasferiti al browser dell’utente da un server web e può essere letto unicamente dal server che ha effettuato il trasferimento. Non si tratta di codice eseguibile e non trasmette virus.</li>
                    <li>I cookies non registrano alcuna informazione personale e gli eventuali dati identificabili non verranno memorizzati. Se si desidera, è possibile impedire il salvataggio di alcuni o tutti i cookie. Tuttavia, in questo caso l’utilizzo del sito e dei servizi offerti potrebbe risultarne compromesso. Per procedere senza modificare le opzioni relative ai cookies è sufficiente continuare con la navigazione.</li>
                </ol>
                <p>Di seguito le tipologie di cookies di cui il sito fa uso:</p>
                <h3>2 – Cookies tecnici</h3>
                <ol style={{textAlign: 'justify'}}>
                    <li>Ci sono numerose tecnologie usate per conservare informazioni nel computer dell’utente, che poi vengono raccolte dai siti. Tra queste la più conosciuta e utilizzata è quella dei cookies HTML. Essi servono per la navigazione e per facilitare l’accesso e la fruizione del sito da parte dell’utente. Sono necessari alla trasmissione di comunicazioni su rete elettronica ovvero al fornitore per erogare il servizio richiesto dal cliente.</li>
                    <li>Le impostazioni per gestire o disattivare i cookies possono variare a seconda del browser internet utilizzato. Ad ogni modo, l’utente può gestire o richiedere la disattivazione generale o la cancellazione dei cookies, modificando le impostazioni del proprio browser internet. Tale disattivazione può rallentare o impedire l’accesso ad alcune parti del sito.</li>
                    <li>L’uso di cookies tecnici consente la fruizione sicura ed efficiente del sito.</li>
                    <li>I cookies che vengono inseriti nel browser e ritrasmessi mediante Google Analytics o tramite il servizio statistiche di blogger o similari sono tecnici solo se utilizzati a fini di ottimizzazione del sito direttamente dal titolare del sito stesso, che potrà raccogliere informazioni in forma aggregata sul numero degli utenti e su come questi visitano il sito. A queste condizioni, per i cookies analytics valgono le stesse regole, in tema di informativa e consenso, previste per i cookies tecnici.</li>
                    <li>Dal punto di vista della durata si possono distinguere cookies temporanei di sessione che si cancellano automaticamente al termine della sessione di navigazione e servono per identificare l’utente e quindi evitare il login ad ogni pagina visitata e quelli permanenti che restano attivi nel pc fino a scadenza o cancellazione da parte dell’utente.</li>
                    <li>Potranno essere installati cookies di sessione al fine di consentire l’accesso e la permanenza nell’area riservata del portale come utente autenticato.</li>
                    <li>Essi non vengono memorizzati in modo persistente ma esclusivamente per la durata della navigazione fino alla chiusura del browser e svaniscono con la chiusura dello stesso. Il loro uso è strettamente limitato alla trasmissione di identificativi di sessione costituiti da numeri casuali generati dal server necessari per consentire l’esplorazione sicura ed efficiente del sito.</li>
                </ol>
                <h3>3 – Cookies di terze parti</h3>
                <ol style={{textAlign: 'justify'}}>
                    <li>In relazione alla provenienza si distinguono i cookies inviati al browser direttamente dal sito che si sta visitando e quelli di terze parti inviati al computer da altri siti e non da quello che si sta visitando.</li>
                    <li>I cookies permanenti sono spesso cookies di terze parti.</li>
                    <li>La maggior parte dei cookies di terze parti è costituita da cookies di tracciamento usati per individuare il comportamento online, capire gli interessi e quindi personalizzare le proposte pubblicitarie per gli utenti.</li>
                    <li>Potranno essere installati cookies di terze parti analitici. Essi sono inviati da domini di predette terze parti esterni al sito.</li>
                    <li>I cookies analitici di terze parti sono impiegati per rilevare informazioni sul comportamento degli utenti su www.amaroniborgo.it. La rilevazione avviene in forma anonima, al fine di monitorare le prestazioni e migliorare l’usabilità del sito. I cookies di profilazione di terze parti sono utilizzati per creare profili relativi agli utenti, al fine di proporre messaggi pubblicitari in linea con le scelte manifestate dagli utenti medesimi.</li>
                    <li>L’utilizzo di questi cookies è disciplinato dalle regole predisposte dalle terze parti medesime, pertanto, si invitano gli utenti a prendere visione delle informative privacy e delle indicazioni per gestire o disabilitare i cookies pubblicate nelle relative pagine web.</li>
                </ol>
                <h2>IV – DATI TRATTATI</h2>
                <h3>1 – Modalità trattamento dati</h3>
                <ol style={{textAlign: 'justify'}}>
                    <li>Come tutti i siti web anche il presente sito fa uso di log files nei quali vengono conservate informazioni raccolte in maniera automatizzata durante le visite degli utenti. Le informazioni raccolte potrebbero essere le seguenti:
                    <br />
                    – indirizzo internet protocol (IP);<br />
                    – tipo di browser e parametri del dispositivo usato per connettersi al sito;<br />
                    – nome dell’internet service provider (ISP);<br />
                    – data e orario di visita;<br />
                    – pagina web di provenienza del visitatore (referral) e di uscita;<br />
                    – eventualmente il numero di click.<br /></li>
                    <li>Le suddette informazioni sono trattate in forma automatizzata e raccolte in forma esclusivamente aggregata al fine di verificare il corretto funzionamento del sito, e per motivi di sicurezza. Tali informazioni saranno trattate in base ai legittimi interessi del titolare.</li>
                    <li>A fini di sicurezza (filtri antispam, firewall, rilevazione virus), i dati registrati automaticamente possono eventualmente comprendere anche dati personali come l’indirizzo Ip, che potrebbe essere utilizzato, conformemente alle leggi vigenti in materia, al fine di bloccare tentativi di danneggiamento al sito medesimo o di recare danno ad altri utenti, o comunque attività dannose o costituenti reato. Tali dati non sono mai utilizzati per l’identificazione o la profilazione dell’utente, ma solo a fini di tutela del sito e dei suoi utenti, tali informazioni saranno trattate in base ai legittimi interessi del titolare.</li>
                    <li>Qualora il sito consenta l’inserimento di commenti, oppure in caso di specifici servizi richiesti dall’utente, ivi compresi la possibilità di inviare il Curriculum Vitae per un eventuale rapporto lavorativo, il sito rileva automaticamente e registra alcuni dati identificativi dell’utente, compreso l’indirizzo mail. Tali dati si intendono volontariamente forniti dall’utente al momento della richiesta di erogazione del servizio. Inserendo un commento o altra informazione l’utente accetta espressamente l’informativa privacy, e in particolare acconsente che i contenuti inseriti siano liberamente diffusi anche a terzi. I dati ricevuti verranno utilizzati esclusivamente per l’erogazione del servizio richiesto e per il solo tempo necessario per la fornitura del servizio.</li>
                    <li>Le informazioni che gli utenti del sito riterranno di rendere pubbliche tramite i servizi e gli strumenti messi a disposizione degli stessi, sono fornite dall’utente consapevolmente e volontariamente, esentando il presente sito da qualsiasi responsabilità in merito ad eventuali violazioni delle leggi. Spetta all’utente verificare di avere i permessi per l’immissione di dati personali di terzi o di contenuti tutelati dalle norme nazionali ed internazionali.</li>
                </ol>
                <h3>2 – Finalità del trattamento dati</h3>
                <ol style={{textAlign: 'justify'}}>
                    <li>I dati raccolti dal sito durante il suo funzionamento sono utilizzati per finalità sopra indicate e per le seguenti finalità:</li>
                </ol>
                <p>Statistiche di utilizzo</p>
                <ol style={{textAlign: 'justify'}}>
                    <li>La conservazione dei dati sarà effettuata per il periodo strettamente necessario al raggiungimento della finalità sopra indicata, per tutta la durata necessaria per l’erogazione del servizio (es. mailing list).</li>
                    <li>I dati utilizzati a fini di sicurezza (blocco tentativi di danneggiamento del sito) sono conservati per il tempo strettamente necessario al raggiungimento del fine anteriormente indicato.</li>
                </ol>
                <h3>3 – Dati forniti dall’utente</h3>
                <ol style={{textAlign: 'justify'}}>
                    <li>Come sopra indicato, l’invio facoltativo, esplicito e volontario di posta elettronica agli indirizzi indicati su questo sito comporta la successiva acquisizione dell’indirizzo del mittente, necessario per rispondere alle richieste, nonché degli eventuali altri dati personali inseriti nella missiva.</li>
                    <li>Specifiche informative di sintesi verranno progressivamente riportate o visualizzate nelle pagine del sito predisposte per particolari servizi a richiesta.</li>
                </ol>
                <h3>4 – Supporto nella configurazione del proprio browser</h3>
                <ol style={{textAlign: 'justify'}}>
                    <li>L’utente può gestire i cookie anche attraverso le impostazioni del suo browser. Tuttavia, cancellando i cookies dal browser potrebbe rimuovere le preferenze che ha impostato per il sito.</li>
                    <li>Per ulteriori informazioni e supporto è possibile anche visitare la pagina di aiuto specifica del web browser che si sta utilizzando: <br />
                    – Internet Explorer: http://windows.microsoft.com/en-us/windows-vista/block-or-allow-cookies<br />
                    – Firefox: https://support.mozilla.org/en-us/kb/enable-and-disable-cookies-website-preferences<br />
                    – Safari: http://www.apple.com/legal/privacy/it/<br />
                    – Chrome: https://support.google.com/accounts/answer/61416?hl=it<br />
                    – Opera: http://www.opera.com/help/tutorials/security/cookies/<br />
                    </li>
                </ol>  
                <h2>DIRITTI DELL’UTENTE</h2> 
                <p>L’art. 13, c. 2 del Regolamento UE 2016/679 elenca i diritti dell’utente.</p>
                <p>Il sito www.amaroniborgo.it intende pertanto informare l’utente sull’esistenza:</p>
                <p>– del diritto dell’interessato di chiedere al titolare l’accesso ai dati personali (art. 15 Regolamento UE), il loro aggiornamento (art. 7, co. 3, lett. a) D.Lgs. 196/2003), la rettifica (art. 16 Regolamento UE), l’integrazione (art. 7, co. 3, lett. a) D.Lgs. 196/2003) o la limitazione del trattamento che lo riguardino (art. 18 Regolamento UE) o di opporsi, per motivi legittimi, al loro trattamento (art. 21 Regolamento UE), oltre al diritto alla portabilità dei dati (art. 20 Regolamento UE); <br />
                – del diritto di chiedere la cancellazione (art. 17 Regolamento UE), la trasformazione in forma anonima o il blocco dei dati trattati in violazione di legge, compresi quelli di cui non è necessaria la conservazione in relazione agli scopi per i quali i dati sono stati raccolti o successivamente trattati (art. 7, co. 3, lett. b) D.Lgs. 196/2003); <br />
                – del diritto di ottenere l’attestazione che le operazioni di aggiornamento, rettificazione, integrazione dei dati, cancellazione, blocco dei dati, trasformazione sono state portate a conoscenza, anche per quanto riguarda il loro contenuto, di coloro ai quali i dati sono stati comunicati o diffusi, eccettuato il caso in cui tale adempimento si rivela impossibile o comporta un impiego di mezzi manifestamente sproporzionato rispetto al diritto tutelato (art. 7, co. 3, lett. C) D.lgs. 196/2003);
                </p>
                <p>Le richieste possono essere indirizzate al titolare del trattamento, senza formalità o, in alternativa, utilizzando il modello previsto dal Garante per la Protezione dei Dati Personali, o inviando una mail all’indirizzo: <a href="">sindaco@comunediamaroni.it</a></p>
                <p>Qualora il trattamento sia basato sull’art. 6, paragrafo 1, lett. a) – consenso espresso all’utilizzo – oppure sull’art. 9, paragrafo 2 lett. a) – consenso espresso all’utilizzo di dati genetici, biometrici, relativi alla salute, che rivelino convinzioni religiose, o filosofiche o appartenenza sindacale, che rivelino l’origine razziale o etnica, le opinioni politiche – l’utente ha il diritto di revocare il consenso in qualsiasi momento senza pregiudicare la liceità del trattamento basata sul consenso prestato prima della revoca.</p>
                <p>Parimenti, in caso di violazione della normativa, l’utente ha il diritto di proporre reclamo presso il Garante per la Protezione dei Dati Personali, quale autorità preposta al controllo sul trattamento nello Stato Italiano.</p>
                <p>Per una disamina più approfondita dei diritti che Le competono, si vedano gli artt. 15 e ss. del Regolamento UE 2016/679 e l’art. 7 del D.Lgs. 196/2003.</p>
                <h2>VI – TRASFERIMENTO DATI A PAESI EXTRA UE</h2>
                <p>Il presente sito potrebbe condividere alcuni dei dati raccolti con servizi localizzati al di fuori dell’area dell’Unione Europea. In particolare con Google, Facebook e Microsoft (LinkedIn) tramite i social plugin e il servizio di Google Analytics. Il trasferimento è autorizzato e strettamente regolato dall’articolo 45, comma 1 del Regolamento UE 2016/679, per cui non occorre ulteriore consenso. Le aziende sopra menzionate garantiscono la propria adesione al Privacy Shield.</p>
                <p>Non verranno mai trasferiti dati a Paesi terzi che non rispettino le condizioni previste dall’articolo 45 e ss, del Regolamento UE.</p>
                <h2>VII. SICUREZZA DATI FORNITI</h2>
                <ol style={{textAlign: 'justify'}}>
                    <li>Il presente sito tratta i dati degli utenti in maniera lecita e corretta, adottando le opportune misure di sicurezza volte ad impedire accessi non autorizzati, divulgazione, modifica o distruzione non autorizzata dei dati. Il trattamento viene effettuato mediante strumenti informatici e/o telematici, con modalità organizzative e con logiche strettamente correlate alle finalità indicate.</li>
                    <li>Oltre al titolare, in alcuni casi, potrebbero avere accesso ai dati categorie di incaricati coinvolti nell’organizzazione del sito (personale amministrativo, commerciale, marketing, legali, amministratori di sistema) ovvero soggetti esterni (come fornitori di servizi tecnici terzi, corrieri postali, hosting provider, società informatiche, agenzie di comunicazione).</li>
                </ol>
                <h2>VIII. MODIFICHE AL PRESENTE DOCUMENTO</h2>
                <p>1.	Il presente documento, pubblicato all’indirizzo: <a href="">https://www.amaroniborgo.it/privacy-policy</a></p>
                <p>Costituisce la privacy policy di questo sito.</p>
                <ol style={{textAlign: 'justify'}}>
                    <li>Esso può essere soggetto a modifiche o aggiornamenti. Qualora si tratti di modifiche ed aggiornamenti rilevanti questi saranno segnalati con apposite notifiche agli utenti.</li>
                    <li>Le versioni precedenti del documento saranno comunque consultabili a questa pagina.</li>
                    <li>Il documento è stato aggiornato in data 19/05/2018 per essere conforme alle disposizioni normative in materia, ed in particolare in conformità al Regolamento UE 2016/679.</li>
                </ol>
            </Container>            
            <Footer/>
        </div>
    );
}