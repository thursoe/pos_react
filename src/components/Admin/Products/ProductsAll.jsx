import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getApi, deleteApi, FormPostApi } from "../../Api";
import { BsFillTrashFill } from "react-icons/bs";
import { BiSolidEdit, BiImport, BiExport } from "react-icons/bi";
import DeleteAlert from "../../utility/DeleteAlert";
import FadeLoader from "react-spinners/FadeLoader";
import img from "../../../assets/tablet.png";
import Barcode from "react-barcode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

export default function ProductsAll() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [alert, setAlert] = useState(false);
  const [ProductId, setProductId] = useState(null);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);

  const [importFile, setimportFile] = useState("");

  const importRef = useRef(null);

  const inputRef = useRef();

  const userData = useSelector((state) => state.loginData);
  const token = useSelector((state) => state.IduniqueData);

  const productApi = async () => {
    setLoading(true);
    let resData = await getApi("/product");
    if (resData.status) {
      setLoading(false);
      setProducts(resData.data);
    } else {
      setLoading(true);
    }
  };

  const deleteProductApi = async (id) => {
    const response = await deleteApi(`/product/${id}`, token);

    productApi();
  };

  const deleteProductID = (id) => {
    setAlert(true);
    setProductId(id);
  };

  const editRoute = (id) => {
    navigate(`/admin/products/edit/${id}`);
  };

  const receiveExcel = async () => {
    try {
      const response = await fetch("http://3.0.102.114/product/export-excel");

      if (response.ok) {
        const blob = await response.blob();
        const filename =
          response.headers.get("content-disposition") || "exported-data.xlsx";

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = filename;

        a.click();

        // Clean up
        window.URL.revokeObjectURL(url);
      } else {
        console.error("Failed to download the file. Server returned an error.");
      }
    } catch (error) {
      console.error("An error occurred while downloading the file:", error);
    }
  };

  const handleFileImportClick = () => {
    importRef.current.click();
  };

  const handleFileImportChange = async (event) => {
    const selectedFile = event.target.files[0];
    setimportFile(selectedFile);
    const formData = new FormData();
    formData.append("excel", importFile);
    const sendExcelApi = await FormPostApi("/product/import-excel", formData);
    s;
    setLoading(true);
    toast(sendExcelApi.message);
    if (sendExcelApi.status) {
      setLoading(false);
      productApi();
    }
  };

  useEffect(() => {
    productApi();
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
      <div className="flex">
        <div className="flex w-full justify-between items-center">
          <div className="flex md:mr-8 justify-around">
            <Link to="/admin/products/create">
              <div className="rounded-sm shadow-md flex items-center bg-blue-600 hover:opacity-75 text-md text-white font-bold px-6 py-2">
                Add Product
              </div>
            </Link>
            <div
              onClick={receiveExcel}
              className="rounded-sm mx-3 shadow-sm flex items-center bg-blue-600 hover:opacity-75 text-md text-white font-bold px-6 py-2"
            >
              <BiImport className="text-xl mx-2" />
              <h4> Export Excel</h4>
            </div>
            <div
              onClick={handleFileImportClick}
              className="rounded-sm shadow-sm flex items-center bg-blue-600 hover:opacity-75 text-md text-white font-bold px-6 py-2"
            >
              <input
                type="file"
                style={{ display: "none" }}
                ref={importRef}
                onChange={handleFileImportChange}
              />
              <h4>Import Excel </h4>
              <BiExport className="text-xl mx-2" />
            </div>
          </div>
          <div className=" relative flex">
            <input
              ref={inputRef}
              type="text"
              className="px-3 py-2 w-96 md:w-72 rounded-md border-2 border-blue-500 shadow-md bg-white focus:outline-none"
              id="products"
              placeholder="search products"
              onChange={(e) => setSearchItems(e.target.value.toLowerCase())}
            />
            <select
              required
              id="catid"
              onChange={(e) => setSelected(e.target.value)}
              className="w-4 px-3 py-2 ml-1  border-2 rounded-md border-1 bg-white focus:outline-none"
            >
              <option disabled value selected></option>
              <option
                value="name"
                className="hover:bg-cyan-300 hover:font-bold"
              >
                name
              </option>
              <option
                value="listPrice"
                className="hover:bg-cyan-300 hover:font-bold"
              >
                listPrice
              </option>
              <option
                value="barcode"
                className="hover:bg-cyan-300 hover:font-bold"
              >
                barcode
              </option>
              <option
                value="category"
                className="hover:bg-cyan-300 hover:font-bold"
              >
                category
              </option>
              <option value="tax" className="hover:bg-cyan-300 hover:font-bold">
                tax
              </option>
            </select>
          </div>
        </div>
      </div>
      <h2 className="lg:text-2xl font-bold my-4">Product</h2>
      <div className="w-full">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="lg:px-4 py-2 text-center">Photo</th>
              <th className="lg:px-4 py-2 text-center">Name</th>
              <th className="lg:px-4 py-2 text-center">Ref</th>
              <th className="lg:px-4 py-2 text-center">Expiredate</th>
              <th className="lg:px-4 py-2 text-center">Description</th>
              <th className="lg:px-4 py-2 text-center">Barcode</th>
              <th className="lg:px-4 py-2 text-center">Price</th>
              <th className="lg:px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="w-full space-y-10">
            {products.length > 0 ? (
              products
                .filter((item) =>
                  searchItems.toLowerCase === ""
                    ? item
                    : item.name.toLowerCase().includes(searchItems)
                )
                .map((product) => (
                  <tr
                    key={product.id}
                    onClick={() =>
                      navigate(`/admin/products/detail/${product.id}`)
                    }
                    className="odd:bg-white even:bg-slate-200 space-y-10  mb-8 w-full items-center cursor-pointer hover:text-white hover:bg-[#60a5fa] "
                  >
                    <td className="lg:px-4 py-2 text-center">
                      <img
                        src={product.image ? product.image : img}
                        className="w-10 h-10 rounded-md shadow-md text-center"
                      />
                    </td>

                    <td className="lg:px-4 py-2 text-center">{product.name}</td>

                    <td className="lg:px-4 py-2 text-center">{product.ref}</td>
                    <td className="lg:px-4 py-2 text-center">
                      {product.expiredAt.toLocaleString()}
                    </td>
                    <td className="lg:px-4 py-2 text-center overflow-hidden whitespace-nowrap">
                      {product.description &&
                        product.description.substring(0, 30)}
                    </td>
                    <td className="lg:px-4 py-2 text-center ">
                      {product.barcode}
                    </td>
                    <td className="lg:px-4 py-2 text-center">
                      {product.listPrice}
                    </td>
                    <td className="lg:px-4 py-2 text-center">
                      <div className="flex justify-center">
                        <BiSolidEdit
                          className="text-2xl text-sky-600 BiSolidEdit hover:text-sky-900"
                          onClick={(e) => {
                            e.stopPropagation();
                            editRoute(product.id);
                          }}
                        />
                        <BsFillTrashFill
                          className="text-2xl ml-3 text-red-600 hover:opacity-75"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteProductID(product.id);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))
            ) : (
              <div className="absolute inset-0 flex justify-center items-center">
                {loading && (
                  <FadeLoader
                    color={"#0284c7"}
                    loading={loading}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                )}
              </div>
            )}
          </tbody>
        </table>
        {alert && (
          <DeleteAlert
            cancel={() => {
              setAlert(false);
              setProductId(null);
            }}
            onDelete={() => {
              deleteProductApi(ProductId);
              setAlert(false);
            }}
          />
        )}
      </div>
    </>
  );
}
