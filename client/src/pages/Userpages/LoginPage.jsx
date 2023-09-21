import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { UserContext } from "../../Contexts/UserContext";
import jwt_decode from "jwt-decode";
import LoadingSpinner from "../../components/LoadingSpinner";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const { setUser,user, ready} = useContext(UserContext);

  useEffect(() => {
     if (user && ready) {
       navigate("/");
     }
  },[ready,user])

     if (!ready) {
       return <LoadingSpinner />;
     }

  const handleLogin = async (ev) => {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/guest/auth", { email, password });
      setUser(data);
      toast.success("Validation Success");
      navigate('/')
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
  };


  return (
    <div className="grow flex items-center justify-around">
      <div className="">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder={"your@email.com"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?
            <Link className="underline text-black" to={"/register"}>
              Register
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
                setUser(data);
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

export default LoginPage;
