import React from "react";
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useNavigate, useParams, useMatch } from "react-router-dom";

const SideBar = ({ contentType }) => {
  const { dosenId } = useParams();
  const navigate = useNavigate();
  const profileDosenMatch = useMatch(`/updatedosen/${dosenId}`);
  const teachingHistoryMatch = useMatch(`/updateteachhistory/${dosenId}`);
  const educationHistoryMatch = useMatch(`/updateeduhistory/${dosenId}`);
  const profileDosen2Match = useMatch(`/dashboard/profiledosen`);
  const teachingHistoryDosenMatch = useMatch(`/dashboard/teachhisdosen`);
  const educationHistoryDosenMatch = useMatch(`/dashboard/eduhisdosen`);
  const pkmDosenMatch = useMatch(`/dashboard/updatepkm`);
  const researchDosenMatch = useMatch(`/dashboard/updateresearch`);

  return (
    <div className="mt-16 h-screen w-full flex">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex items-center justify-center"></div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 h-screen bg-base-200 text-base-content">
            {contentType === "admin" ? (
              <>
                <li className="mb-2">
                  <button
                    onClick={() => navigate(`/updatedosen/${dosenId}`)}
                    className={profileDosenMatch ? "bg-primary text-white" : ""}
                  >
                    Profile Dosen
                  </button>
                </li>
                <li className="mb-2">
                  <button
                    onClick={() => navigate(`/updateteachhistory/${dosenId}`)}
                    className={
                      teachingHistoryMatch ? "bg-primary text-white" : ""
                    }
                  >
                    Teaching History
                  </button>
                </li>
                <li className="mb-2">
                  <button
                    onClick={() => navigate(`/updateeduhistory/${dosenId}`)}
                    className={
                      educationHistoryMatch ? "bg-primary text-white" : ""
                    }
                  >
                    Education History
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="mb-2">
                  <button
                    onClick={() => navigate(`/dashboard/profiledosen`)}
                    className={
                      profileDosen2Match ? "bg-primary text-white" : ""
                    }
                  >
                    Profile Dosen
                  </button>
                </li>
                <li className="mb-2">
                  <button
                    onClick={() => navigate(`/dashboard/teachhisdosen`)}
                    className={
                      teachingHistoryDosenMatch ? "bg-primary text-white" : ""
                    }
                  >
                    Teaching History
                  </button>
                </li>
                <li className="mb-2">
                  <button
                    onClick={() => navigate(`/dashboard/eduhisdosen`)}
                    className={
                      educationHistoryDosenMatch ? "bg-primary text-white" : ""
                    }
                  >
                    Education History
                  </button>
                </li>
                <li className="mb-2">
                  <button
                    onClick={() => navigate(`/dashboard/updatepkm`)}
                    className={pkmDosenMatch ? "bg-primary text-white" : ""}
                  >
                    PKM
                  </button>
                </li>
                <li className="mb-2">
                  <button
                    onClick={() => navigate(`/dashboard/updateresearch`)}
                    className={
                      researchDosenMatch ? "bg-primary text-white" : ""
                    }
                  >
                    Research
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
