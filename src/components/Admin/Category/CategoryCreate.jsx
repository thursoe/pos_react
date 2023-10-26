import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { jsonStringPostData } from "../../Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

export default function CategoryCreate() {
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
        "/category",
        data,
        token.accessToken
      );
      if (resData.status) {
        navigate("/admin/categorys/all");
      }
    } catch (error) {
      toast(resData.message);
      console.error("Error creating category:", error);
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
          className="px-8 py-2 text-white font-bold rounded-sm shadow-md border-2 border-blue-500 bg-blue-600 hover:opacity-75"
          onClick={handleChange}
        >
          Save
        </button>
        <Link to="/admin/categorys/all">
          <button className="px-8 py-2 text-white font-bold rounded-sm shadow-md ml-6 border-2 border-blue-500 bg-blue-600 hover:opacity-75">
            Discard
          </button>
        </Link>
      </div>

      <div className="mt-2">
        <div className="w-full mx-auto flex justify-center cursor-pointer flex-col">
          <h2 className="py-1.5 text-lg font-bold mt-2 bg-blue-600 text-white pl-4">
            Add New Category
          </h2>
        </div>
        <form onSubmit={handleChange} className="mt-3 flex flex-col">
          <div className="w-60">
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
              placeholder="Enter category name"
            />
          </div>
        </form>
      </div>
    </>
  );
}
