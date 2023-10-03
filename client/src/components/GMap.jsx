// import React, { useRef, useEffect, useState } from "react";
// import mapboxgl from "mapbox-gl";
// const Token = import.meta.env.VITE_REACT_APP_MAP_BOX;
// mapboxgl.accessToken = Token;

// function GMap() {
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const [lng, setLng] = useState(76.267303);
//   const [lat, setLat] = useState(9.931233);
//   const [zoom, setZoom] = useState(12);

//   useEffect(() => {
//     if (map.current) return;
//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: "mapbox://styles/eldhonj/cln8i4pln03ha01qx3vg23czi",
//       center: [lng, lat],
//       zoom: zoom,
//     });
//   }, []);

//   useEffect(() => {
//     map.current.on("move", () => {
//       setLng(map.current.getCenter().lng.toFixed(4));
//       setLat(map.current.getCenter().lat.toFixed(4));
//       setZoom(map.current.getZoom().toFixed(2));
//     });
//   });

//   return (
//     <div>
//       <div className="absolute top-0 left-0 m-6 p-2 bg-black w-[390px] rounded-2xl text-white z-20">
//         Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
//       </div>
//       <div ref={mapContainer} style={{ height: "400px", width:"600px" }}></div>
//     </div>
//   );
// }

// export default GMap;

import React, { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGl, { Marker } from "react-map-gl";
import RoomIcon from "@mui/icons-material/Room";
const Token = import.meta.env.VITE_REACT_APP_MAP_BOX;

function GMap({getLocation}) {
  const [viewport, setViewport] = useState({
    latitude: 9.931233,
    longitude: 76.267303,
    zoom: 8,
  });
  const [newplace, setNewplace] = useState(null);

  function handleClick(e) {
   const lat = e.lngLat.lat
   const lng = e.lngLat.lng
    setNewplace({
      lat,
      lng,
    });
  }

  getLocation(newplace)

  return (
    <div style={{ width: "500px", height: "500px", zIndex: 999 }}>
      <ReactMapGl
        initialViewState={viewport}
        mapboxAccessToken={Token}
        width="100%"
        height="100%"
        transitionDuration="200"
        mapStyle="mapbox://styles/eldhonj/cln8i4pln03ha01qx3vg23czi"
        onViewportChange={(viewport) => setViewport(viewport)}
        onDblClick={handleClick}
      >
        {newplace && (
          <>
            <Marker
              latitude={newplace?.lat}
              longitude={newplace?.lng}
              offsetLeft={-3.5 * viewport.zoom}
              offsetTop={-7 * viewport.zoom}
            >
              <RoomIcon
                style={{
                  fontSize: 7 * viewport.zoom,
                  color: "tomato",
                  cursor: "pointer",
                }}
              />
            </Marker>
          </>
        )}
      </ReactMapGl>
    </div>
  );
}

export default GMap;
