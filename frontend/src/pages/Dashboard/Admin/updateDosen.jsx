import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Topbar from "../../../components/topbar";
import SideBar from "../../../components/sidebar";

const UpdateDataDosen = () => {
  // console.log(props);
  const dataAkun = JSON.parse(localStorage.getItem("infoAkun"));
  // console.log(dataAkun);
  const { dosenId } = useParams();
  // console.log(dosenId);
  const dataDosen = JSON.parse(localStorage.getItem("idDosen"));
  console.log(dataDosen);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    place_of_birth: "",
    date_of_birth: "",
    gender: "Laki-Laki",
    email: "",
    profile_picture: "",
    bio: "",
    major: "",
    position: "",
    study_program: "",
    id_user_account: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dataAkun.role != "Admin") {
      navigate("/");
    }
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/lecturer/${dosenId}`
        );
        if (response.ok) {
          const data = await response.json();
          setFormData(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dosenId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profile_picture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = () => {
    // Validasi data sebelum pengiriman
    if (!formData.full_name || !formData.email) {
      console.error("Full Name and Email are required.");
      return;
    }

    // Periksa apakah data profil sudah ada
    if (formData.id) {
      // Data profil sudah ada, lakukan pembaruan
      fetch(`http://localhost:5000/lecturer/${dosenId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          id_user_account: dosenId,
        }),
      })
        .then((response) => {
          if (response.ok) {
            console.log("Dosen data updated successfully!");
            navigate("/dashboard/admin");
          } else {
            console.error("Error updating Dosen data");
          }
        })
        .catch((error) => {
          console.error("Error updating Dosen data:", error);
        });
    } else {
      // Data profil belum ada, lakukan penambahan
      handleAddProfile(formData);
    }
  };

  const handleAddProfile = (data) => {
    fetch("http://localhost:5000/lecturer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        id_user_account: dataDosen,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Dosen data added successfully!");
          navigate("/dashboard/admin");
        } else {
          console.error("Error adding Dosen data");
        }
      })
      .catch((error) => {
        console.error("Error adding Dosen data:", error);
      });
  };

  return (
    <div className="h-screen w-screen flex">
      <Topbar contentType="admin" />
      <div className="w-1/4 flex flex-col gap-3 items-center">
        <SideBar contentType="admin" />
      </div>
      <div className="w-3/4 flex flex-col gap-3 items-center p-5">
        <div className="mt-16">
          <div className="max-w-md mb-5">
            <h4 className="text-5xl font-bold">Profile Dosen</h4>
          </div>
          <div className="card-body">
            <div className="flex flex-col items-start">
              <label htmlFor="full_name">Full Name</label>
              <input
                type="text"
                id="full_name"
                className="border rounded p-2 w-full"
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="profile_picture">Profile Picture</label>
              <input
                id="profile_picture"
                type="file"
                className="border rounded p-2 w-full"
                onChange={handleFileChange}
              />
              {formData.profile_picture && (
                <img
                  src={formData.profile_picture}
                  alt="Profile"
                  style={{ maxWidth: "100px", marginTop: "10px" }}
                />
              )}
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="bio">Bio</label>
              <input
                id="bio"
                type="text"
                className="border rounded p-2 w-full"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="major">Major</label>
              <input
                id="major"
                type="text"
                className="border rounded p-2 w-full"
                value={formData.major}
                onChange={(e) =>
                  setFormData({ ...formData, major: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="position">Position</label>
              <input
                id="position"
                type="text"
                className="border rounded p-2 w-full"
                value={formData.position}
                onChange={(e) =>
                  setFormData({ ...formData, position: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="study_program">Study Program</label>
              <input
                id="study_program"
                type="text"
                className="border rounded p-2 w-full"
                value={formData.study_program}
                onChange={(e) =>
                  setFormData({ ...formData, study_program: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="place_of_birth">Place of Birth</label>
              <input
                id="place_of_birth"
                type="text"
                className="border rounded p-2 w-full"
                value={formData.place_of_birth}
                onChange={(e) =>
                  setFormData({ ...formData, place_of_birth: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="date_of_birth">Date of Birth</label>
              <input
                id="date_of_birth"
                type="date"
                className="border rounded p-2 w-full"
                value={formData.date_of_birth}
                onChange={(e) =>
                  setFormData({ ...formData, date_of_birth: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                className="border rounded p-2 w-full"
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
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
                className="border rounded p-2 w-full"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            {/* ... Form Input Fields ... */}
            <div className="card-actions justify-between mt-2">
              <button
                type="button"
                onClick={() => navigate("/dashboard/admin")}
                className="btn btn-sm"
              >
                <BiArrowBack /> Back
              </button>
              <button
                type="button"
                onClick={handleFormSubmit}
                className="btn btn-sm btn-primary"
                disabled={loading}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateDataDosen;
