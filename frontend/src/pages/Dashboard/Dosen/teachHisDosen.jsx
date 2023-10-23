import React, { useEffect, useState } from "react";
import Topbar from "../../../components/topbar";
import SideBar from "../../../components/sidebar";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import moment from "moment";
import { AiOutlinePlus } from "react-icons/ai";

const TeachingHisDosen = () => {
  const navigate = useNavigate();
  const dataAkun = JSON.parse(localStorage.getItem("infoAkun"));
  console.log(dataAkun);

  const [teachingHis, setTeachingHis] = useState([]);
  const [selectedTeachingHis, setSelectedTeachingHis] = useState(null);
  const [showAddTeachingHisModal, setShowAddTeachingHisModal] = useState(false);

  const [newTeachingHis, setNewTeachingHis] = useState({
    institution: "",
    position: "",
    start_date: "",
    end_date: "",
    id_dosen: "",
  });
  let rowNum = 1;

  const getListTeachHisDosen = () => {
    fetch(
      `http://localhost:5000/teaching-history/${dataAkun.profile_dosen.id_dosen}`,
      {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTeachingHis(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetch(`http://localhost:5000/login`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (!data.ok) {
          throw new Error("Gagal login");
        }
        // Set the infoAkun data
        setInfoAkun(data.infoAkun);
      })
      .catch((err) => {
        console.log(err);
      });
    if (dataAkun.role != "Dosen") {
      navigate("/");
    }
    getListTeachHisDosen();
  }, []);

  const showTeachingHisModal = (teachingData) => {
    setSelectedTeachingHis(teachingData);
    document.getElementById("my_modal_1").showModal();
  };

  const handleUpdateTeachingHis = () => {
    if (selectedTeachingHis) {
      // Lakukan permintaan fetch untuk mengirim pembaruan data ke server
      fetch(
        `http://localhost:5000/teaching-history/${selectedTeachingHis.id_teaching_history}`,
        {
          method: "PATCH", // Menggunakan metode PATCH untuk pembaruan data
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            institution: selectedTeachingHis.institution,
            position: selectedTeachingHis.position,
            end_date: moment(selectedTeachingHis.end_date).format("YYYY-MM-DD"),
            start_date: moment(selectedTeachingHis.start_date).format(
              "YYYY-MM-DD"
            ),
          }),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Gagal mengupdate data start dan end date");
          }
          // Jika berhasil diupdate, perbarui data teaching yang ditampilkan
          getListTeachHisDosen();
          // Tutup modal setelah berhasil dan selectedTeaching
          document.getElementById("my_modal_1").close();
          setSelectedTeachingHis(null); // Ubah menjadi null setelah berhasil
        })
        .catch((err) => {
          console.error("Gagal mengupdate data start dan end date:", err);
        });
    }
  };

  const handleAddTeachingHis = () => {
    // Lakukan permintaan fetch untuk menambahkan data teaching baru ke server
    fetch(`http://localhost:5000/teaching-history`, {
      method: "POST", // Menggunakan metode POST untuk menambahkan data
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newTeachingHis,
        id_dosen: dataAkun.profile_dosen.id_dosen,
        end_date: moment(newTeachingHis.end_date).format("YYYY-MM-DD"),
        start_date: moment(newTeachingHis.start_date).format("YYYY-MM-DD"),
      }), // Mengirim data teaching baru
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal menambahkan data teaching");
        }
        // Jika berhasil ditambahkan, perbarui data teaching yang ditampilkan
        getListTeachHisDosen();
        setNewTeachingHis({
          institution: "",
          position: "",
          start_date: "",
          end_date: "",
        });
        setShowAddTeachingHisModal(false);
      })
      .catch((err) => {
        console.error("Gagal menambahkan data teaching:", err);
      });
  };

  const handleDeleteTeachingHis = (id_teaching_history) => {
    // Lakukan permintaan fetch untuk menghapus data teaching dengan id_teaching_history tertentu
    fetch(`http://localhost:5000/teaching-history/${id_teaching_history}`, {
      method: "DELETE", // Menggunakan metode DELETE untuk menghapus data
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal menghapus data teaching");
        }
        // Jika berhasil dihapus, perbarui data teaching yang ditampilkan
        getListTeachHisDosen();
      })
      .catch((err) => {
        console.error("Gagal menghapus data teaching:", err);
      });
  };
  return (
    <div className="h-screen w-screen flex">
      <Topbar contentType="dosen" />
      <div className="w-1/4 flex flex-col gap-3 items-center">
        <SideBar />
      </div>
      <div className="w-3/4 flex flex-col gap-3 items-center p-5">
        <div className="mt-16 w-full">
          <div className="mb-5">
            <h4 className="text-5xl font-bold">Teaching History</h4>
            <div className="w-full mt-2">
              <div className="card card-compact bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="card-actions justify-end">
                    <button
                      className="w-fit btn-sm btn-primary hover:bg-primary-900 text-white font-bold rounded pb-7"
                      onClick={() => setShowAddTeachingHisModal(true)}
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
                            <th>Position</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Menampilkan data teaching */}
                          {teachingHis.map((item) => (
                            <tr key={item.id_teaching_history}>
                              <td>{rowNum++}</td>
                              <td>{item.institution}</td>
                              <td>{item.position}</td>
                              <td>{item.start_date}</td>
                              <td>{item.end_date}</td>
                              <td>
                                <div className="flex">
                                  <button
                                    className="btn-primary hover:bg-primary-900 text-white font-bold rounded mr-2"
                                    onClick={() => showTeachingHisModal(item)}
                                  >
                                    <FaRegEdit />
                                  </button>
                                  <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold rounded"
                                    onClick={() => {
                                      handleDeleteTeachingHis(
                                        item.id_teaching_history
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
      {/* Modal untuk update data teaching */}
      {selectedTeachingHis && (
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg pb-5">Update data Teaching</h3>
            <div className="form-control w-full">
              <label className="label">Institution</label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={selectedTeachingHis.institution}
                onChange={(e) =>
                  setSelectedTeachingHis({
                    ...selectedTeachingHis,
                    institution: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-control w-full">
              <label className="label">Position</label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={selectedTeachingHis.position}
                onChange={(e) =>
                  setSelectedTeachingHis({
                    ...selectedTeachingHis,
                    position: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-control w-full">
              <label className="label">Start Date</label>
              <input
                type="date"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={selectedTeachingHis.start_date}
                onChange={(e) =>
                  setSelectedTeachingHis({
                    ...selectedTeachingHis,
                    start_date: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-control w-full">
              <label className="label">End Date</label>
              <input
                type="date"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={selectedTeachingHis.end_date}
                onChange={(e) =>
                  setSelectedTeachingHis({
                    ...selectedTeachingHis,
                    end_date: e.target.value,
                  })
                }
              />
            </div>
            <div className="modal-action">
              <button
                className="btn mr-2"
                onClick={() => {
                  // Tutup modal dan selectedTeaching saat tombol Close diklik
                  document.getElementById("my_modal_1").close();
                  setSelectedTeachingHis(null); // Ubah menjadi null
                }}
              >
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={handleUpdateTeachingHis}
              >
                Save
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Modal untuk menambahkan data teaching */}
      {showAddTeachingHisModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-box">
            <h3 className="font-bold text-lg pb-5">Add Data Teaching</h3>
            <div className="form-control w-full">
              <label className="label">Institution</label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={newTeachingHis.institution}
                onChange={(e) =>
                  setNewTeachingHis({
                    ...newTeachingHis,
                    institution: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-control w-full">
              <label className="label">Position</label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={newTeachingHis.position}
                onChange={(e) =>
                  setNewTeachingHis({
                    ...newTeachingHis,
                    position: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-control w-full">
              <label className="label">Start Date</label>
              <input
                type="date"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={newTeachingHis.start_date}
                onChange={(e) =>
                  setNewTeachingHis({
                    ...newTeachingHis,
                    start_date: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-control w-full">
              <label className="label">End Date</label>
              <input
                type="date"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={newTeachingHis.end_date}
                onChange={(e) =>
                  setNewTeachingHis({
                    ...newTeachingHis,
                    end_date: e.target.value,
                  })
                }
              />
            </div>
            <div className="modal-action">
              <button
                className="btn mr-2"
                onClick={() => setShowAddTeachingHisModal(false)}
              >
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={handleAddTeachingHis}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeachingHisDosen;
