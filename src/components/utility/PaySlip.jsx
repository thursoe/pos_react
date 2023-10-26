import React, { useRef } from "react";
import logo from "../../../public/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { removeAllItems } from "../../redux/actions";

const PrintableContent = React.forwardRef((props, ref) => (
  <div ref={ref}>
    {/* Content to be printed */}
    <h1>Hello, this is printable content!</h1>
    <p>More content goes here...</p>
  </div>
));

export default function PaySlip({ change, total, cash, pay, tax, sub, order }) {
  // const user = useSelector((state) => state.loginData);
  const product = useSelector((state) => state.orderData);
  const dispatch = useDispatch();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div className="flex justify-center">
        <div className="mx-3">
          <h3 className="text-lg font-bold">Total Paid</h3>
          <h4 className=" text-md text-center">{total}</h4>
        </div>
        <div className="mx-3">
          <h3 className="text-lg font-bold">Charge</h3>
          <h4 className="text-md">{pay.toFixed(2)}</h4>
        </div>
      </div>
      <PrintableContent ref={componentRef} />
      <div className="w-80 mx-auto mt-2 mb-4">
        <button
          onClick={handlePrint}
          className="w-full mt-2 font-bold py-2 text-white bg-blue-600 rounded-md shadow-md"
        >
          Print
        </button>

        <button
          className="w-full mt-2  font-bold py-2 text-white bg-cyan-500 rounded-md shadow-md"
          onClick={() => {
            change(false);
            dispatch(removeAllItems());
          }}
        >
          New Order
        </button>
      </div>
    </>
  );
}
