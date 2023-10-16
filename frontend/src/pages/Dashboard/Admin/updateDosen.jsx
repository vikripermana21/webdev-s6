import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Topbar from "../../../components/topbar";
import SideBar from "../../../components/sidebar";

const UpdateDataDosen = () => {
  const dataAkun = JSON.parse(localStorage.getItem("infoAkun"));
  const { dosenId } = useParams();
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
    id_dosen: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dataAkun.role != "Admin") {
      navigate("/");
    }
    fetchData();
  }, [dosenId]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/lecturer/${dosenId}`);
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
    // Periksa apakah data profil sudah ada
    if (formData.id_dosen) {
      // Data profil sudah ada, lakukan pembaruan
      fetch(`http://localhost:5000/lecturer/${dosenId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
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
        <div className="mt-16 w-full">
          <div className="w-full mb-5">
            <h4 className="text-5xl font-bold">Profile Dosen</h4>
          </div>
          <div className="card card-compact bg-base-100 shadow-xl ">
            <div className="overflow-x-auto">
              <table className="table">
                <tbody>
                  {/* row 1 */}
                  <tr>
                    <th className="text-base">Full name</th>
                    <td className="text-base">
                      <input
                        type="text"
                        id="full_name"
                        className="border rounded p-2 w-full"
                        value={formData.full_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            full_name: e.target.value,
                          })
                        }
                      />
                    </td>
                  </tr>
                  {/* row 2 */}
                  <tr>
                    <th className="text-base">Profile Picture</th>
                    <td className="text-base">
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
                    </td>
                  </tr>
                  {/* row 3 */}
                  <tr>
                    <th className="text-base">Bio</th>
                    <td className="text-base">
                      <textarea
                        id="bio"
                        type="textarea"
                        rows="4"
                        className="border rounded p-2 w-full"
                        value={formData.bio}
                        onChange={(e) =>
                          setFormData({ ...formData, bio: e.target.value })
                        }
                      />
                    </td>
                  </tr>
                  {/* row 4 */}
                  <tr>
                    <th className="text-base">Major</th>
                    <td className="text-base">
                      <input
                        id="major"
                        type="text"
                        className="border rounded p-2 w-full"
                        value={formData.major}
                        onChange={(e) =>
                          setFormData({ ...formData, major: e.target.value })
                        }
                      />
                    </td>
                  </tr>
                  {/* row 5 */}
                  <tr>
                    <th className="text-base">Position</th>
                    <td className="text-base">
                      <input
                        id="position"
                        type="text"
                        className="border rounded p-2 w-full"
                        value={formData.position}
                        onChange={(e) =>
                          setFormData({ ...formData, position: e.target.value })
                        }
                      />
                    </td>
                  </tr>
                  {/* row 6 */}
                  <tr>
                    <th className="text-base">Study Program</th>
                    <td className="text-base">
                      {" "}
                      <input
                        id="study_program"
                        type="text"
                        className="border rounded p-2 w-full"
                        value={formData.study_program}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            study_program: e.target.value,
                          })
                        }
                      />
                    </td>
                  </tr>
                  {/* row 7 */}
                  <tr>
                    <th className="text-base">Place Of Birth</th>
                    <td className="text-base">
                      {" "}
                      <input
                        id="place_of_birth"
                        type="text"
                        className="border rounded p-2 w-full"
                        value={formData.place_of_birth}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            place_of_birth: e.target.value,
                          })
                        }
                      />
                    </td>
                  </tr>
                  {/* row 8 */}
                  <tr>
                    <th className="text-base">Date Of Birth</th>
                    <td className="text-base">
                      <input
                        id="date_of_birth"
                        type="date"
                        className="border rounded p-2 w-full"
                        value={formData.date_of_birth}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            date_of_birth: e.target.value,
                          })
                        }
                      />
                    </td>
                  </tr>
                  {/* row 9 */}
                  <tr>
                    <th className="text-base">Gender</th>
                    <td className="text-base">
                      {" "}
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
                    </td>
                  </tr>
                  {/* row 10 */}
                  <tr>
                    <th className="text-base">Email</th>
                    <td className="text-base">
                      <input
                        id="email"
                        type="email"
                        className="border rounded p-2 w-full"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="card-actions justify-end items-center mt-2">
                <button
                  type="button"
                  onClick={handleFormSubmit}
                  className="btn btn-sm btn-primary w-44"
                  disabled={loading}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateDataDosen;
