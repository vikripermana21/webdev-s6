import React, { useState } from "react";
import Topbar from "../../components/topbar";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const Login = () => {
  let navigate = useNavigate();
  const [nip, setNip] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);

  const submitLogin = () => {
    fetch("http://localhost:5000/login", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nip: nip,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("infoAkun", JSON.stringify(data.infoAkun));
        if (data.infoAkun.role === "Admin") {
          localStorage.setItem("userRole", "Admin");
          navigate("/dashboard/admin");
        } else if (data.infoAkun.role === "Dosen") {
          localStorage.setItem("userRole", "Dosen");
          navigate("/dashboard/dosen");
        } else {
          console.log("Peran pengguna tidak valid:", data.role);
        }
      })
      .catch((err) => {
        console.log(err);
        // Menampilkan pesan kesalahan dengan menggunakan alert
        alert("Login failed. Please check your credentials.");
        // Mengatur pesan kesalahan pada state untuk merubah tampilan input
        setLoginError("Invalid credentials");
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      submitLogin();
    }
  };

  return (
    <div className="h-screen w-screen">
      <div className="h-full flex justify-center items-center">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="card-title pb-5">
              <p className="text-center text-2xl font-bold">Login</p>
            </div>

            <div className="flex flex-col items-start">
              <label htmlFor="nip">NIP</label>
              <input
                id="nip"
                type="text"
                placeholder="Insert NIP"
                className={`input input-bordered w-full max-w-xs mt-2 ${
                  loginError === "Invalid credentials" ? "input-error" : ""
                }`}
                onChange={(e) => {
                  setNip(e.target.value);
                  setLoginError(null); // Menghilangkan pesan kesalahan saat input berubah
                }}
                onKeyDown={handleKeyDown}
              />
              {loginError === "Invalid credentials" && (
                <span className="text-red-600">Invalid NIP or Password</span>
              )}
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="password ">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Insert Password"
                className={`input input-bordered w-full max-w-xs mt-2 ${
                  loginError === "Invalid credentials" ? "input-error" : ""
                }`}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setLoginError(null); // Menghilangkan pesan kesalahan saat input berubah
                }}
                onKeyDown={handleKeyDown}
              />
              {loginError === "Invalid credentials" && (
                <span className="text-red-600">Invalid NIP or Password</span>
              )}
            </div>
            <div className="card-actions justify-between mt-2">
              <button
                type="button"
                onClick={() => navigate(`/`)}
                className="btn btn-sm"
              >
                <BiArrowBack />
                Back
              </button>
              <button
                type="button"
                onClick={() => submitLogin()}
                className="btn btn-sm btn-primary"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
