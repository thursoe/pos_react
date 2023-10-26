import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApi } from "../../Api";
import FadeLoader from "react-spinners/FadeLoader";
import { BiExport } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

export default function Stock() {
  let count = 0;
  const inputRef = useRef();
  const [searchItems, setSearchItems] = useState([]);
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.IduniqueData);

  const [importFile, setimportFile] = useState("");
  const importRef = useRef(null);

  const navigate = useNavigate();
  const stockApi = async () => {
    setLoading(true);
    let resData = await getApi("/stock", token.accessToken);
    if (resData.status) {
      setLoading(false);
      setStock(resData.data);
    } else {
      setLoading(true);
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
      stockApi();
    }
  };

  useEffect(() => {
    stockApi();
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

          <div className="w-96 md:w-72 relative">
            <input
              ref={inputRef}
              type="text"
              className="px-3 py-2 w-full rounded-md border-2 border-blue-500 shadow-md bg-white focus:outline-none"
              id="products"
              placeholder="search products"
              onChange={(e) => setSearchItems(e.target.value.toLowerCase())}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto">
        <h2 className="lg:text-2xl font-bold my-4">Stocks</h2>
        <table className="w-full text-center">
          <tr className="bg-blue-600 text-white">
            <th className="lg:px-4 py-2 text-center">No</th>
            <th className="lg:px-4 py-2 text-center">Name</th>
            <th className="lg:px-4 py-2 text-center">Quantity</th>
            <th className="lg:px-4 py-2 text-center">Date</th>
            <th></th>
          </tr>
          {stock.length > 0 ? (
            stock
              .filter((item) =>
                searchItems.toLowerCase === ""
                  ? item
                  : item.product &&
                    item.product.name.toLowerCase().includes(searchItems)
              )
              .map((stk) => (
                <tr
                  key={stk.id}
                  className="hover:bg-blue-100 odd:bg-white even:bg-slate-200 mt-3"
                  onClick={() => navigate(`/admin/stock/detail/${stk.id}`)}
                >
                  <td className="py-3">{(count += 1)}</td>
                  <td className="py-3">
                    {stk.product && stk.product.name
                      ? stk.product.name
                      : "none"}
                  </td>
                  <td className="py-3">{stk.onHand}</td>
                  <td className="py-3">{stk.createdAt}</td>
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
        </table>
      </div>
    </>
  );
}
