import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import {MapContainer, Map, TileLayer, withLeaflet, GeoJSON } from "react-leaflet";
import Proj4 from "proj4leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
const MERCATOR_TILES_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const nationalParks= {
    "type": "FeatureCollection",
    "features": [{
      "type": "Feature",
      "id": 0,
      "properties": {
        "Code": "FRLA",
        "Name": "Frederick Law Olmsted National Historic Site"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-71.131129569256473, 42.325508673715092]
      }
    }, {
      "type": "Feature",
      "id": 1,
      "properties": {
        "Code": "GLDE",
        "Name": "Gloria Dei Church National Historic Site"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-75.143583605984745, 39.934377409572079]
      }
    }
    ]
  }
const MapReporte = () => {
    const mapRef = useRef();

    useEffect(() => {
      const { current = {} } = mapRef;
      const { leafletElement: map } = current;
  
      if ( !map ) return;
  
      const parksGeoJson = new L.GeoJSON(nationalParks, {
        onEachFeature: (feature = {}, layer) => {
          const { properties = {} } = feature;
          const { Name } = properties;
  
          if ( !Name ) return;
  
          layer.bindPopup(`<p>${Name}</p>`);
        }
      });
  
      parksGeoJson.addTo(map);
    }, [])
  
    return (
     <div className="mb-4 py-3">
       <MapContainer ref={mapRef} center={[6.50, -75.35]} zoom={4}
          style={{
            height:"21rem",
            top: "40rem",
            width: "60%",
            minWidth: "200px",
          }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />
        </MapContainer>
    </div>
     
       
    );
  }
  export default MapReporte;