import { useEffect, useState } from "react";
import "./App.css";
import Topbar from "./components/topbar";
import backgroundImage from "./assets/bg-landingpage.jpg";
import { useNavigate } from "react-router-dom";
import { BsPlayFill } from "react-icons/bs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrNext, GrPrevious } from "react-icons/gr";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <GrNext className={className} style={{ ...style }} onClick={onClick} />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <GrPrevious className={className} style={{ ...style }} onClick={onClick} />
  );
}

function App() {
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    fetch("http://localhost:5000/lecturer", {
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
        setData(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const settings = {
    centerMode: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 1000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div>
      <Topbar />
      {/* Hero Section */}
      <div className="w-screen flex justify-center hero">
        <div className="w-4/5 h-[100vh] flex flex-col justify-start pt-36 items-center">
          <h1 className="font-bold text-center text-7xl">
            We Serve Compact Information for the Lecturers at Politeknik Bandung
          </h1>
          <button className="btn btn-warning mt-8">
            Let's Get Started <BsPlayFill />{" "}
          </button>

          <div className="flex flex-col w-full items-center mt-12">
            <div className="w-5/6">
              <Slider {...settings} className="p-5">
                {data &&
                  data.map((item) => (
                    <div className="py-5">
                      <div className="card bg-base-100 shadow-md mx-5 hover:scale-100 scale-90 transition-all hover:cursor-pointer">
                        {
                          <figure>
                            <img
                              src={item.profile_picture} // Assuming item.profile_picture contains the image URL
                              alt="Shoes"
                              className="rounded-full h-32 w-32"
                            />
                          </figure>
                        }
                        <div className="card-body">
                          <p className="text-lg font-bold">{item.full_name}</p>
                          <p>{item.major}</p>
                          <p>{item.study_program}</p>
                          <p className="font-semibold">{item.email}</p>
                          {/* <div className="card-actions justify-end">
                            <button
                              onClick={() =>
                                navigate(`/dosen/${item.id_dosen}`)
                              }
                              className="btn btn-circle flex grow"
                            >
                              Profil
                            </button>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      {/* End of Hero Section */}
    </div>
  );
}

export default App;
