import './App.css';
import Logo from './Component/Logo/Logo';
import Searchbar from './Component/Searchbar/Searchbar';
import Map from './Map/Map';
import React, { useState } from 'react';

function App() {
  const [festivals, setFestivals] = useState([]);
  const [markers, setMarkers] = useState([]);

  const handleMarkerClick = (markerId) => {
    // Vous pouvez mettre votre logique de gestion ici
    console.log("Marker clicked:", markerId);
  };
  
  return (
    <div className="App">
      <Map setFestivals={setFestivals} setMarkers={setMarkers}></Map>
      <Logo></Logo>
      <Searchbar search={festivals} markers={markers} onMarkerClick={handleMarkerClick}></Searchbar>
    </div>
  );
}

export default App;
