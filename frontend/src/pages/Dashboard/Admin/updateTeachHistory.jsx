import React, { useEffect, useState } from "react";
import Topbar from "../../../components/topbar";
import SideBar from "../../../components/sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import moment from "moment";
import { AiOutlinePlus } from "react-icons/ai";

const UpdateDataTeach = () => {
  const navigate = useNavigate();
  const dataAkun = JSON.parse(localStorage.getItem("infoAkun"));
  console.log(dataAkun);

  const { dosenId } = useParams();
  const [teaching, setTeaching] = useState([]);
  const [selectedTeaching, setSelectedTeaching] = useState(null);
  const [showAddTeachingModal, setShowAddTeachingModal] = useState(false);

  const [newTeaching, setNewTeaching] = useState({
    institution: "",
    position: "",
    start_date: "",
    end_date: "",
    id_dosen: "",
  });

  useEffect(() => {
    if (dataAkun.role != "Admin") {
      navigate("/");
    }
    getListTeachingHistory();
  }, []);

  let rowNum = 1;

  const getListTeachingHistory = () => {
    fetch(`http://localhost:5000/teaching-history/${dosenId}`, {
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
        setTeaching(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showTeachingModal = (teachingData) => {
    setSelectedTeaching(teachingData);
    document.getElementById("my_modal_1").showModal();
  };

  const handleUpdateTeaching = () => {
    if (selectedTeaching) {
      // Lakukan permintaan fetch untuk mengirim pembaruan data ke server
      fetch(
        `http://localhost:5000/teaching-history/${selectedTeaching.id_teaching_history}`,
        {
          method: "PATCH", // Menggunakan metode PATCH untuk pembaruan data
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            institution: selectedTeaching.institution,
            position: selectedTeaching.position,
            end_date: moment(selectedTeaching.end_date).format("YYYY-MM-DD"),
            start_date: moment(selectedTeaching.start_date).format(
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
          getListTeachingHistory();
          // Tutup modal setelah berhasil dan selectedTeaching
          document.getElementById("my_modal_1").close();
          setSelectedTeaching(null); // Ubah menjadi null setelah berhasil
        })
        .catch((err) => {
          console.error("Gagal mengupdate data start dan end date:", err);
        });
    }
  };

  const handleAddTeaching = () => {
    // Lakukan permintaan fetch untuk menambahkan data teaching baru ke server
    fetch(`http://localhost:5000/teaching-history`, {
      method: "POST", // Menggunakan metode POST untuk menambahkan data
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newTeaching,
        id_dosen: dosenId,
        end_date: moment(newTeaching.end_date).format("YYYY-MM-DD"),
        start_date: moment(newTeaching.start_date).format("YYYY-MM-DD"),
      }), // Mengirim data teaching baru
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal menambahkan data teaching");
        }
        // Jika berhasil ditambahkan, perbarui data teaching yang ditampilkan
        getListTeachingHistory();
        setNewTeaching({
          institution: "",
          position: "",
          start_date: "",
          end_date: "",
        }); // Kosongkan input setelah berhasil
      })
      .catch((err) => {
        console.error("Gagal menambahkan data teaching:", err);
      });
  };

  const handleDeleteTeaching = (id_teaching_history) => {
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
        getListTeachingHistory();
      })
      .catch((err) => {
        console.error("Gagal menghapus data teaching:", err);
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
            <h4 className="text-5xl font-bold">Teaching History</h4>
            <div className="w-full mt-2">
              <div className="card card-compact bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="card-actions justify-end">
                    <button
                      className="w-fit btn-sm btn-primary hover:bg-primary-900 text-white font-bold rounded pb-7"
                      onClick={() => setShowAddTeachingModal(true)}
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
                          {teaching.map((item) => (
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
                                    onClick={() => showTeachingModal(item)}
                                  >
                                    <FaRegEdit />
                                  </button>
                                  <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold rounded"
                                    onClick={() => {
                                      handleDeleteTeaching(
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
      {selectedTeaching && (
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg pb-5">Update data Teaching</h3>
            <div className="form-control w-full">
              <label className="label">Institution</label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={selectedTeaching.institution}
                onChange={(e) =>
                  setSelectedTeaching({
                    ...selectedTeaching,
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
                value={selectedTeaching.position}
                onChange={(e) =>
                  setSelectedTeaching({
                    ...selectedTeaching,
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
                value={selectedTeaching.start_date}
                onChange={(e) =>
                  setSelectedTeaching({
                    ...selectedTeaching,
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
                value={selectedTeaching.end_date}
                onChange={(e) =>
                  setSelectedTeaching({
                    ...selectedTeaching,
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
                  setSelectedTeaching(null); // Ubah menjadi null
                }}
              >
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={handleUpdateTeaching}
              >
                Save
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Modal untuk menambahkan data teaching */}
      {showAddTeachingModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-box">
            <h3 className="font-bold text-lg pb-5">Add Data Teaching</h3>
            <div className="form-control w-full">
              <label className="label">Institution</label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={newTeaching.institution}
                onChange={(e) =>
                  setNewTeaching({
                    ...newTeaching,
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
                value={newTeaching.position}
                onChange={(e) =>
                  setNewTeaching({
                    ...newTeaching,
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
                value={newTeaching.start_date}
                onChange={(e) =>
                  setNewTeaching({
                    ...newTeaching,
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
                value={newTeaching.end_date}
                onChange={(e) =>
                  setNewTeaching({
                    ...newTeaching,
                    end_date: e.target.value,
                  })
                }
              />
            </div>
            <div className="modal-action">
              <button
                className="btn mr-2"
                onClick={() => setShowAddTeachingModal(false)}
              >
                Close
              </button>
              <button className="btn btn-primary" onClick={handleAddTeaching}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateDataTeach;
