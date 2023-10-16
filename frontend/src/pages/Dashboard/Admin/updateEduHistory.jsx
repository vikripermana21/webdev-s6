import React, { useEffect, useState } from "react";
import Topbar from "../../../components/topbar";
import SideBar from "../../../components/sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import moment from "moment";
import { AiOutlinePlus } from "react-icons/ai";

const UpdateDataEducation = () => {
  const navigate = useNavigate();
  const dataAkun = JSON.parse(localStorage.getItem("infoAkun"));
  console.log(dataAkun);

  const { dosenId } = useParams();
  const [education, setEducation] = useState([]);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [showAddEducationModal, setShowAddEducationModal] = useState(false);

  const [newEducation, setNewEducation] = useState({
    institution: "",
    degree: "",
    graduation_date: "",
    id_dosen: "",
  });

  useEffect(() => {
    if (dataAkun.role != "Admin") {
      navigate("/");
    }
    getListEducationHistory();
  }, []);

  let rowNum = 1;

  const getListEducationHistory = () => {
    fetch(`http://localhost:5000/education-history/${dosenId}`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setEducation(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showEducationModal = (educationData) => {
    setSelectedEducation(educationData);
    document.getElementById("my_modal_1").showModal();
  };

  const handleUpdateEducation = () => {
    if (selectedEducation) {
      // Lakukan permintaan fetch untuk mengirim pembaruan data ke server
      fetch(
        `http://localhost:5000/education-history/${selectedEducation.id_education_history}`,
        {
          method: "PATCH", // Menggunakan metode PATCH untuk pembaruan data
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            institution: selectedEducation.institution,
            graduation_date: moment(selectedEducation.graduation_date).format(
              "YYYY-MM-DD"
            ),
            degree: selectedEducation.degree,
          }),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Gagal mengupdate data graduation");
          }
          // Jika berhasil diupdate, perbarui data education yang ditampilkan
          getListEducationHistory();
          // Tutup modal setelah berhasil dan selectedEducation
          document.getElementById("my_modal_1").close();
          setSelectedEducation(null); // Ubah menjadi null setelah berhasil
        })
        .catch((err) => {
          console.error("Gagal mengupdate data graduation:", err);
        });
    }
  };

  const handleAddEducation = () => {
    // Lakukan permintaan fetch untuk menambahkan data education baru ke server
    fetch(`http://localhost:5000/education-history`, {
      method: "POST", // Menggunakan metode POST untuk menambahkan data
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newEducation,
        id_dosen: dosenId,
        graduation_date: moment(newEducation.graduation_date).format(
          "YYYY-MM-DD"
        ),
      }), // Mengirim data education baru
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal menambahkan data education");
        }
        // Jika berhasil ditambahkan, perbarui data education yang ditampilkan
        getListEducationHistory();
        setNewEducation({
          institution: "",
          degree: "",
          graduation_date: "",
        }); // Kosongkan input setelah berhasil
      })
      .catch((err) => {
        console.error("Gagal menambahkan data education:", err);
      });
  };

  const handleDeleteEducation = (id_education_history) => {
    // Lakukan permintaan fetch untuk menghapus data education dengan id_education_history tertentu
    fetch(`http://localhost:5000/education-history/${id_education_history}`, {
      method: "DELETE", // Menggunakan metode DELETE untuk menghapus data
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal menghapus data education");
        }
        // Jika berhasil dihapus, perbarui data education yang ditampilkan
        getListEducationHistory();
      })
      .catch((err) => {
        console.error("Gagal menghapus data education:", err);
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
          <div className="mb-5">
            <h4 className="text-5xl font-bold">Education History</h4>
            <div className="w-full mt-2">
              <div className="card card-compact bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="card-actions justify-end">
                    <button
                      className="w-fit btn-sm btn-primary hover:bg-primary-900 text-white font-bold rounded pb-7"
                      onClick={() => setShowAddEducationModal(true)}
                    >
                      Add Data
                    </button>
                  </div>

                  <div className="p-5 w-full">
                    <div className="overflow-x-auto">
                      <table className="table table-zebra">
                        {/* head */}
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Institution</th>
                            <th>Degree Date</th>
                            <th>Graduation Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Menampilkan data education */}
                          {education.map((item) => (
                            <tr key={item.id_education_history}>
                              <td>{rowNum++}</td>
                              <td>{item.institution}</td>
                              <td>{item.degree}</td>
                              <td>{item.graduation_date}</td>
                              <td>
                                <div className="flex">
                                  <button
                                    className="btn-primary hover:bg-primary-900 text-white font-bold rounded mr-2"
                                    onClick={() => showEducationModal(item)}
                                  >
                                    <FaRegEdit />
                                  </button>
                                  <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold rounded"
                                    onClick={() => {
                                      handleDeleteEducation(
                                        item.id_education_history
                                      );
                                    }}
                                  >
                                    <RiDeleteBin5Line />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal untuk update data Education */}
      {selectedEducation && (
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg pb-5">Update data Education</h3>
            <div className="form-control w-full">
              <label className="label">Institution</label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={selectedEducation.institution}
                onChange={(e) =>
                  setSelectedEducation({
                    ...selectedEducation,
                    institution: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-control w-full">
              <label className="label">Graduation Date</label>
              <input
                type="date"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={selectedEducation.graduation_date}
                onChange={(e) =>
                  setSelectedEducation({
                    ...selectedEducation,
                    graduation_date: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-control w-full">
              <label className="label">Degree</label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={selectedEducation.degree}
                onChange={(e) =>
                  setSelectedEducation({
                    ...selectedEducation,
                    degree: e.target.value,
                  })
                }
              />
            </div>
            <div className="modal-action">
              <button
                className="btn mr-2"
                onClick={() => {
                  // Tutup modal dan selectedEducation saat tombol Close diklik
                  document.getElementById("my_modal_1").close();
                  setSelectedEducation(null); // Ubah menjadi null
                }}
              >
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={handleUpdateEducation}
              >
                Save
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Modal untuk menambahkan data education */}
      {showAddEducationModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-box">
            <h3 className="font-bold text-lg pb-5">Add Data Education</h3>
            <div className="form-control w-full">
              <label className="label">Institution</label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={newEducation.institution}
                onChange={(e) =>
                  setNewEducation({
                    ...newEducation,
                    institution: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-control w-full">
              <label className="label">Graduation Date</label>
              <input
                type="date"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={newEducation.graduation_date}
                onChange={(e) =>
                  setNewEducation({
                    ...newEducation,
                    graduation_date: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-control w-full">
              <label className="label">Degree</label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={newEducation.degree}
                onChange={(e) =>
                  setNewEducation({
                    ...newEducation,
                    degree: e.target.value,
                  })
                }
              />
            </div>
            <div className="modal-action">
              <button
                className="btn mr-2"
                onClick={() => setShowAddEducationModal(false)}
              >
                Close
              </button>
              <button className="btn btn-primary" onClick={handleAddEducation}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateDataEducation;
