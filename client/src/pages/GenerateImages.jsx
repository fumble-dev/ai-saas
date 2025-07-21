import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

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
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Generate an image of ${input} in the style ${selectedStyle}`;
      setContent("");
      const { data } = await axios.post(
        "/api/ai/generate-image",
        { prompt, publish },
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
          disabled={loading || !input.trim()}
          type="submit"
          className={`w-full p-2 text-sm border rounded flex justify-center items-center gap-2 transition-all ${
            loading || !input.trim()
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          {loading && (
            <span className="w-4 h-4 border-2 border-t-transparent border-gray-600 rounded-full animate-spin"></span>
          )}
          {loading ? "Generating..." : "Generate Image"}
        </button>
      </form>

      {/* Right Column */}
      <div className="w-full max-w-lg p-4 bg-white border rounded flex flex-col">
        <h2 className="text-base mb-4">Generated Image</h2>
        {!content ? (
          <div className="flex-1 flex items-center justify-center text-sm text-gray-600">
            <p>Enter a topic and click generate to get started...</p>
          </div>
        ) : (
          <div className="mt-3 text-sm text-slate-600 flex justify-center">
            <img
              src={content}
              alt={`Generated image of ${input} in style ${selectedStyle}`}
              className="max-w-full max-h-[400px] object-contain rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateImages;
