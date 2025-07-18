import React, { useState } from "react";

const ReviewResume = () => {

  const [input, setInput] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="h-full p-4 flex flex-wrap gap-4 text-gray-800">
      {/* Left Form */}
      <form
        onSubmit={onSubmitHandler}
        encType="multipart/form-data"
        className="w-full max-w-lg p-4 border rounded bg-white"
      >
        <h1 className="text-base mb-4">Resume Reviewer</h1>

        <label className="block text-sm mb-1">Upload Resume</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setInput(e.target.files[0])}
          className="w-full p-2 text-sm border rounded outline-none "
          required
        />
        <p className="text-xs text-gray-500 font-light mb-2">Upload in PDF format only</p>
        <button
          type="submit"
          className="w-full p-2 text-sm border rounded cursor-pointer hover:bg-gray-100 mt-5"
        >
          Review Resume
        </button>
      </form>

      {/* Right Column */}
      <div className="w-full max-w-lg p-4 bg-white border rounded flex flex-col">
        <h2 className="text-base mb-4">Analysis Results</h2>
        <div className="flex-1 flex items-center justify-center text-sm text-gray-600">
          <p>Upload resume to get started...</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewResume
