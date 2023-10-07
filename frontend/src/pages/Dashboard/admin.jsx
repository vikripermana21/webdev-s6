import React, { useState, useEffect } from "react";
import Topbar from "../../components/topbar";

const DashboardAdmin = () => {
  const [dosen, setDosen] = useState([]);
  const [accounts, setAccounts] = useState([]);

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
            setDosen(mergedData);
          })
          .catch((error) => console.error("Error:", error));
      })
      .catch((error) => console.error("Error:", error));
  }, []); // Efek ini hanya berjalan sekali saat komponen dimuat

  return (
    <div className="h-screen w-screen">
      <Topbar contentType="admin" />
      <div className="h-full flex flex-col items-center justify-center">
        <div className="max-w-md mb-5">
          <h1 className="text-5xl font-bold">List Dosen</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>ID Dosen</th>
                <th>NIP</th>
                <th>FullName</th>
                <th>Major</th>
                <th>Position</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
