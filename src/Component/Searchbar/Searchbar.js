import "./Searchbar.css";
import React, { useState } from "react";

export default function Searchbar({ search }) {
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
                <li key={result.id}>{result.nom_du_festival}</li>
              ))
            ) : (
              searchResults.map((result) => (
                <li key={result.id}>{result.nom_du_festival}</li>
              ))
            )}
          </ul>
        )}
      </div>
    </>
  );
}
