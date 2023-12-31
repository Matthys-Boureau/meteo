import React from "react";

function Meteo({ meteo }) {
  if (!meteo) {
    return null; // Gérez le cas où les données de météo ne sont pas disponibles
  }

const temperatureKelvin = meteo.main.temp;
const temperatureCelsius = Math.round(temperatureKelvin - 273.15);
const intemperie = meteo.weather[0].main;

  return (
    <div className="meteo-container">
      <h3>Météo actuel : {temperatureCelsius}°C , {intemperie}</h3>
    </div>
  );
}

export default Meteo;




