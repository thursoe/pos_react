import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { jsonStringPostData } from "../../Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

export default function LocationCreate() {
  let [name, setName] = useState("");
  const [showNameError, setShowNameError] = useState(false);
  const navigate = useNavigate();
  const token = useSelector((state) => state.IduniqueData);

  const createCategoryApi = async () => {
    if (name.trim() === "") {
      setShowNameError(true);
    } else {
      setShowNameError(false);
    }
    const data = {
      name: name,
    };

    try {
      let resData = await jsonStringPostData(
        "/location",
        data,
        token.accessToken
      );
      if (resData.status) {
        navigate("/admin/locations/all");
      }
    } catch (error) {
      toast(resData.message);
      console.error("Error creating product:", error);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    createCategoryApi();
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div>
        <button
          type="submit"
          className="px-8 py-2 text-white font-bold rounded- shadow-md border-2 border-blue-500 bg-blue-600 hover:opacity-75"
          onClick={handleChange}
        >
          Save
        </button>
        <Link to="/admin/locations/all">
          <button className="px-8 py-2 text-white font-bold rounded-sm shadow-md ml-6 border-2 border-blue-500 bg-blue-600 hover:opacity-75">
            Discard
          </button>
        </Link>
      </div>

      <h2 className="py-1.5 text-lg font-bold mt-6 bg-blue-600 text-white pl-4">
        Location Information
      </h2>

      <div className="w-full">
        <form onSubmit={handleChange} className="mt-3">
          <div className="w-80">
            <label
              className={`text-md font-semibold ${
                showNameError ? "text-red-600" : ""
              }`}
            >
              Name*
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full py-1 rounded-md border-b-2 bg-white focus:outline-none my-2 ${
                showNameError ? "border-red-600" : "border-slate-400"
              }`}
              placeholder="Enter Location name"
            />
          </div>
        </form>
      </div>
    </>
  );
}
