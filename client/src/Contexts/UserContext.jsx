import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {toast} from "react-toastify"

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [hReady, setHReady] = useState(false);

  const [host, setHost] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [socket,setSocket] = useState(null)

  let location = useLocation();
  let dep = location.pathname
  let url = location.pathname.split("/")[1];

  useEffect(() => {
    if (url === "host") {
      axios
        .get("/host/hostinfo")
        .then(({ data }) => {
           if (data) {
             setHost(data);
             setHReady(true);
           } else {
             setHost(null);
             setHReady(true);
             toast.error("You have been blocked,Please contact admin");
           }
        })
        .catch((err) => {
          setHost(null)
          setHReady(true);
        });
    }
  }, [dep]);

  useEffect(() => {
    if (url === "admin") {
      axios
        .get("/admin/admininfo")
        .then(({ data }) => {
          setAdmin(data);
          setReady(true);
        })
        .catch((err) => {
          setAdmin(null)
           setReady(true);
        });
    } else {
      if (url !== "login") {
        axios
          .get("/guest/guestinfo")
          .then(({ data }) => {
            if (data) {
              setUser(data);
              setReady(true);
            } else {
              setUser(null);
              toast.error("You have been blocked,Please contact admin");
            }
          })
          .catch((err) => {
            setReady(true);
            setUser(null);
          });
      }
        }
    
    return () => {};
  }, [dep]);

  return (
    <UserContext.Provider
      value={{ user, setUser, ready, hReady, host, setHost, admin, setAdmin, socket, setSocket  }}>
      {children}
    </UserContext.Provider>
  );
}
