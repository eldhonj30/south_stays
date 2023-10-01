import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  const [host, setHost] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [socket,setSocket] = useState(null)

  let location = useLocation();
  let url = location.pathname.split("/")[1];

  useEffect(() => {
    if (url === "host" && !host) {
      axios
        .get("/host/hostinfo")
        .then(({ data }) => {
          setHost(data);
          setReady(true);
        })
        .catch((err) => {
          setReady(true);
        });
    }
  }, []);

  useEffect(() => {
    if (url === "admin" && !admin) {
      axios
        .get("/admin/admininfo")
        .then(({ data }) => {
          setAdmin(data);
          setReady(true);
        })
        .catch((err) => {
           setReady(true);
        });
    } else {
      axios
            .get("/guest/guestinfo")
            .then(({ data }) => {
              setUser(data);
              setReady(true);
            })
            .catch((err) => {
              setReady(true);
            });
        }
    
    return () => {};
  }, []);

  // useEffect(() => {
  //   if (url === "" || url==="login" || url === "placedetails" || url === 'profile' && !user) {
  //     axios
  //       .get("/guest/guestinfo")
  //       .then(({ data }) => {
  //         setUser(data);
  //         setReady(true);
  //       })
  //       .catch((err) => {
  //         setReady(true);
  //       });
  //   }
  //   return () => {};
  // }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, ready, host, setHost, admin, setAdmin, socket, setSocket  }}>
      {children}
    </UserContext.Provider>
  );
}
