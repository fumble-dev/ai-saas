import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: "Short (500-800 words)" },
    { length: 1200, text: "Medium (800-1200 words)" },
    { length: 1600, text: "Long (1200+ words)" },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Write an article about ${input} in ${selectedLength.text}`;
      setContent("");
      const { data } = await axios.post(
        "/api/ai/generate-article",
        { prompt, length: selectedLength.length },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
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
          disabled={loading || !input.trim()}
          type="submit"
          className={`w-full p-2 text-sm border rounded flex justify-center items-center gap-2 transition-all 
    ${
      loading || !input.trim()
        ? "opacity-50 cursor-not-allowed"
        : "hover:bg-gray-100"
    }`}
        >
          {loading && (
            <span className="w-4 h-4 border-2 border-t-transparent border-gray-600 rounded-full animate-spin"></span>
          )}
          {loading ? "Generating..." : "Generate Article"}
        </button>
      </form>

      {/* Right Column */}
      <div className="w-full max-w-lg p-4 bg-white border rounded flex flex-col">
        <h2 className="text-base mb-4">Generated Article</h2>
        {!content ? (
          <div className="flex-1 flex items-center justify-center text-sm text-gray-600">
            <p>Enter a topic and click generate to get started...</p>
          </div>
        ) : (
          <div className="mt-3 h-134 overflow-y-auto text-sm text-slate-600">
            <div className="reset-tw">
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WriteArticle;
