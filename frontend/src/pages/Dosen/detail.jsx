import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Topbar from "../../components/topbar";

const DetailDosen = () => {
  const { dosenId } = useParams();

  const [dosen, setDosen] = useState({});
  const [eduHis, setEduHis] = useState([]);
  const [teachHis, setTeachHis] = useState([]);
  const [research, setResearch] = useState([]);
  const [pkm, setPKM] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  useEffect(() => {
    getListDosen();
    getListEducationHistory();
    getTeachingHistory();
    getListResearch();
    getListPKM();
  }, []);

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
        setEduHis(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTeachingHistory = () => {
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
        setTeachHis(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getListResearch = () => {
    fetch(`http://localhost:5000/research/${dosenId}`, {
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
    fetch(`http://localhost:5000/pkm/${dosenId}`, {
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

  return (
    <div>
      <Topbar />
      <div className="mt-14 w-screen h-screen flex">
        <div className="w-3/6 flex flex-col gap-3 items-center p-5">
          <div className="w-full rounded-md flex items-start p-6 border h-max ">
            <div className="mr-5">
              <img
                src={dosen.profile_picture}
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
            <div className="p-5 flex flex-col w-full">
              <div className="flex items-start">
                <button
                  onClick={() => setToggle(false)}
                  className={`w-full rounded-none rounded-l-md focus:outline-none ${
                    !toggle && "btn-primary"
                  }`}
                >
                  PKM
                </button>
                <button
                  onClick={() => setToggle(true)}
                  className={`w-full rounded-none rounded-r-md focus:outline-none ${
                    toggle && "btn-primary"
                  }`}
                >
                  Research
                </button>
              </div>
              <div className="flex mt-2 items-start">
                {toggle && (
                  <div className="flex flex-col gap-4">
                    {research.map((item) => (
                      <div className="flex flex-col items-start">
                        <p className="text-lg font-bold items-start">
                          {item.research_title}
                        </p>
                        <p className="">
                          Publication Date : {item.publication_date}
                        </p>
                        <a
                          href="{item.doi_link}"
                          className="fill-primary-content"
                        >
                          {item.doi_link}
                        </a>
                      </div>
                    ))}
                  </div>
                )}
                {!toggle && (
                  <div className="flex flex-col gap-4">
                    {pkm.map((item) => (
                      <div className="flex flex-col items-start">
                        <p className="text-left text-lg font-bold items-start">
                          {item.pkm_title}
                        </p>
                        <p className="">{item.pkm_year}</p>
                        <p className="">{item.partner_name}</p>
                        <p className="italic">
                          {showMore
                            ? item.description
                            : `${item.description.substring(0, 150)}...`}
                        </p>
                        <button
                          className="focus:outline-none inset-y-0 right-0"
                          onClick={toggleShowMore}
                        >
                          {showMore ? "Less" : "Read More"}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-3/6 flex flex-col gap-3 items-start p-5">
          <div className="w-full rounded-md flex flex-col items-start border relative">
            <h4 className="flex w-full text-lg font-bold p-5 rounded-none rounded-t-md bg-indigo-50">
              Bio
            </h4>
            <div className="p-5">
              <p className="italic">{dosen.bio}</p>
            </div>
          </div>
          <div className="w-full rounded-md flex flex-col items-start border h-max relative">
            <h4 className="flex w-full text-lg font-bold p-5 rounded-none rounded-t-md bg-indigo-50">
              Education History
            </h4>
            <div className="p-5 flex flex-col">
              {eduHis.map((item) => (
                <div className="flex flex-col items-start mb-4">
                  <div className="font-bold text-base">{item.degree}</div>
                  <div className="">{item.institution}</div>
                  <div className="">
                    Graduation Year :{" "}
                    {new Date(item.graduation_date).getFullYear()}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full rounded-md flex flex-col items-start border h-max relative">
            <h4 className="flex w-full text-lg font-bold p-5 rounded-none rounded-t-md bg-indigo-50">
              Teaching History
            </h4>
            <div className="p-5 flex flex-col">
              {teachHis.map((item) => (
                <div className="flex flex-col items-start mb-4">
                  <div className="font-bold text-base">{item.institution}</div>
                  <div className="">Position : {item.position}</div>
                  <div className="">
                    Teaching Period : {new Date(item.start_date).getFullYear()}{" "}
                    - {new Date(item.end_date).getFullYear()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailDosen;
