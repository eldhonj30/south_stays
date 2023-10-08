import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../Contexts/UserContext";
import LoadingSpinner from "../../components/LoadingSpinner";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAdmin, admin, ready } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (admin && ready) {
      navigate("/admin");
    }
    return () => {};
  }, []);

  if (!ready) {
    return <LoadingSpinner />;
  }

  const handleLogin = async (ev) => {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/admin/login", { email, password });
      setAdmin(data);
      toast.success("Validation Success");
      navigate("/admin");
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };
  return (
    <div className="mt-4 bg-gray-200 grow flex items-center justify-around">
      <div className="mt-2 bg-white p-10 rounded-2xl">
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="black" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
