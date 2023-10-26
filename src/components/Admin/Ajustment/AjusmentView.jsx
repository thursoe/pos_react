import React, { useRef, useState } from "react";

import { BiSolidEdit, BiImport, BiExport } from "react-icons/bi";

export default function AjusmentView() {
  const [loading, setLoading] = useState(false);

  const [importFile, setimportFile] = useState("");
  const [ExportFile, setExportFile] = useState("");

  const importRef = useRef(null);
  const exportRef = useRef(null);

  const handleFileExportClick = () => {
    exportRef.current.click();
  };
  const handleFileExportChange = (event) => {
    const selectedFile = event.target.files[0];
    setExportFile(selectedFile);
  };

  const handleFileImportClick = () => {
    importRef.current.click();
  };

  const handleFileImportChange = (event) => {
    const selectedFile = event.target.files[0];
    setimportFile(selectedFile);
  };
  return (
    <>
      <div className="flex">
        <div
          onClick={handleFileExportClick}
          className="rounded-sm shadow-sm flex items-center bg-blue-600 hover:opacity-75 text-md text-white font-bold px-6 py-2"
        >
          <input
            type="file"
            style={{ display: "none" }}
            ref={exportRef}
            onChange={handleFileExportChange}
          />

          <h4> Excel </h4>
          <BiImport className="text-xl ml-2" />
        </div>
        <div
          onClick={handleFileImportClick}
          className="rounded-sm mx-3 shadow-sm flex items-center bg-blue-600 hover:opacity-75 text-md text-white font-bold px-6 py-2"
        >
          <input
            type="file"
            style={{ display: "none" }}
            ref={importRef}
            onChange={handleFileImportChange}
          />
          <h4> Excel </h4>
          <BiExport className="text-xl ml-2" />
        </div>
      </div>

      <div className="mt-6 mx-auto">
        <table className="w-full text-center">
          <tr className="bg-blue-600 text-white">
            <th className="lg:px-4 py-2 text-center">No</th>
            <th className="lg:px-4 py-2 text-center">Name</th>

            <th className="lg:px-4 py-2 text-center">Date</th>
            <th></th>
          </tr>
          <div className="mt-40 flex justify-center items-center">
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
        </table>
      </div>
    </>
  );
}
