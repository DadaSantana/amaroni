import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import './App.css';
import { Dashboard } from './pages/Dashboard';
import { Event } from './pages/Event';
import { Attraction } from './pages/Attraction';
import { Home } from './pages/Home';
import { Gallery } from './pages/Gallery';
import { Storia } from './pages/Storia';
import { Perfil } from './pages/Perfil';
import { Verify } from './pages/Verify';
import { Rotkreuz } from './components/rotkreuz';
import { Lukovica } from './components/lukovica';
import { Palazio } from './components/palazio';

function App() {
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
        <Route path='/palazio' element={<Palazio />} />
        <Route path='/gemmellagi/rotkreuz' element={<Rotkreuz />} />
        <Route path='/gemmellagi/lukovica' element={<Lukovica />} />
        <Route path='/perfil' element={<Perfil />} />
        <Route path='/verify' element={<Verify />} />
      </Routes>
    </div>
  );
}

export default App;
