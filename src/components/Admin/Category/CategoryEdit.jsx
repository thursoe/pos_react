import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getApi, PathData } from "../../Api";
import { useSelector } from "react-redux";

export default function CategoryEdit() {
  let [name, setName] = useState("");
  const token = useSelector((state) => state.IduniqueData);
  const navigate = useNavigate();
  const { id } = useParams();

  const getCategory = async () => {
    try {
      const response = await getApi(`/category/${id}`, token.accessToken);
      setName(response.data[0].name);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  const editCategoryApi = async () => {
    const data = {};
    if (name) {
      data.name = name;
    }
    try {
      let resData = await PathData(`/category/${id}`, data, token.accessToken);
      navigate("/admin/categorys/all");
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    editCategoryApi();
  };

  useEffect(() => {
    getCategory();
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
        <Link to="/admin/categorys/all">
          <button className="px-8 py-2 text-white font-bold rounded-sm shadow-md ml-6 border-2 border-blue-500 bg-blue-600 hover:opacity-75">
            Discard
          </button>
        </Link>
      </div>
      <div className=" mt-2">
        <div className="w-full mx-auto flex justify-center cursor-pointer flex-col">
          <h2 className="py-1.5 text-lg font-bold mt-2 bg-blue-600 text-white pl-4">
            Add New Category
          </h2>
        </div>
        <form onSubmit={handleChange} className="mt-3 flex flex-col">
          <div className="w-60">
            <label className="text-md font-semibold">Name*</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-md border-b-2 border-slate-400 bg-white focus:outline-none my-2"
              placeholder="Enter category name"
            />
          </div>
        </form>
      </div>
    </>
  );
}
