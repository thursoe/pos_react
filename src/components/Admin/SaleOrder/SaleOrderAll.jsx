import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getApi } from "../../Api";
import { BiExport } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FadeLoader from "react-spinners/FadeLoader";
import { useSelector } from "react-redux";

export default function SaleOrderAll() {
  const [saleorders, setSaleOrders] = useState([]);
  const [searchItems, setSearchItems] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const inputRef = useRef();
  const token = useSelector((state) => state.IduniqueData);
  const [importFile, setimportFile] = useState("");
  const importRef = useRef(null);

  const saleOrderApi = async () => {
    setLoading(true);
    const resData = await getApi("/sale", token.accessToken);
    if (resData.data) {
      setLoading(false);
      setSaleOrders(resData.data);
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
    setLoading(true);
    toast(sendExcelApi.message);
    if (sendExcelApi.status) {
      setLoading(false);
      saleOrderApi();
    }
  };

  useEffect(() => {
    saleOrderApi();
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
            <Link to="/admin/saleorders/create">
              <div className="rounded-sm shadow-md flex items-center bg-blue-600 hover:opacity-75 text-md text-white font-bold px-6 py-2">
                Add SaleOrder
              </div>
            </Link>
            <div
              onClick={handleFileImportClick}
              className="rounded-sm shadow-sm mx-3 flex items-center bg-blue-600 hover:opacity-75 text-md text-white font-bold px-6 py-2"
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
        <h2 className="lg:text-2xl font-bold my-4">SaleOrder</h2>
        <table className="w-full text-center">
          <tr className="bg-blue-600 text-white">
            <th className="text-center">orderDate</th>
            <th className="lg:px-4 py-2 text-center">User</th>
            <th className="lg:px-4 py-2 text-center">Partner</th>
            <th className="lg:px-4 py-2 text-center">Location</th>
            <th className="lg:px-4 py-2 text-center">state</th>
            <th className="lg:px-4 py-2 text-center">saleorderline</th>
            <th className="lg:px-4 py-2 text-center">Payment</th>
            <th className="lg:px-4 py-2 text-center">TaxTotal</th>
            <th className="lg:px-4 py-2 text-center">Total</th>
          </tr>

          <tbody className="w-full space-y-10 bg-slate-300">
            {saleorders.length > 0 ? (
              saleorders
                .filter(
                  (item) =>
                    searchItems.toLowerCase() === "" ||
                    (item.partner &&
                      item.partner.name &&
                      item.partner.name.toLowerCase().includes(searchItems))
                )
                .map((sale) => (
                  <tr
                    key={sale.id}
                    onClick={() =>
                      navigate(`/admin/saleorders/detail/${sale.id}`)
                    }
                    className="hover:bg-blue-100 odd:bg-white even:bg-slate-200 mt-3 w-full"
                  >
                    <td className="lg:px-4 py-2 text-center">
                      {sale.createdAt}
                    </td>

                    <td className="lg:px-4 py-2 text-center">
                      {sale.user && sale.user._id ? sale.user._id : "no have"}
                    </td>
                    <td className="lg:px-4 py-2 text-center">
                      {sale.partner.name ? sale.partner.name : "no have"}
                    </td>
                    <td className="lg:px-4 py-2 text-center">
                      {sale.location.name ? sale.location.name : "no have"}
                    </td>
                    <td className="lg:px-4 py-2 text-center">{sale.state}</td>
                    <td className="lg:px-4 py-2 text-center overflow-hidden whitespace-nowrap">
                      {sale.lines.length}
                    </td>
                    <td className="lg:px-4 py-2 text-center">{sale.state}</td>
                    <td className="lg:px-4 py-2 text-center">
                      {sale.taxTotal}
                    </td>
                    <td className="lg:px-4 py-2 text-center">{sale.total}</td>
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
      </div>
    </>
  );
}
