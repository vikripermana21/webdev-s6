import React, { useEffect, useState } from "react";
import Topbar from "../../../components/topbar";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import moment from "moment";

const DashboardDosen = () => {
  const dataAkun = JSON.parse(localStorage.getItem("infoAkun"));
  console.log(dataAkun);
  let navigate = useNavigate();

  const [dosen, setDosen] = useState({});
  const [eduHis, setEduHis] = useState([]);
  const [teachHis, setTeachHis] = useState([]);
  const [research, setResearch] = useState([]);
  const [pkm, setPKM] = useState([]);
  const [selectedResearch, setSelectedResearch] = useState(null); // Menyimpan data research yang dipilih
  const [selectedPKM, setSelectedPKM] = useState(null);
  // State untuk mengontrol modal tambah data research
  const [showAddResearchModal, setShowAddResearchModal] = useState(false);

  // State untuk menyimpan data baru yang akan ditambahkan
  const [newResearch, setNewResearch] = useState({
    research_title: "",
    publication_date: "",
    doi_link: "",
    id_dosen: "",
  });

  const [newPKM, setNewPKM] = useState({
    pkm_title: "",
    pkm_year: "",
    partner_name: "",
    description: "",
  });

  // State untuk mengontrol modal tambah data PKM
  const [showAddPKMModal, setShowAddPKMModal] = useState(false);

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
    getListDosen();
    getListEducationHistory();
    getTeachingHistory();
    getListResearch();
    getListPKM();
  }, []);

  const getListDosen = () => {
    fetch(`http://localhost:5000/lecturer/${dataAkun.id_user_account}`, {
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
        setDosen(data);
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getListEducationHistory = () => {
    fetch(
      `http://localhost:5000/education-history/${dataAkun.id_user_account}`,
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
        setEduHis(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTeachingHistory = () => {
    fetch(
      `http://localhost:5000/teaching-history/${dataAkun.id_user_account}`,
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
        setTeachHis(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getListResearch = () => {
    fetch(`http://localhost:5000/research/${dataAkun.id_user_account}`, {
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
        setResearch(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getListPKM = () => {
    fetch(`http://localhost:5000/pkm/${dataAkun.id_user_account}`, {
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
        setPKM(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteResearch = (id_research) => {
    // Lakukan permintaan fetch untuk menghapus data research dengan id_research tertentu
    fetch(`http://localhost:5000/research/${id_research}`, {
      method: "DELETE", // Menggunakan metode DELETE untuk menghapus data
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal menghapus data research");
        }
        // Jika berhasil dihapus, perbarui data research yang ditampilkan
        getListResearch();
      })
      .catch((err) => {
        console.error("Gagal menghapus data research:", err);
      });
  };

  const handleDeletePKM = (id_pkm) => {
    // Lakukan permintaan fetch untuk menghapus data PKM dengan id_pkm tertentu
    fetch(`http://localhost:5000/pkm/${id_pkm}`, {
      method: "DELETE", // Menggunakan metode DELETE untuk menghapus data
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal menghapus data PKM");
        }
        // Jika berhasil dihapus, perbarui data PKM yang ditampilkan
        getListPKM();
      })
      .catch((err) => {
        console.error("Gagal menghapus data PKM:", err);
      });
  };

  const handleUpdateResearch = () => {
    if (selectedResearch) {
      // Lakukan permintaan fetch untuk mengirim pembaruan data research ke server
      fetch(`http://localhost:5000/research/${selectedResearch.id_research}`, {
        method: "PATCH", // Menggunakan metode PUT untuk pembaruan data
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...selectedResearch,
          publication_date: moment(selectedResearch.publication_date).format(
            "YYYY-MM-DD"
          ),
        }), // Mengirim data research baru
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Gagal mengupdate data research");
          }
          // Jika berhasil diupdate, perbarui data research yang ditampilkan
          getListResearch();
          setSelectedResearch(null); // Tutup modal setelah berhasil
        })
        .catch((err) => {
          console.error("Gagal mengupdate data research:", err);
        });
    }
  };

  const handleUpdatePKM = () => {
    if (selectedPKM) {
      // Lakukan permintaan fetch untuk mengirim pembaruan data PKM ke server
      fetch(`http://localhost:5000/pkm/${selectedPKM.id_pkm}`, {
        method: "PATCH", // Menggunakan metode PUT untuk pembaruan data
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...selectedPKM,
          pkm_year: moment(selectedPKM.pkm_year).format("YYYY-MM-DD"),
        }), // Mengirim data research baru
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Gagal mengupdate data PKM");
          }
          // Jika berhasil diupdate, perbarui data PKM yang ditampilkan
          getListPKM();
          setSelectedPKM(null); // Tutup modal setelah berhasil
        })
        .catch((err) => {
          console.error("Gagal mengupdate data PKM:", err);
        });
    }
  };

  // Fungsi untuk menampilkan form update data Research
  const showResearchModal = (researchData) => {
    setSelectedResearch(researchData); // Menyimpan data research yang dipilih
    document.getElementById("my_modal_1").showModal();
  };

  // Fungsi untuk menampilkan form update data PKM
  const showPKMModal = (pkmData) => {
    setSelectedPKM(pkmData); // Menyimpan data PKM yang dipilih
    document.getElementById("my_modal_2").showModal();
  };

  let rowNum = 1;
  let rowNum2 = 1;

  // Fungsi untuk menambahkan data research baru
  const handleAddResearch = () => {
    // Lakukan permintaan fetch untuk menambahkan data research baru ke server
    fetch(`http://localhost:5000/research`, {
      method: "POST", // Menggunakan metode POST untuk menambahkan data
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newResearch,
        id_dosen: dataAkun.id_user_account,
        publication_date: moment(newResearch.publication_date).format(
          "YYYY-MM-DD"
        ),
      }), // Mengirim data research baru
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal menambahkan data research");
        }
        // Jika berhasil ditambahkan, perbarui data research yang ditampilkan
        getListResearch();
        setNewResearch({
          research_title: "",
          publication_date: "",
          doi_link: "",
        }); // Kosongkan input setelah berhasil
      })
      .catch((err) => {
        console.error("Gagal menambahkan data research:", err);
      });
  };

  // Fungsi untuk menambahkan data PKM baru
  const handleAddPKM = () => {
    // Lakukan permintaan fetch untuk menambahkan data PKM baru ke server
    fetch(`http://localhost:5000/pkm`, {
      method: "POST", // Menggunakan metode POST untuk menambahkan data
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newPKM,
        id_dosen: dataAkun.id_user_account,
        pkm_year: moment(newPKM.pkm_year).format("YYYY-MM-DD"),
      }), // Mengirim data PKM baru
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal menambahkan data PKM");
        }
        // Jika berhasil ditambahkan, perbarui data PKM yang ditampilkan
        getListPKM();
        setNewPKM({
          pkm_title: "",
          pkm_year: "",
          partner_name: "",
          description: "",
        }); // Kosongkan input setelah berhasil
      })
      .catch((err) => {
        console.error("Gagal menambahkan data PKM:", err);
      });
  };

  return (
    <div>
      <Topbar contentType="admin" />
      <div>
        <div className="mt-16 h-screen flex">
          <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex items-center justify-center">
              {/* Page content here */}
              {/* Tambahkan elemen div untuk menampilkan teks samping drawer */}
              <div className="text-center p-4">
                <label
                  htmlFor="my-drawer-2"
                  className="btn btn-primary drawer-button lg:hidden"
                >
                  Open drawer
                </label>
                <div>
                  <h1>Welcome back!</h1>
                </div>
              </div>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer-2"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu p-4 w-80 h-screen bg-base-200 text-base-content">
                {/* Sidebar content here */}
                <li>
                  <button onClick={navigate(`/dashboard/dosen/research`)}>
                    Research
                  </button>
                </li>
                <li>
                  <a>Sidebar Item 2</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDosen;
