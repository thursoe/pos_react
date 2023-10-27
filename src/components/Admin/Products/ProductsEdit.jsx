import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getApi, FormPathApi } from "../../Api";
import { useParams } from "react-router-dom";
import { RiImageAddFill } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";

export default function ProductsEdit() {
  const [cat, setCat] = useState([]);
  const [category, setGategory] = useState("");
  const [name, setName] = useState("");
  const [ref, setRef] = useState("");
  const [expiredate, setExpiredate] = useState("");
  const [description, setDescription] = useState("");
  const [bar, setBar] = useState(0);
  const [price, setPrice] = useState(0);
  const [catName, setCatName] = useState("");
  const [avaliable, setAAvaliable] = useState(null);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [select, setSelect] = useState("");
  const token = useSelector((state) => state.IduniqueData);

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [profit, setProfit] = useState(0);
  const [purchasePrice, setPurchasePrice] = useState(0);

  const { id } = useParams();

  const SingleProductApi = async () => {
    let resData = await getApi(`/product/${id}`);

    setRef(resData.data[0].ref);
    setName(resData.data[0].name);
    setDescription(resData.data[0].description);
    setExpiredate(new Date(resData.data[0].expiredAt).toLocaleDateString());
    setPrice(resData.data[0].listPrice);
    setBar(resData.data[0].barcode);
    setCatName(resData.data[0].category.name);
    setSelect(resData.data[0].image);
  };

  const createProductApi = async () => {
    const formData = new FormData();

    if (name) {
      formData.append("name", name);
    }
    if (ref) {
      formData.append("ref", ref);
    }
    if (avaliable) {
      formData.append("avaliable", avaliable);
    }
    if (expiredate) {
      formData.append("expiredAt", expiredate);
    }
    if (description) {
      formData.append("description", description);
    }
    if (bar) {
      formData.append("barcode", bar);
    }
    if (category) {
      formData.append("category", category);
    }
    if (price) {
      formData.append("salePrice", price);
    }
    if (file) {
      formData.append("image", file);
    }
    if (purchasePrice) {
      formData.append("purchasePrice", purchasePrice);
    }
    if (profit) {
      formData.append("marginProfit", profit);
    }
    let resData = await FormPathApi(
      `/product/${id}`,
      formData,
      token.accessToken
    );

    console.log("edit is a", resData);
    if (resData.status) {
      navigate("/admin/products/all");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProductApi();
  };

  const getCategory = async () => {
    const resData = await getApi("/category");
    setCat(resData.data);
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target.result);
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  useEffect(() => {
    getCategory();
    SingleProductApi();
  }, []);
  return (
    <>
      <div>
        <button
          type="submit"
          className="px-8 py-2 text-white font-bold rounded-sm shadow-md border-2 border-blue-500 bg-blue-600 hover:opacity-75"
          onClick={handleSubmit}
        >
          Save
        </button>
        <Link to="/admin/products/all">
          <button className="px-8 py-2 text-white font-bold rounded-sm shadow-md ml-6 border-2 border-blue-500 bg-blue-600 hover:opacity-75">
            Discard
          </button>
        </Link>
      </div>

      <div className="mt-2">
        <div className="w-full mx-auto flex justify-center cursor-pointer flex-col">
          <h2 className="py-1 text-lg font-bold mt-2 bg-blue-600 text-white pl-4">
            Edit Product
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="flex justify-between mt-4 ">
          <div>
            <label className="text-md font-semibold">Product Image</label>
            <div className="relative w-36 h-36 mt-4 flex justify-center items-center p-8 bg-white border-2 rounded-md shadow-md">
              <RiImageAddFill className=" text-slate-400 text-6xl" />
              {file ? (
                <img
                  src={selectedImage}
                  className="absolute object-cover w-full h-full"
                />
              ) : (
                <img
                  loading="eager | lazy"
                  src={select}
                  className="absolute object-cover w-full h-full"
                />
              )}
            </div>
            <div
              onClick={handleFileInputClick}
              className="w-36 py-1.5 px-2 flex justify-center items-center hover:opacity-75 rounded-md shadow-md bg-blue-600 mt-3"
            >
              <AiOutlinePlus className="text-xl text-white font-bold mr-1" />
              <input
                type="file"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileInputChange}
              />
              <span className="text-white font-semibold text-md">Upload</span>
            </div>
          </div>
          <div className="flex flex-wrap px-8">
            <div className="w-60 mx-8 mb-3">
              <label className="text-md font-semibold">Product Name*</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-1 rounded-md border-b-2 border-slate-400 bg-white focus:outline-none my-2"
                placeholder="Enter product name"
              />
            </div>
            <div className="w-60 mx-8 mb-3">
              <label className="text-md font-semibold">Ref*</label>
              <input
                type="text"
                value={ref}
                onChange={(e) => setRef(e.target.value)}
                className="w-full px-3 py-1 rounded-md border-b-2 border-slate-400 bg-white focus:outline-none my-2"
                placeholder="Enter product Ref"
              />
            </div>
            <div className="w-60 mx-8 mb-3">
              <label className="text-md font-semibold">Category Name*</label>
              <select
                required
                id="catid"
                value={catName}
                onChange={(e) => setGategory(e.target.value)}
                className="w-full px-3 py-1 rounded-md border-b-2 border-slate-400 bg-white focus:outline-none my-2"
              >
                <option disabled value selected>
                  Select an option
                </option>
                {cat.length > 0 &&
                  cat.map((ct) => (
                    <option
                      key={ct.id}
                      value={ct.id}
                      className="hover:bg-cyan-300 hover:font-bold"
                    >
                      {ct.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="w-60 mx-8 mb-3">
              <label className="text-md font-semibold">Barcode*</label>
              <input
                type="text"
                value={bar}
                onChange={(e) => setBar(e.target.value)}
                className="w-full px-3 py-1 rounded-md border-b-2 border-slate-400 bg-white focus:outline-none my-2"
                placeholder="Enter product Ref"
              />
            </div>
            <div className="w-60 mx-8 mb-3">
              <label className="text-md font-semibold">Expire-Date*</label>
              <input
                type="date"
                value={expiredate}
                onChange={(e) => setExpiredate(e.target.value)}
                className="w-full px-3 py-1 rounded-md border-b-2 border-slate-400 bg-white focus:outline-none my-2"
                placeholder="Enter product stock quantity"
              />
            </div>
            <div className="w-60 mx-8 mb-3">
              <label className="text-md font-semibold">Description*</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-1 rounded-md border-b-2 border-slate-400 bg-white focus:outline-none my-2"
                placeholder="Enter product description"
              />
            </div>
            <div className="w-60 mb-3 mx-8">
              <label className="text-md font-semibold">Price*</label>
              <input
                required
                value={price}
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-1 rounded-md border-b-2 bg-white focus:outline-none my-2"
                placeholder="Enter product stock quantity"
              />
            </div>
            <div className="w-60 mb-3 mx-8">
              <label className="text-md font-semibold">PurchasePrice*</label>

              <input
                required
                value={purchasePrice}
                type="number"
                onChange={(e) => setPurchasePrice(e.target.value)}
                className="w-full px-3 py-1 rounded-md border-b-2 bg-white focus:outline-none my-2"
                placeholder="Enter product stock quantity"
              />
            </div>

            <div className="w-60 mb-3 mx-8">
              <label className="text-md font-semibold">Margin Profit*</label>
              <input
                required
                value={profit}
                type="number"
                onChange={(e) => setProfit(e.target.value)}
                className="w-full px-3 py-1 rounded-md border-b-2 bg-white focus:outline-none my-2"
                placeholder="Enter product stock quantity"
              />
            </div>
            <div className="w-60 mx-8 mb-3">
              <label className="text-md font-semibold">AvaliableInPos*</label>

              <select
                id="payment"
                className="w-full px-3 py-1 rounded-md border-b-2 border-slate-400 bg-white focus:outline-none my-2"
                value={avaliable}
                onChange={(e) => setAAvaliable(e.target.value)}
              >
                <option value="true" className="py-2">
                  true
                </option>
                <option value="false" className="py-2">
                  false
                </option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
