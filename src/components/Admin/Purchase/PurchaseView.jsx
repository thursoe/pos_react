import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { getApi } from "../../Api";
import { format } from "date-fns";
import FadeLoader from "react-spinners/FadeLoader";
import { useSelector } from "react-redux";

export default function PurchaseView() {
  const [purchase, setPurchase] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.IduniqueData);

  const getPurchase = async () => {
    setLoading(true);
    let resData = await getApi("/purchase", token.accessToken);
    if (resData.success) {
      setLoading(false);
      setPurchase(resData.data);
    } else {
      setLoading(true);
    }
  };

  useEffect(() => {
    getPurchase();
  }, []);
  const formattedSaleData = purchase.map((item) => ({
    ...item,
    created: format(new Date(item.createdAt), "yyyy-MM-dd"),
  }));

  return (
    <>
      <h3 className="text-slate-500 font-semibold text-lg mb-6">Purchase</h3>
      {purchase.length > 0 ? (
        <div className="w-4/5	mx-auto">
          <BarChart
            width={900}
            height={500}
            data={formattedSaleData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="createdAt" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="total" fill="#8884d8" />
            <Bar yAxisId="right" dataKey="total" fill="#82ca9d" />
          </BarChart>
        </div>
      ) : (
        <div className=" flex justify-center items-center mt-40">
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
    </>
  );
}
