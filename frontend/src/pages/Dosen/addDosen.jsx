import React, { useState } from "react";
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
  const [profilePicture, setProfilePicture] = useState("");
  const [bio, setBio] = useState("");
  const [major, setMajor] = useState("");
  const [position, setPosition] = useState("");
  const [studyProgram, setStudyProgram] = useState("");

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
        profile_picture: profilePicture,
        bio: bio,
        major: major,
        position: position,
        study_program: studyProgram,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Dosen added successfully!");
          navigate("/");
        } else {
          console.error("Error adding Dosen");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result); // Set base64 encoded image data to state
      };
      reader.readAsDataURL(file);
    }
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
              <label htmlFor="profilePicture">Profile Picture</label>
              <input
                id="profilePicture"
                type="file"
              onChange={handleFileChange}
              />
              {profilePicture && (
                <img src={profilePicture} alt="Profile" style={{ maxWidth: '100px', marginTop: '10px' }} />
              )}
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                placeholder="Insert Bio"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="major">Major</label>
              <input
                id="major"
                type="text"
                placeholder="Insert Major"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setMajor(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="position">Position</label>
              <input
                id="position"
                type="text"
                placeholder="Insert Position"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="studyProgram">Study Program</label>
              <input
                id="studyProgram"
                type="text"
                placeholder="Insert Study Program"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setStudyProgram(e.target.value)}
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
