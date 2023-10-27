import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../Contexts/UserContext";
import LoadingSpinner from "../../components/LoadingSpinner";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setHost, host, ready } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (host && ready) {
      navigate("/host");
    }
    return () => {};
  }, [host, ready]);

  if (!ready) {
    return <LoadingSpinner />;
  }

    function validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    function validatePassword(password) {
      return password.length >= 6;
    }

  const handleLogin = async (ev) => {
    ev.preventDefault();
       if(!validateEmail(email) && !validatePassword(password)) return toast.error("Invalid email or password")
    try {
      const { data } = await axios.post("/host/login", { email, password });

      setHost(data);
      toast.success("Validation Success");
      navigate("/host");
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mt-2">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto">
          <input
            type="email"
            placeholder={"your@email.com"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder={"password"}
            autocomplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary" onClick={handleLogin}>
            Login
          </button>
          <div className="text-center py-2 text-gray-500">
            Want host your home ?
            <Link className="underline text-black" to={"/host/register"}>
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
