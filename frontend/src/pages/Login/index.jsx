import React, { useEffect, useState } from "react";
import Topbar from "../../components/topbar";
import { Link, useNavigate } from "react-router-dom";
import {
  BiArrowBack,
  BiArrowFromLeft,
  BiArrowFromRight,
  BiArrowToLeft,
  BiArrowToRight,
  BiCircleQuarter,
  BiLeftArrow,
} from "react-icons/bi";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useAnimate,
} from "framer-motion";
import { BsCircleFill } from "react-icons/bs";
import {
  PiCheck,
  PiCircleNotchLight,
  PiCirclesThreeThin,
} from "react-icons/pi";

const Login = () => {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [refBtn, animateBtn] = useAnimate();
  const [nip, setNip] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);

  useEffect(() => {
    if (!isLoading && !isSuccess) {
      animateBtn(refBtn.current, { background: "#000", borderColor: "#000" });
    } else if (!isLoading && isSuccess) {
      animateBtn(refBtn.current, {
        background: "#45C421",
        borderColor: "#45C421",
        x: 0,
        borderTopRightRadius: "0px",
        borderBottomRightRadius: "0px",
      });
      setTimeout(() => {
        animateBtn(refBtn.current, {
          x: 0,
        });
      }, 2000);
    } else {
      animateBtn(refBtn.current, {
        background: "#ddd",
        borderColor: "#ddd",
        borderRadius: "100%",
      });
    }
  }, [isLoading]);

  const submitLogin = () => {
    setIsLoading(!isLoading);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
    // fetch("http://localhost:5000/login", {
    //   method: "post",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     nip: nip,
    //     password: password,
    //   }),
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! Status: ${response.status}`);
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     localStorage.setItem("infoAkun", JSON.stringify(data.infoAkun));
    //     if (data.infoAkun.role === "Admin") {
    //       localStorage.setItem("userRole", "Admin");
    //       navigate("/dashboard/admin");
    //     } else if (data.infoAkun.role === "Dosen") {
    //       localStorage.setItem("userRole", "Dosen");
    //       navigate("/dashboard/dosen");
    //     } else {
    //       console.log("Peran pengguna tidak valid:", data.role);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     // Menampilkan pesan kesalahan dengan menggunakan alert
    //     alert("Login failed. Please check your credentials.");
    //     // Mengatur pesan kesalahan pada state untuk merubah tampilan input
    //     setLoginError("Invalid credentials");
    //   });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      submitLogin();
    }
  };

  return (
    <div className="h-screen w-screen">
      <div className="w-full h-[10%] px-10 flex items-center justify-between">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
          }}
          className="text-2xl"
        >
          The Lecturer.
        </motion.p>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
          }}
          className="btn btn-circle"
          onClick={() => navigate("/")}
        >
          <BiArrowBack />
        </motion.button>
      </div>
      <div className="flex h-[90%] justify-center items-center">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, ease: "easeInOut" }}
          style={{ transformOrigin: "left" }}
          className="card w-96 bg-base-100 shadow-xl"
        >
          <div className="card-body">
            <MotionConfig
              transition={{
                duration: 1,
              }}
            >
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="card-title"
              >
                Sign In
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 }}
                className="form-control w-full max-w-xs"
              >
                <label className="label">
                  <span className="label-text">NIP</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setNip(e.target.value)}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
                className="form-control w-full max-w-xs"
              >
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2 }}
                className="flex justify-end mt-2"
              >
                <motion.button
                  initial={{ x: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                  onClick={submitLogin}
                  className="btn btn-circle btn-neutral"
                  ref={refBtn}
                  style={{ outline: "none" }}
                >
                  {!isLoading && !isSuccess ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        duration: 0.3,
                      }}
                      exit={{ scale: 0 }}
                    >
                      <BiArrowToRight />
                    </motion.div>
                  ) : !isLoading && isSuccess ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{
                        duration: 1,
                      }}
                    >
                      <PiCheck className=" text-white" />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{
                        duration: 0.3,
                      }}
                    >
                      <PiCircleNotchLight className="animate-spin text-black" />
                    </motion.div>
                  )}
                </motion.button>
                <AnimatePresence>
                  {!isLoading && isSuccess && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                      style={{ transformOrigin: "right" }}
                      className="flex flex-1 items-center rounded-r-full bg-[#45C421] text-white"
                    >
                      <p>Login Successfully</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </MotionConfig>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
