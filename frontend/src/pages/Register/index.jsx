import React, { useState } from "react";
import Topbar from "../../components/topbar";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const Register = () => {
  let navigate = useNavigate();
  const [nip, setNip] = useState("");
  const [password, setPassword] = useState("");

  const submitRegister = () => {
    fetch("http://localhost:5000/account", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        nip: nip,
        password: password,
      }),
    })
      .then((response) => {
        console.log(response);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="h-screen w-screen">
      <div className="h-full flex justify-center items-center">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex flex-col items-start">
              <label htmlFor="nip">NIP</label>
              <input
                id="nip"
                type="text"
                placeholder="Inset NIP"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setNip(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Insert Password"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="card-actions justify-between mt-2">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="btn btn-sm"
              >
                <BiArrowBack />
                Back
              </button>
              <button
                type="button"
                onClick={() => submitRegister()}
                className="btn btn-sm btn-primary"
              >
                Sign up
              </button>
            </div>
          </div>
          <div className="card-footer">
            <p className="text-sm">
              Already have an account?{" "}
              <Link to={"/login"}> This way please </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
