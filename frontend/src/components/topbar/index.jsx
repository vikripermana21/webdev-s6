import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const Topbar = ({ contentType }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="navbar bg-base-100 absolute top-0 w-full">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to={"/dosen"}> Dosen </Link>
            </li>
          </ul>
        </div>
        {contentType === "admin" && location.pathname != "/dashboard/admin" ? (
          <button
            className="btn btn-ghost normal-case text-xl"
            onClick={() => navigate(`/dashboard/admin`)}
          >
            <MdOutlineArrowBackIosNew />
          </button>
        ) : (
          <p className="pl-3 font-bold normal-case text-xl">PolbanEduStaff</p>
        )}
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li></li>
        </ul>
      </div>
      <div className="navbar-end">
        {contentType === "admin" || contentType === "dosen" ? (
          <Link className="btn" to={"/"}>
            Logout
          </Link>
        ) : (
          <Link className="btn" to={"/login"}>
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Topbar;
