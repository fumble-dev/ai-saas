import React, { useState } from "react";

const RemoveBackground = () => {
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
        <h1 className="text-base mb-4">Background Removal</h1>

        <label className="block text-sm mb-1">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setInput(e.target.files[0])}
          className="w-full p-2 text-sm border rounded outline-none mb-2"
          required
        />
        <p className="text-xs text-gray-500 mb-4">
          Supports JPG, PNG, and other image formats
        </p>

        <button
          type="submit"
          className="w-full p-2 text-sm border rounded cursor-pointer hover:bg-gray-100"
        >
          Remove Background
        </button>
      </form>

      {/* Right Column */}
      <div className="w-full max-w-lg p-4 bg-white border rounded flex flex-col">
        <h2 className="text-base mb-4">Processed Image</h2>
        <div className="flex-1 flex items-center justify-center text-sm text-gray-600">
          <p>Upload an image and click remove to get started...</p>
        </div>
      </div>
    </div>
  );
};

export default RemoveBackground;
