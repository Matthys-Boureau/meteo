import './App.css';
import Logo from './Component/Logo/Logo';
import Searchbar from './Component/Searchbar/Searchbar';
import Map from './Map/Map';
import React, { useState } from 'react';

function App() {
  const [festivals, setFestivals] = useState([]);

  return (
    <div className="App">
      <Map setFestivals={setFestivals}></Map>
      <Logo></Logo>
      <Searchbar search={festivals}></Searchbar> {/* Passer festivals en tant que prop */}
    </div>
  );
}

export default App;
