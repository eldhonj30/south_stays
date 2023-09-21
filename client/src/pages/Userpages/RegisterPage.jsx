import React, { useContext, useState } from "react";
import { Link, Navigate,useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../Contexts/UserContext";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confrmPassword, setconfrmPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate()

   async function registerUser(ev) {
     ev.preventDefault();

     if (password === confrmPassword) {
       try {
         const res = await axios.post("/guest/register", {
           name,
           email,
           password,
         });
         toast.success("Registration successfull")
         setRedirect(true)
       } catch (err) {
         toast.error(err?.response?.data?.message);
       }
     } else {
       toast.error("password doesn't match!");
     }
   }

   if(redirect){
    return <Navigate to={'/login'} />
   }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mt-5">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder={"your name"}
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="email"
            placeholder={"your@email.com"}
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder={"password"}
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <input
            type="password"
            placeholder={"confirm password"}
            value={confrmPassword}
            onChange={(ev) => setconfrmPassword(ev.target.value)}
          />
          <button type="submit" className="primary">
            Register
          </button>
          <div className="text-center py-2 text-gray-500">
            Already a member ?
            <Link className="underline text-black" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
        <h2 className=" mb-2 text-center font-bold text-xl">OR</h2>
        <div className="flex justify-center mt-2 items-center">
          <GoogleOAuthProvider clientId="343553056069-s8n3n25j5pnivjs9tf80e829hk1rst8v.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                let decoded = jwt_decode(credentialResponse.credential);
                const { data } = await axios.post("/guest/google-login", {
                  ...decoded,
                });
                setUser(data)
                toast.success("Validation Success");
                navigate('/')
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
