
import React, { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGl, { Marker } from "react-map-gl";
import RoomIcon from "@mui/icons-material/Room";
const Token = import.meta.env.VITE_REACT_APP_MAP_BOX;

function SearchMap({ getLocation,lat,long }) {
  const [viewport, setViewport] = useState({
    latitude: lat || 9.931233,
    longitude: long || 76.267303,
    zoom: 8,
  });
  const [newplace, setNewplace] = useState(null);

  function handleClick(e) {
    const lat = e.lngLat.lat;
    const lng = e.lngLat.lng;
    setNewplace({
      lat,
      lng,
    });
  }

  getLocation(newplace);

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

export default SearchMap;
