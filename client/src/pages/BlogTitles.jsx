import React, { useState } from "react";

const BlogTitles = () => {
  const blogCategories = ['General','Technology','Business','Health','Lifestyle','Education','Travel','Food'];

  const [selectedCategory, setSelectedCategory] = useState('General'); // fixed name
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
        <h1 className="text-base mb-4">AI Title Generator</h1>

        <label className="block text-sm mb-1">Keyword</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)} 
          className="w-full p-2 text-sm border rounded outline-none mb-4"
          placeholder="Write here..."
          required
        />

        <label className="block text-sm mb-1">Category</label>
        <div className="flex flex-wrap gap-2 mb-4 text-sm">
          {blogCategories.map((item) => (
            <span
              key={item}
              onClick={() => setSelectedCategory(item)} // fixed name
              className={`px-3 py-1 rounded-full border text-xs cursor-pointer ${
                selectedCategory === item
                  ? "bg-gray-200 text-black border-gray-300"
                  : "text-gray-600 border-gray-400"
              }`}
            >
              {item}
            </span>
          ))}
        </div>

        <button
          type="submit"
          className="w-full p-2 text-sm border rounded cursor-pointer hover:bg-gray-100"
        >
          Generate Title
        </button>
      </form>

      {/* Right Column */}
      <div className="w-full max-w-lg p-4 bg-white border rounded flex flex-col">
        <h2 className="text-base mb-4">Generated Titles</h2>
        <div className="flex-1 flex items-center justify-center text-sm text-gray-600">
          <p>Enter a topic and click generate to get started...</p>
        </div>
      </div>
    </div>
  );
};

export default BlogTitles;
