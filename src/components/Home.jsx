import React from "react";
import logo from "../assets/op.jpeg";
import tablet from "../assets/tablet.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Home() {
  const userData = useSelector((state) => state.loginData);
  return (
    <>
      <div className="w-3/5	mx-auto flex justify-between items-center p-3">
        <img src={logo} className="w-20 h-14" />
        <ul className="flex w-3/5 justify-between font-semibold">
          <li className="">Products</li>
          <li>Benefits</li>
          <li>Games</li>
          <li>Quizs</li>
          <li>Pricing</li>
        </ul>

        <Link to={`${userData ? "/admin/pos/all" : "/signin"}`}>
          <button className="px-4 py-2 rounded-md text-blue-700 font-semibold border-2 border-blue-500 hover:bg-blue-400 hover:text-white">
            Sign in
          </button>
        </Link>
      </div>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-6xl mt-12 text-center font-bold">
          Tech Make Easy. "
        </h1>
        <div className="flex text-xl mt-4 justify-center">
          <p className="text-slate-600">Turn Your Android Tablet into</p>
          <strong className="ml-2 text-slate-500">
            Beautiful Complete POS system
          </strong>
        </div>
        <img src={tablet} className="my-4 rounded-md mx-auto" />
      </div>
    </>
  );
}
