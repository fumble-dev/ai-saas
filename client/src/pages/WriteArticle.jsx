import React, { useState } from "react";

const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: "Short (500-800 words)" },
    { length: 1200, text: "Medium (800-1200 words)" },
    { length: 1600, text: "Long (1200+ words)" },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState("");

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
        <h1 className="text-base mb-4">Article Configuration</h1>

        <label className="block text-sm mb-1">Article Topic</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 text-sm border rounded outline-none mb-4"
          placeholder="Write here..."
          required
        />

        <label className="block text-sm mb-1">Article Length</label>
        <div className="flex flex-wrap gap-2 mb-4 text-sm">
          {articleLength.map((item, index) => (
            <span
              key={index}
              onClick={() => setSelectedLength(item)}
              className={`px-3 py-1 rounded-full border text-xs cursor-pointer ${
                selectedLength.text === item.text
                  ? "bg-gray-200 text-black border-gray-300"
                  : "text-gray-600 border-gray-400"
              }`}
            >
              {item.text}
            </span>
          ))}
        </div>

        <button
          type="submit"
          className="w-full p-2 text-sm border rounded cursor-pointer hover:bg-gray-100"
        >
          Generate Article
        </button>
      </form>

      {/* Right Column */}
      <div className="w-full max-w-lg p-4 bg-white border rounded flex flex-col">
        <h2 className="text-base mb-4">Generated Article</h2>
        <div className="flex-1 flex items-center justify-center text-sm text-gray-600">
          <p>Enter a topic and click generate to get started...</p>
        </div>
      </div>
    </div>
  );
};

export default WriteArticle;
