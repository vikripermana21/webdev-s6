import React, { useState } from "react";
import Topbar from "../../components/topbar";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";


const AddDosen = () => {
  let navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("Laki-Laki");
  const [email, setEmail] = useState("");
  const [nip, setNip] = useState("");
  const [password, setPassword] = useState("");

  const submitAddDosen = () => {
    fetch("http://localhost:5000/lecturer", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: fullName,
        place_of_birth: placeOfBirth,
        date_of_birth: dateOfBirth,
        gender: gender,
        email: email,
        nip: nip,
        password: password,
      }),
    })
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="h-screen w-screen">
      <div className="h-full flex justify-center items-center">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex flex-col items-start">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                placeholder="Insert Full Name"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="placeOfBirth">Place of Birth</label>
              <input
                id="placeOfBirth"
                type="text"
                placeholder="Insert Place of Birth"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPlaceOfBirth(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                id="dateOfBirth"
                type="date"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="Laki-Laki">Laki-Laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Insert Email"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="nip">NIP</label>
              <input
                id="nip"
                type="text"
                placeholder="Insert NIP"
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
              <button type="button" onClick={() => navigate("/")} className="btn btn-sm">
                <BiArrowBack /> Back
              </button>
              <button type="button" onClick={() => submitAddDosen()} className="btn btn-sm btn-primary">
                Add Dosen
              </button>
            </div>
          </div>
          <div className="card-footer">
            <p className="text-sm">
              Already have an account? <Link to={"/login"}> This way please </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDosen;
