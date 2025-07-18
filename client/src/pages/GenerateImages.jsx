import React, { useState } from "react";

const GenerateImages = () => {
  const ImageStyle = [
    "Realistic",
    "Ghibli Style",
    "Anime Style",
    "Cartoon Style",
    "Fantasy Style",
    "3D Style",
    "Portrait",
  ];

  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="h-full p-4 flex flex-wrap gap-4 text-gray-800">
      {/* Left Form */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 border rounded bg-white"
      >
        <h1 className="text-base mb-4">AI Image Generator</h1>

        <label className="block text-sm mb-1">Describe your image</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 text-sm border rounded outline-none mb-4"
          placeholder="Write here..."
          rows={4}
          required
        />

        <label className="block text-sm mb-1">Style</label>
        <div className="flex flex-wrap gap-2 mb-4 text-sm">
          {ImageStyle.map((item) => (
            <span
              key={item}
              onClick={() => setSelectedStyle(item)}
              className={`px-3 py-1 rounded-full border text-xs cursor-pointer ${
                selectedStyle === item
                  ? "bg-gray-200 text-black border-gray-300"
                  : "text-gray-600 border-gray-400"
              }`}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mb-4 flex items-center gap-2">
          <input
            type="checkbox"
            id="publish"
            checked={publish}
            onChange={(e) => setPublish(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="publish" className="text-sm">
            Make this image public
          </label>
        </div>

        <button
          type="submit"
          className="w-full p-2 text-sm border rounded cursor-pointer hover:bg-gray-100"
        >
          Generate Image
        </button>
      </form>

      {/* Right Column */}
      <div className="w-full max-w-lg p-4 bg-white border rounded flex flex-col">
        <h2 className="text-base mb-4">Generated Image</h2>
        <div className="flex-1 flex items-center justify-center text-sm text-gray-600">
          <p>Enter a description and click generate to get started...</p>
        </div>
      </div>
    </div>
  );
};

export default GenerateImages;
