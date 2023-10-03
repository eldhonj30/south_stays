import React, { useState, useEffect } from "react";
import {
  AddressAutofill,
  config,
} from "@mapbox/search-js-react";
const Token = import.meta.env.VITE_REACT_APP_MAP_BOX;

function AddressSearch({getAddress}) {
  const [token, setToken] = useState("");

  useEffect(() => {
    const accessToken = Token;
    setToken(accessToken);
    config.accessToken = accessToken;
  }, []);


  return (
    <div >
      <div>
        <AddressAutofill
          accessToken={token}
          confirmOnBrowserAutofill={true}
        >
          <input
            className="rounded-xl p-2 border border-gray-200 w-[670px]"
            placeholder="Start typing your address, e.g. 123 Main..."
            autoComplete="address-line1"
            id="mapbox-autofill"
            onChange={(e) => getAddress(e.target.value)}
          />
        </AddressAutofill>
      </div>
    </div>
  );
}

export default AddressSearch;
