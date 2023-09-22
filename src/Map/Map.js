import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css';
import ReactDOMServer from "react-dom/server";
import Meteo from "../Component/Meteo/Meteo";

mapboxgl.accessToken = "pk.eyJ1IjoibGVtYXQ1OSIsImEiOiJjbG1ybDhrdGYwOWN0MnFudGdwbnRzajRrIn0.GGOgV4alG0E6XZ9rnF_XwQ";

const apiFestival = "https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/festivals-global-festivals-_-pl/records?limit=100";

function Map({setFestivals, setMarkers}) {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    zoom: 5,
    latitude: 46,
    longitude: 2,
  });

  const mapRef = useRef(null);

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [viewport.longitude, viewport.latitude],
      zoom: viewport.zoom,
    });

    mapRef.current.on("load", () => {
      fetchFestivalData();
    });

    return () => {
      mapRef.current.remove();
    };
  }, [viewport]);

  async function fetchFestivalData() {
    const res = await fetch(apiFestival);
    const data = await res.json();
    setFestivals(data.results);
    addFestivalsToMap(data.results);

    console.log(data.results);
  }
  function addFestivalsToMap(AllFestivals) {
    if (!AllFestivals) return;
    const newMarkers = [];
    AllFestivals.forEach((festival, index) => {
      const coordinates = {
        lng: festival.geocodage_xy.lon,
        lat: festival.geocodage_xy.lat,
      };

      const meteoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=5f9a31138eeec3e0c1d96cdefd25c097`;
      const texte = festival.periode_principale_de_deroulement_du_festival;
      let startDate = "";
      let endDate = "";
      const meteoUrlHistory = `https://history.openweathermap.org/data/2.5/history/city?lat=${coordinates.lat}&lon=${coordinates.lng}&type=day&start=${startDate}&end=${endDate}&appid=5f9a31138eeec3e0c1d96cdefd25c097`;


      if (texte && typeof texte === 'string') {
        // Utilisation d'une expression régulière pour extraire les dates
        const datePattern = /(\d{1,2} [a-zA-Zé]+) - (\d{1,2} [a-zA-Zé]+)/;
        const match = texte.match(datePattern);
        if (match && match.length >= 3) {
          startDate = match[1];
          endDate = match[2];
        }
      }

      fetch(meteoUrl)
        .then((response) => response.json())
        .then((meteoData) => {
          const popUp_Info = ReactDOMServer.renderToString(
            <>
            <div className="popup-container">
              <h2> {festival.nom_du_festival} </h2>
              <div className="adresse">
                <h4>
                  {festival.adresse_postale 
                  ? `${festival.adresse_postale}, ${festival.commune_principale_de_deroulement}`
                  : festival.complement_d_adresse_facultatif 
                  ? `${festival.complement_d_adresse_facultatif},${festival.commune_principale_de_deroulement}` 
                  :  `${festival.commune_principale_de_deroulement}`}
                </h4>
                <p>{startDate && endDate ? `Du ${startDate} au ${endDate}` : null}</p>
              </div>
              <Meteo meteo={meteoData} />

              <div className="site-internet">
                <a className="logo-internet" href={festival.site_internet_du_festival}></a>
              </div>
            </div>
            </>
          );

          const popUpSetting = {
            className: "custom-popup"
          };

          const markerId = `marker-${index}`;
          const marker = new mapboxgl.Marker()
            .setLngLat(coordinates)
            .addTo(mapRef.current)
            .setPopup(new mapboxgl.Popup(popUpSetting).setHTML(popUp_Info));

            newMarkers.push({ id : markerId, marker });
            marker.addTo(mapRef.current);
          
        });

        setMarkers(newMarkers);
    });
  }


  return (
    <div id="map" style={{ width: viewport.width, height: viewport.height }}></div>
  );
}

export default Map;
