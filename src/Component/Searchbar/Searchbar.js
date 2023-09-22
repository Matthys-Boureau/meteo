import "./Searchbar.css";
import React, { useState } from "react";

export default function Searchbar({ search, markers, onMarkerClick }) {

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);

    // Effectuez la recherche et filtrez les résultats ici
    const filteredResults = search.filter((f) =>
      f.nom_du_festival.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleListItemClick = (markerId) => {
    console.log("Clic sur élément de la liste avec ID :", markerId);
  
    // Recherchez le marqueur correspondant par ID
    const markerToOpen = markers.find((marker) => marker.id === markerId);

    console.log("Markers in Searchbar.js:", markers);

    if (onMarkerClick) {
      onMarkerClick(markerId);
    }
  
    if (markerToOpen) {
      console.log("Ouverture de la popup pour le marqueur :", markerId);
      markerToOpen.marker.togglePopup();
    } else {
      console.log("Aucun marqueur trouvé avec ID :", markerId);
    }
  };

  return (
    <>
      <div className="container">
        <input
          type="text"
          maxLength="12"
          placeholder="Search..."
          className="searchbar"
          value={searchTerm}
          onChange={handleSearch}
        />
        {searchTerm !== "" && (
          <ul>
            {searchTerm === " " ? (
              search.map((result) => (
                <li
                  key={result.id}
                  onClick={() => handleListItemClick(result.id)}
                >
                  {result.nom_du_festival}
                </li>
              ))
            ) : (
              searchResults.map((result) => (
                <li
                  key={result.id}
                  onClick={() => handleListItemClick(result.id)}
                >
                  {result.nom_du_festival}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </>
  );
}
