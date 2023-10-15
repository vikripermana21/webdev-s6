import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../../components/topbar";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

const DashboardAdmin = () => {
  const navigate = useNavigate();
  const [dosen, setDosen] = useState([]);

  useEffect(() => {
    // Mengambil data akun dosen dari endpoint /lecturer
    fetch("http://localhost:5000/lecturer")
      .then((response) => response.json())
      .then((lecturerData) => {
        // Mengambil data akun dari endpoint /accounts
        fetch("http://localhost:5000/accounts")
          .then((response) => response.json())
          .then((accountsData) => {
            // Gabungkan data berdasarkan id_user_account
            const mergedData = lecturerData.map((lecturer) => {
              const account = accountsData.find(
                (account) =>
                  account.id_user_account === lecturer.id_user_account
              );
              return {
                ...lecturer,
                nip: account ? account.nip : "Tidak Ditemukan",
              };
            });
            // Urutkan data berdasarkan id_dosen sebelum disimpan dalam state
            mergedData.sort((a, b) => a.id_dosen - b.id_dosen);
            setDosen(mergedData);
          })
          .catch((error) => console.error("Error:", error));
      })
      .catch((error) => console.error("Error:", error));
  }, []); // Efek ini hanya berjalan sekali saat komponen dimuat

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
                <button className="btn-sm pb-8 btn-primary hover:bg-primary-900 text-white font-bold">
                  Add Dosen
                </button>
              </div>
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th>ID Dosen</th>
                    <th>NIP</th>
                    <th>FullName</th>
                    <th>Major</th>
                    <th>Position</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Menampilkan data dosen */}
                  {dosen.map((d) => (
                    <tr key={d.id_dosen}>
                      <td>{d.id_dosen}</td>
                      <td>{d.nip}</td>
                      <td>{d.full_name}</td>
                      <td>{d.major}</td>
                      <td>{d.position}</td>
                      <td className="px-4 py-2">
                        {/* Tombol-tombol CRUD */}
                        <button
                          className="btn-primary hover:bg-primary-900 text-white font-bold py-2 px-4 mx-2 rounded"
                          onClick={() => navigate(`/updatedosen/${d.id_dosen}`)}
                        >
                          <FaRegEdit />
                        </button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded">
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
    </div>
  );
};

export default DashboardAdmin;
