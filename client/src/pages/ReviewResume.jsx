import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
const ReviewResume = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("resume", input);
      setContent("");

      const { data } = await axios.post("/api/ai/resume-review", formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          "Content-Type": "multipart/form-data",
        },
      });

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
        <h1 className="text-base mb-4">Resume Reviewer</h1>

        <label className="block text-sm mb-1">Upload Resume</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setInput(e.target.files[0])}
          className="w-full p-2 text-sm border rounded outline-none "
          required
        />
        <p className="text-xs text-gray-500 font-light mb-2">
          Upload in PDF format only
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
          {loading ? "Reviewing..." : "Review Resume"}
        </button>
      </form>

      {/* Right Column */}
      <div className="w-full max-w-lg p-4 bg-white border rounded flex flex-col">
        <h2 className="text-base mb-4">Analysis Results</h2>
        {!content ? (
          <div className="flex-1 flex items-center justify-center text-sm text-gray-600">
            <p>Upload resume to get started...</p>
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

export default ReviewResume;
