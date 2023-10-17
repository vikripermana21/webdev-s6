import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Topbar from "../../components/topbar";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

const DashboardAdmin = () => {
  const navigate = useNavigate();

  const dataAkun = JSON.parse(localStorage.getItem("infoAkun"));

  const [dosen, setDosen] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false); // Untuk mengelola status modal
  const [newDosenData, setNewDosenData] = useState({ nip: "", password: "" }); // State input

  useEffect(() => {
    if (dataAkun.role != "Admin") {
      navigate("/");
    }
    getListDosen();
  }, []); // Efek ini hanya berjalan sekali saat komponen dimuat

  const getListDosen = () => {
    fetch("http://localhost:5000/lecturer")
      .then((response) => response.json())
      .then((lecturerData) => {
        fetch("http://localhost:5000/accounts")
          .then((response) => response.json())
          .then((accountsData) => {
            const lecturerMap = new Map(
              lecturerData.map((lecturer) => [
                lecturer.id_user_account,
                lecturer,
              ])
            );

            // Filter hanya data dengan role "Dosen"
            const dosenData = accountsData.filter(
              (account) => account.role === "Dosen"
            );

            const mergedData = dosenData.map((account) => {
              const lecturer = lecturerMap.get(account.id_user_account);
              if (lecturer) {
                return {
                  ...lecturer,
                  nip: account.nip,
                };
              } else {
                // Jika akun tidak memiliki profil, tambahkan data minimal
                return {
                  id_user_account: account.id_user_account,
                  nip: account.nip,
                  full_name: "Not Found",
                  major: "Not Found",
                  position: "Not Found",
                };
              }
            });

            setDosen(mergedData);
          })
          .catch((error) => console.error("Error:", error));
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleAddDosen = () => {
    // Lakukan permintaan fetch untuk menambahkan data PKM baru ke server
    fetch(`http://localhost:5000/account`, {
      method: "POST", // Menggunakan metode POST untuk menambahkan data
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newDosenData,
      }), // Mengirim data baru
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal menambahkan data dosen");
        }
        // Jika berhasil ditambahkan, perbarui data dosen yang ditampilkan
        getListDosen();
        setNewDosenData({
          nip: "",
          password: "",
        });
        setModalOpen(false);
      })
      .catch((err) => {
        console.error("Gagal menambahkan data dosen:", err);
      });
  };

  const handleDeleteAccount = (id) => {
    // Konfirmasi sebelum menghapus
    if (window.confirm("Anda yakin ingin menghapus data ini?")) {
      fetch(`http://localhost:5000/accounts/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            console.log("Dosen data deleted successfully!");
            // Perbarui data dosen setelah penghapusan
            getListDosen();
          } else {
            console.error("Error deleting Dosen data");
          }
        })
        .catch((error) => {
          console.error("Error deleting Dosen data:", error);
        });
    }
  };

  let rowNum = 1;

  return (
    <div className="h-screen w-screen flex">
      <Topbar contentType="admin" />
      <div className="w-screen gap-3 items-center">
        <div className="mt-16">
          <div className="m-8">
            <h1 className="text-5xl font-bold">List Dosen</h1>
          </div>
          <div className="flex justify-center">
            <div className="overflow-x-auto">
              <div className="flex justify-end items-end m-3">
                <button
                  className="btn-sm pb-8 btn-primary hover:bg-primary-900 text-white font-bold"
                  onClick={() => setModalOpen(true)}
                >
                  Add Dosen
                </button>
              </div>
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>NIP</th>
                    <th>Full Name</th>
                    <th>Major</th>
                    <th>Position</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Menampilkan data dosen */}
                  {dosen.map((d) => (
                    <tr key={d.id_dosen}>
                      <td>{rowNum++}</td>
                      <td>{d.nip}</td>
                      <td>{d.full_name}</td>
                      <td>{d.major}</td>
                      <td>{d.position}</td>
                      <td className="px-4 py-2">
                        {/* Tombol-tombol CRUD */}
                        <button
                          className="btn-primary hover:bg-primary-900 text-white font-bold py-2 px-4 mx-2 rounded"
                          onClick={() => {
                            // Mengirim parameter ke halaman berikutnya
                            localStorage.setItem("idDosen", d.id_user_account);
                            navigate(`/updatedosen/${d.id_dosen}`);
                          }}
                        >
                          <FaRegEdit />
                        </button>
                        <button
                          className="bg-red-500 hover.bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded"
                          onClick={() => {
                            handleDeleteAccount(d.id_user_account);
                          }}
                        >
                          <RiDeleteBin5Line />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal untuk menambahkan Dosen */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg pb-5">Add Dosen</h3>
              <div className="form-control w-full">
                <label className="label">NIP</label>
                <input
                  type="text"
                  placeholder="NIP"
                  className="input input-bordered w-full"
                  value={newDosenData.nip}
                  onChange={(e) =>
                    setNewDosenData({ ...newDosenData, nip: e.target.value })
                  }
                />
              </div>
              <div className="form-control w-full">
                <label className="label">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered w-full"
                  value={newDosenData.password}
                  onChange={(e) =>
                    setNewDosenData({
                      ...newDosenData,
                      password: e.target.value,
                    })
                  }
                />
              </div>
              <div className="modal-action">
                <button
                  className="btn mr-2"
                  onClick={() => setModalOpen(false)} // Tutup modal
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleAddDosen} // Tambahkan fungsi untuk menambah Dosen
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardAdmin;
