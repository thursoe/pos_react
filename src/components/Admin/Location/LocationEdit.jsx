import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getApi, PathData } from "../../Api";
import { useSelector } from "react-redux";

export default function LocationEdit() {
  let [name, setName] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const token = useSelector((state) => state.IduniqueData);

  const getLocation = async () => {
    let resData = await getApi(`/location/${id}`, token.accessToken);
    setName(resData.data[0].name);
  };

  const editCategoryApi = async () => {
    const data = {};
    if (name) {
      data.name = name;
    }

    try {
      let resData = await PathData(`/location/${id}`, data , token.accessToken)
      navigate("/admin/locations/all");
    } catch (error) {
      console.error("Error creating location:", error);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    editCategoryApi();
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
      <div>
        <button
          type="submit"
          className="px-8 py-2 text-white font-bold rounded-sm shadow-md border-2 border-blue-500 bg-blue-600 hover:opacity-75"
          onClick={handleChange}
        >
          Save
        </button>
        <Link to="/admin/locations/all">
          <button className="px-8 py-2 text-white font-bold rounded-md shadow-md ml-6 border-2 border-blue-500 bg-blue-600 hover:opacity-75">
            Discard
          </button>
        </Link>
      </div>

      <div className=" mx-auto mt-4">
        <div className="w-full mx-auto flex justify-center cursor-pointer flex-col">
          <h2 className="py-1.5 text-lg font-bold mt-2 bg-blue-600 text-white pl-4">
            Edit Location information
          </h2>
        </div>
        <form onSubmit={handleChange} className="mt-4 flex">
          <div className="w-80">
            <label className="text-md font-semibold">Name*</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-md border-b-2 border-slate-400 bg-white focus:outline-none my-2"
              placeholder="Enter location name"
            />
          </div>
        </form>
      </div>
    </>
  );
}
