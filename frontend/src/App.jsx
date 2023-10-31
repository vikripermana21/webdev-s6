import { useEffect, useRef, useState } from "react";
import "./App.css";
import Topbar from "./components/topbar";
import backgroundImage from "./assets/bg-landingpage.jpg";
import { useNavigate } from "react-router-dom";
import { BsPlayFill } from "react-icons/bs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrNext, GrPrevious } from "react-icons/gr";
import { AnimatePresence, motion, useAnimate } from "framer-motion";

function App() {
  const navigate = useNavigate();
  const [isMore, setIsMore] = useState(false);

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      <div className="flex">
        <motion.div
          layout
          initial={{
            y: 20,
          }}
          animate={{
            y: 0,
          }}
          transition={{
            delay: 2,
            ease: "easeInOut",
          }}
        >
          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 1,
              ease: "linear",
            }}
            className="text-7xl font-bold"
          >
            The Lecturers.
          </motion.p>
        </motion.div>
      </div>
      <motion.p
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          delay: 2,
        }}
      >
        We serve a compact information about our lecturers
      </motion.p>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 1,
          delay: 2.5,
        }}
      >
        <AnimatePresence>
          <motion.button
            layout
            transition={{
              duration: 1,
              ease: "linear",
            }}
            className="btn btn-neutral mt-5 "
            onClick={() => {
              navigate("/login");
            }}
          >
            Get Started <BsPlayFill />
          </motion.button>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;
