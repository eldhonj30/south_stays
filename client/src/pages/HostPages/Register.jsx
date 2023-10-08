import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Loader from "../../components/Loader";

import "../../App.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confrmPassword, setconfrmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const onOpenModal = () => {
    setOpen(true);
  };
  const onCloseModal = () => {
    setOpen(false);
  };

  async function registerUser(ev) {
    ev.preventDefault();
    if (password === confrmPassword) {
      setLoading(true);
      try {
        const { data } = await axios.post("/host/signup", {
          name,
          email,
          password,
        });
        setLoading(false);
        toast.success(data.message);
        setSeconds(60);
        onOpenModal();
      } catch (err) {
        setLoading(false);
        toast.error(err?.response?.data?.message);
      }
    } else {
      setLoading(false);
      toast.error("password doesn't match!");
    }
  }

  if (redirect) {
    return <Navigate to={"/host/login"} />;
  }

  const otpVerify = () => {
    axios
      .post("/host/otp-verify", { otp, email })
      .then((response) => {
        const { data } = response;
        toast.success(data.message);
        setRedirect(true);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const otpResend = () => {
    axios.post("/host/otp-resend").then((response) => {
      setSeconds(60);
    });
  };

  if (seconds <= 60) {
    const timer = setTimeout(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);
  }

  const displayTime = () => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

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
            Already a Host ?
            <Link className="underline text-black" to={"/host/login"}>
              Login
            </Link>
          </div>
        </form>
        <Loader isLoading={loading} />
        <div>
          <Modal
            open={open}
            onClose={onCloseModal}
            center
            classNames={{
              modal: "customModal",
            }}
          >
            <h2 className="mb-3">Enter OTP recieved in you'r given email</h2>
            <input
              type="text"
              placeholder={"Your OTP"}
              value={otp}
              onChange={(ev) => setOtp(ev.target.value)}
            />
            {seconds > 0 && (
              <h2 className="text-center">
                Your Otp is only valid for 1 minute
              </h2>
            )}
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              {seconds > 0 && (
                <button
                  type="button"
                  onClick={otpVerify}
                  style={{
                    marginTop: "10px",
                    borderRadius: "5px",
                    padding: "8px",
                    backgroundColor: "black",
                    color: "white",
                  }}
                >
                  Submit
                </button>
              )}
              <div>
                {seconds > 0 ? (
                  <div
                    style={{
                      borderRadius: "5px",
                      padding: "10px",
                      backgroundColor: "smokywhite",
                      fontWeight: "bolder",
                      fontSize: "1.8rem",
                      color: "black",
                    }}
                  >
                    {displayTime()}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={otpResend}
                    style={{
                      marginTop: "10px",
                      borderRadius: "5px",
                      padding: "10px",
                      backgroundColor: "black",
                      color: "white",
                    }}
                  >
                    Resend
                  </button>
                )}
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Register;
