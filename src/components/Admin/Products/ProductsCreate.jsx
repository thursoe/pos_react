import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getApi, FormPostApi } from "../../Api";
import { RiImageAddFill } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

export default function ProductsCreate() {
  const [cat, setCat] = useState([]);
  const [category, setGategory] = useState("");
  const [name, setName] = useState("");
  const [ref, setRef] = useState("");
  const [expiredate, setExpiredate] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [bar, setBar] = useState(0);
  const [file, setFile] = useState(null);
  const [avaliable, setAAvaliable] = useState(null);
  const navigate = useNavigate();

  const [purchasePrice, setPurchasePrice] = useState(0);
  const [tax, setTax] = useState(0);

  const fileInputRef = useRef(null);
  const [select, setSelect] = useState("");
  const [profit, setProfit] = useState(0);

  // State variables for showing red borders and error messages
  const [showNameError, setShowNameError] = useState(false);
  const [showRefError, setShowRefError] = useState(false);
  const [showCatError, setShowCatError] = useState(false);
  const [showDateError, setShowDateError] = useState(false);
  const [showDescriError, setShowDescriError] = useState(false);
  const [showPriceError, setShowPriceError] = useState(false);
  const [showBarCodeError, setShowBarCodeError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [purchaseError, setPurchaseError] = useState(false);
  const [profitError, setProfitError] = useState(false);
  const token = useSelector((state) => state.IduniqueData);

  const createProductApi = async () => {
    if (name.trim() === "") {
      setShowNameError(true);
    } else {
      setShowNameError(false);
    }

    if (ref.trim() === "") {
      setShowRefError(true);
    } else {
      setShowRefError(false);
    }
    if (category.trim() === "") {
      setShowCatError(true);
    } else {
      setShowCatError(false);
    }
    if (expiredate.trim() === "") {
      setShowDateError(true);
    } else {
      setShowDateError(false);
    }
    if (description.trim() === "") {
      setShowDescriError(true);
    } else {
      setShowDescriError(false);
    }
    if (price == 0) {
      setShowPriceError(true);
    } else {
      setShowPriceError(false);
    }
    if (bar == 0) {
      setShowBarCodeError(true);
    } else {
      setShowBarCodeError(false);
    }
    if (select === "") {
      setImageError(true);
    } else {
      setImageError(false);
    }
    if (purchasePrice === 0) {
      setPurchaseError(true);
    } else {
      setPurchaseError(false);
    }
    if (profit === 0) {
      setProfitError(true);
    } else {
      setProfitError(false);
    }
    if (name.trim() === "" || ref.trim() === "") {
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", select); // Append the image file
    formData.append("description", description);
    formData.append("ref", ref);
    formData.append("barcode", bar);
    formData.append("salePrice", price);
    formData.append("category", category);
    formData.append("expiredAt", expiredate);
    formData.append("marginProfit", profit);
    formData.append("purchasePrice", purchasePrice);
    formData.append("tax", tax);
    try {
      let resData = await FormPostApi("/product", formData, token.accessToken);

      if (resData.status) {
        navigate("/admin/products/all");
      }
    } catch (error) {
      toast(resData.message);
      console.error("Error creating product:", error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createProductApi();
  };
  const getCategory = async () => {
    const resData = await getApi("/category", token.accessToken);
    setCat(resData.data);
  };
  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };
  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    setSelect(selectedFile);
    const reader = new FileReader();
    reader.onload = (e) => {
      setFile(e.target.result);
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);
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
          className="px-8 py-2 text-white font-bold rounded-sm shadow-md  border-2 border-blue-500 bg-blue-600 hover:opacity-75"
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
            Add New Product
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex justify-between mt-4">
          <div>
            <label className="text-md font-semibold">Product Image</label>
            <div
              className={`relative w-36 h-36 mt-4 flex justify-center items-center p-8 bg-white border-2 rounded-md shadow-md ${
                imageError ? "border-red-600" : ""
              }`}
            >
              <RiImageAddFill className=" text-slate-400 text-6xl" />
              {file && (
                <img
                  src={file}
                  className="absolute object-cover w-full h-full"
                />
              )}
            </div>
            <div
              onClick={handleFileInputClick}
              className="w-36 py-1 px-2 flex justify-center items-center hover:opacity-75 rounded-md shadow-md bg-blue-600 mt-3"
            >
              <AiOutlinePlus className="text-xl text-white font-bold mr-1" />
              <input
                required
                type="file"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileInputChange}
              />
              <span className="text-white font-semibold text-md">Upload</span>
            </div>
          </div>
          <div className="flex flex-wrap px-8">
            <div className="w-60 mb-3 mx-8">
              <label
                className={`text-md font-semibold ${
                  showNameError ? "text-red-600" : ""
                }`}
              >
                Product Name*
              </label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-3 py-1 rounded-md border-b-2 bg-white focus:outline-none my-2 ${
                  showNameError ? "border-red-600" : "border-slate-400"
                }`}
                placeholder="Enter product name"
              />
            </div>
            <div className="w-60 mb-3 mx-8">
              <label
                className={`text-md font-semibold ${
                  showRefError ? "text-red-600" : "text-slate-600"
                }`}
              >
                Ref*
              </label>
              <input
                required
                type="text"
                value={ref}
                onChange={(e) => setRef(e.target.value)}
                className={`w-full px-3 py-1 rounded-md border-b-2 bg-white focus:outline-none my-2 ${
                  showRefError ? "border-red-600" : "border-slate-600"
                }`}
                placeholder="Enter product ref"
              />
            </div>
            <div className="w-60 mb-3 mx-8">
              <label
                className={`text-md font-semibold ${
                  showCatError ? "text-red-600" : "text-slate-600"
                }`}
              >
                Category Name*
              </label>
              <select
                required
                id="catid"
                onChange={(e) => setGategory(e.target.value)}
                className={`w-full px-3 py-1 rounded-md border-b-2 bg-white focus:outline-none my-2 ${
                  showCatError ? "border-red-600" : "border-slate-600"
                }`}
              >
                <option disabled value selected>
                  Select an option
                </option>
                {cat.length > 0 &&
                  cat.map((ct) => (
                    <option
                      key={ct._id}
                      value={ct._id}
                      className="hover:bg-cyan-300 hover:font-bold"
                    >
                      {ct.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="w-60 mb-3 mx-8">
              <label
                className={`text-md font-semibold ${
                  showDateError ? "text-red-600" : "text-slate-600"
                }`}
              >
                Expire-Date*
              </label>
              <input
                required
                type="date"
                value={expiredate}
                onChange={(e) => setExpiredate(e.target.value)}
                className={`w-full px-3 py-1 rounded-md border-b-2 bg-white focus:outline-none my-2 ${
                  showDateError ? "border-red-600" : "border-slate-600"
                }`}
                placeholder="Enter product stock quantity"
              />
            </div>
            <div className="w-60 mb-3 mx-8">
              <label
                className={`text-md font-semibold ${
                  showDescriError ? "text-red-600" : "text-slate-600"
                }`}
              >
                Description*
              </label>
              <input
                required
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full px-3 py-1 rounded-md border-b-2 bg-white focus:outline-none my-2 ${
                  showDescriError ? "border-red-600" : "border-slate-600"
                }`}
                placeholder="Enter product description"
              />
            </div>
            <div className="w-60 mb-3 mx-8">
              <label
                className={`text-md font-semibold ${
                  showBarCodeError ? "text-red-600" : "text-slate-600"
                }`}
              >
                BarCode*
              </label>
              <input
                required
                value={bar}
                type="text"
                onChange={(e) => setBar(e.target.value)}
                className={`w-full px-3 py-1 rounded-md border-b-2 bg-white focus:outline-none my-2 ${
                  showBarCodeError ? "border-red-600" : "border-slate-600"
                }`}
                placeholder="Enter product stock quantity"
              />
            </div>
            <div className="w-60 mb-3 mx-8">
              <label className={`text-md font-semibold `}>Tax*</label>
              <input
                required
                value={tax}
                type="number"
                onChange={(e) => setTax(e.target.value)}
                className={`w-full px-3 py-1 rounded-md border-b-2 bg-white border-slate-600 focus:outline-none my-2`}
                placeholder="Enter product stock quantity"
              />
            </div>
            <div className="w-60 mb-3 mx-8">
              <label
                className={`text-md font-semibold ${
                  showPriceError ? "text-red-600" : "text-slate-600"
                }`}
              >
                Price*
              </label>
              <input
                required
                value={price}
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                className={`w-full px-3 py-1 rounded-md border-b-2 bg-white focus:outline-none my-2 ${
                  showPriceError ? "border-red-600" : "border-slate-600"
                }`}
                placeholder="Enter product stock quantity"
              />
            </div>
            <div className="w-60 mb-3 mx-8">
              <label
                className={`text-md font-semibold ${
                  purchaseError ? "text-red-600" : "text-slate-600"
                }`}
              >
                Purchase Price*
              </label>
              <input
                required
                value={purchasePrice}
                type="number"
                onChange={(e) => setPurchasePrice(e.target.value)}
                className={`w-full px-3 py-1 rounded-md border-b-2 bg-white focus:outline-none my-2 ${
                  purchaseError ? "border-red-600" : "border-slate-600"
                }`}
                placeholder="Enter product stock quantity"
              />
            </div>

            <div className="w-60 mb-3 mx-8">
              <label
                className={`text-md font-semibold ${
                  profitError ? "text-red-600" : "text-slate-600"
                }`}
              >
                Margin Profit*
              </label>
              <input
                required
                value={profit}
                type="number"
                onChange={(e) => setProfit(e.target.value)}
                className={`w-full px-3 py-1 rounded-md border-b-2 bg-white focus:outline-none my-2 ${
                  profitError ? "border-red-600" : "border-slate-600"
                }`}
                placeholder="Enter product stock quantity"
              />
            </div>
            <div className="w-60 mb-3 mx-8 ">
              <label className="text-md font-semibold">AvaliableInPos*</label>
              <select
                id="payment"
                required
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
