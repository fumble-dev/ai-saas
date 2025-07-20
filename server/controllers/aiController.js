import axios from "axios";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import { v2 as cloudinary } from "cloudinary";
import FormData from "form-data";

const FREE_USAGE_LIMIT = 10;

const incrementFreeUsage = async (userId) => {
  const user = await clerkClient.users.getUser(userId);
  const currentUsage = user.privateMetadata?.free_usage || 0;

  await clerkClient.users.updateUserMetadata(userId, {
    privateMetadata: {
      ...user.privateMetadata,
      free_usage: currentUsage + 1,
    },
  });
};

export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;
    const { plan, free_usage } = req;

    if (plan !== "premium" && free_usage >= FREE_USAGE_LIMIT) {
      return res.json({
        success: false,
        message: "Limit reached. Please upgrade to continue",
      });
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Write an article on the topic: "${prompt}". It should be around ${length} words.`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const content = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      return res.status(500).json({
        success: false,
        message: "Gemini returned no content",
      });
    }

    await sql`INSERT INTO creations(user_id, prompt, content, type)
              VALUES (${userId}, ${prompt}, ${content}, 'article')`;

    if (plan !== "premium") {
      await incrementFreeUsage(userId);
    }

    res.json({ success: true, content });
  } catch (error) {
    console.error("Gemini Error:", error?.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error?.response?.data?.error?.message || error.message,
    });
  }
};

export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;
    const { plan, free_usage } = req;

    if (plan !== "premium" && free_usage >= FREE_USAGE_LIMIT) {
      return res.json({
        success: false,
        message: "Limit reached. Please upgrade to continue",
      });
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Write blog titles on the topic: "${prompt}".`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const content = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      return res.status(500).json({
        success: false,
        message: "Gemini returned no content",
      });
    }

    await sql`INSERT INTO creations(user_id, prompt, content, type)
              VALUES (${userId}, ${prompt}, ${content}, 'blog-title')`;

    if (plan !== "premium") {
      await incrementFreeUsage(userId);
    }

    res.json({ success: true, content });
  } catch (error) {
    console.error("Gemini Error:", error?.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error?.response?.data?.error?.message || error.message,
    });
  }
};

export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;
    const { plan } = req;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for premium users",
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          "x-api-key": process.env.CLIPDROP_API_KEY,
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = `data:image/png;base64,${Buffer.from(data, "binary").toString("base64")}`;

    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    await sql`INSERT INTO creations(user_id, prompt, content, type, publish)
              VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})`;

    res.json({ success: true, secure_url });
  } catch (error) {
    console.error("Image Generation Error:", error?.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error?.response?.data?.error?.message || error.message,
    });
  }
};
