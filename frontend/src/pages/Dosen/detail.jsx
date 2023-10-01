import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BiSolidQuoteLeft, BiSolidQuoteRight } from "react-icons/bi";
import Topbar from "../../components/topbar";

const DetailDosen = () => {
  const { dosenId } = useParams();

  const [dosen, setDosen] = useState({});
  const [toggle, setToggle] = useState(false);
  const img =
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

  useEffect(() => {
    getListDosen();
  }, []);

  const eduTemp = [
    {
      institution: "Universitas Indonesia",
      degree: "S1 Computer Science",
      graduation_date: "2002-12-12 ",
    },
    {
      institution: "Universitas Indonesia",
      degree: "S2 Computer Science",
      graduation_date: "2012-12-12 ",
    },
    {
      institution: "Universitas Indonesia",
      degree: "S3 Computer Science",
      graduation_date: "2023-12-12 ",
    },
  ];

  const pkmTemp = [
    {
      pkm_title: "Ini PKM Title 1",
      pkm_year: "2023",
      partner_name: "Abdul Somad",
      description: "Ini deskripsi 1",
    },
    {
      pkm_title: "Ini PKM Title 1",
      pkm_year: "2023",
      partner_name: "Abdul Somad",
      description: "Ini deskripsi 1",
    },
    {
      pkm_title: "Ini PKM Title 1",
      pkm_year: "2023",
      partner_name: "Abdul Somad",
      description: "Ini deskripsi 1",
    },
    {
      pkm_title: "Ini PKM Title 1",
      pkm_year: "2023",
      partner_name: "Abdul Somad",
      description: "Ini deskripsi 1",
    },
    {
      pkm_title: "Ini PKM Title 1",
      pkm_year: "2023",
      partner_name: "Abdul Somad",
      description: "Ini deskripsi 1",
    },
  ];

  const getListDosen = () => {
    fetch(`http://localhost:5000/lecturer/${dosenId}`, {
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
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Topbar />
      <div className="mt-14 h-screen flex">
        <div className="w-3/5 flex flex-col gap-3 items-center p-5">
          <div className="w-full rounded-md flex items-start p-6 border h-max ">
            <div className=" mr-5">
              <img
                src={img}
                alt=""
                className="object-cover h-20 w-20 rounded-full"
              />
            </div>
            <div className="flex flex-col items-start">
              <p className="text-2xl font-bold">{dosen.full_name}</p>
              <p className="text-sm">{dosen.major}</p>
              <p className="text-sm">{dosen.position}</p>
            </div>
          </div>
          <div className="w-full rounded-md flex flex-col gap-10 items-start p-6 border h-max ">
            {eduTemp.map((item) => (
              <div className="flex flex-col items-start">
                <div className="font-bold text-xl">{item.degree}</div>
                <div className="">{item.institution}</div>
                <div className="">{item.graduation_date}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-2/5 flex flex-col gap-3 items-start p-5">
          <div className="w-full rounded-md flex flex-col items-start border relative">
            <div className="p-5">
              <p className="italic">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Egestas purus viverra accumsan in nisl nisi scelerisque. Aliquet
                nibh praesent tristique magna sit amet purus gravida quis.
                Convallis posuere morbi leo urna molestie at elementum. A
                scelerisque purus semper eget duis sit.
              </p>
            </div>
          </div>
          <div className="w-full rounded-md flex flex-col items-start border h-max relative">
            <div className="p-5 flex flex-col">
              <div>
                <button
                  onClick={() => setToggle(false)}
                  className={`rounded-none transition-all rounded-l-md ${
                    !toggle && "btn-primary"
                  }`}
                >
                  PKM
                </button>
                <button
                  onClick={() => setToggle(true)}
                  className={`rounded-none transition-all rounded-r-md ${
                    toggle && "btn-primary"
                  }`}
                >
                  Research
                </button>
              </div>
              <div className="flex mt-2">
                {toggle && <div>Ini Research</div>}
                {!toggle && (
                  <div className="flex flex-col gap-4">
                    {pkmTemp.map((item) => (
                      <div className="flex flex-col items-start">
                        <p className="text-xl font-bold">{item.pkm_title}</p>
                        <p className="">{item.pkm_year}</p>
                        <p className="">{item.partner_name}</p>
                        <p className="">{item.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailDosen;
