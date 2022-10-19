import React, { useEffect, useRef } from "react";

import {MapContainer,  LayersControl, Map, TileLayer, WMSTileLayer, GeoJSON, Marker } from "react-leaflet";
import Proj from "proj4leaflet";

import L from "leaflet";
import 'leaflet/dist/leaflet.css';


L.Proj = Proj;
const { Overlay } = LayersControl;
const TILES = "https://tile.gbif.org/3116/omt/{z}/{x}/{y}@4x.png?style=osm-bright-en"
const defaultMarker = new L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [13, 0]
});



const MapReporte = ({q}) => {

  console.log(q,"search")

  const Bbox_width = 18.99 - 5.93;
  const startResolution = Bbox_width / 1024;
  const resolutions = new Array(22);
  for (var i = 0; i < 22; ++i) {
    resolutions[i] = startResolution / Math.pow(2, i);
  }
  var crs_3116 = new  L.Proj.CRS(
    'EPSG:3116', 
    '+proj=tmerc +lat_0=4.596200416666666 +lon_0=-74.07750791666666 +k=1 +x_0=1000000 +y_0=1000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
    {
      origin: [0, 0],
      bounds: L.bounds([5.93, 34.76], [18.99, 47.1]),
      resolutions
    }
  );
  //Proj.defs('EPSG:3116', '+proj=tmerc +lat_0=4.596200416666666 +lon_0=-74.07750791666666 +k=1 +x_0=1000000 +y_0=1000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');
  var crs_6706 = new Proj.CRS(
    "EPSG:3116",
    "+proj=tmerc +lat_0=4.596200416666666 +lon_0=-74.07750791666666 +k=1 +x_0=1000000 +y_0=1000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs",
    {
      origin: [0, 0],
      bounds: L.bounds([5.93, 34.76], [18.99, 47.1]),
      resolutions
    }
  );
  const proj = crs_3116;
  proj.unproject(new L.Point(789213,1172820));
  const position = proj.unproject(new L.Point(789213,1172820));
  console.log(position["lat"],"p")
    return (
      <MapContainer
      center={[6.1052462,-75.7794948]}
      zoom={8}>
      <Marker icon={defaultMarker}  position={position} >
      
    </Marker>
    <LayersControl position="topright">
        <Overlay name="Layer Catasto">
          <WMSTileLayer
            url="https://wms.cartografia.agenziaentrate.gov.it/inspire/wms/ows01.php"
            layers={[
              "province",
              "CP.CadastralZoning",
              "CP.CadastralParcel",
              "fabbricati",
              "strade",
              "acque",
              "vestizioni"
            ]}
            format="image/png"
            attribution={
              "© " +
              '<a href="https://creativecommons.org/licenses/by-nc-nd/2.0/it/">Agenzia delle Entrate CC-BY-NC-ND 4.0</a>'
            }
            transparent
            crs={crs_3116}
          />
        </Overlay>
      </LayersControl>
        
         
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
    )
  }
  export default MapReporte;