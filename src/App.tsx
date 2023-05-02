import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import './App.css';
import { Dashboard } from './pages/Dashboard';
import { Event } from './pages/Event';
import { News } from './pages/News';
import { Attraction } from './pages/Attraction';
import { Home } from './pages/Home';
import { Gallery } from './pages/Gallery';
import { Storia } from './pages/Storia';
import { Perfil } from './pages/Perfil';
import { Verify } from './pages/Verify';
import { Rotkreuz } from './components/rotkreuz';
import { Palazzo } from './components/palazio';
import { Privacy } from './pages/Privacy';
import { Legali } from './pages/Legali';
<<<<<<< HEAD
=======
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { Spaceapp } from './pages/Spaceapp';

>>>>>>> c415e8aca664a869c148a9d52dfce3b6b3bf6b24

function App() {
  // Get registration token. Initially this makes a network call, once retrieved
  // subsequent calls to getToken will return from cache.
<<<<<<< HEAD
 /*  const messaging = getMessaging();
=======
  const messaging = getMessaging();
>>>>>>> c415e8aca664a869c148a9d52dfce3b6b3bf6b24
  getToken(messaging, { vapidKey:"BFFgiOFZH-1KJ7DixVoDyRIKyyasrbiZYh4Cq8Pv8FxI3ghGErba26c-YGSak9T3dSP9wqaVLC_pQcToYbpsR5U", }).then((currentToken) => {
    if (currentToken) {
      console.log("<---- User token: ", currentToken);
    } else {
      console.log(
        "<---- No registration token available. Request permission to generate one."
      );
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });

  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    // ...
<<<<<<< HEAD
  }); */
=======
  });
>>>>>>> c415e8aca664a869c148a9d52dfce3b6b3bf6b24


  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/event/:eventId' element={<Event />} />        
        <Route path='/attraction/:attractionId' element={<Attraction />} />        
        <Route>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/dashboard/:element' element={<Dashboard />} />
          <Route path='/dashboard/pages/:element' element={<Dashboard />} />
        </Route>
        <Route path='/storia' element={<Storia />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/palazzo' element={<Palazzo />} />
        <Route path='/palazzo/news/:newsid' element={<News />} />
        <Route path='/gemellaggio/rotkreuz' element={<Rotkreuz />} />
        <Route path='/perfil' element={<Perfil />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/privacy-policy' element={<Privacy />} />
        <Route path='/note-legali' element={<Legali />} />
<<<<<<< HEAD
=======
        <Route path='/api/spaceapp' element={<Spaceapp />} />
>>>>>>> c415e8aca664a869c148a9d52dfce3b6b3bf6b24
      </Routes>
    </div>
  );
}

export default App;
