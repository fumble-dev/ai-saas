import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveBackground = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", input);
      setContent("");

      const { data } = await axios.post(
        "/api/ai/remove-image-background",
        formData,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "Content-Type": "multipart/form-data",
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
          disabled={loading || !input}
          type="submit"
          className={`w-full p-2 text-sm border rounded flex justify-center items-center gap-2 transition-all ${
            loading || !input
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          {loading && (
            <span className="w-4 h-4 border-2 border-t-transparent border-gray-600 rounded-full animate-spin"></span>
          )}
          {loading ? "Generating..." : "Remove Background"}
        </button>
      </form>

      {/* Right Column */}
      <div className="w-full max-w-lg p-4 bg-white border rounded flex flex-col">
        <h2 className="text-base mb-4">Generated Image</h2>
        {!content ? (
          <div className="flex-1 flex items-center justify-center text-sm text-gray-600 min-h-[300px]">
            <p>Upload an image and click remove to see the result here.</p>
          </div>
        ) : (
          <div className="mt-3 text-sm text-slate-600 flex justify-center">
            <img
              src={content}
              alt="Generated image"
              className="max-w-full max-h-[400px] object-contain rounded shadow"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RemoveBackground;
