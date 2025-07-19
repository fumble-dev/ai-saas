import axios from "axios";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";

export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== 'premium' && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. Please upgrade to continue"
      });
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Write an article on the topic: "${prompt}". It should be around ${length} words.`
              }
            ]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const content = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      return res.status(500).json({
        success: false,
        message: "Gemini returned no content"
      });
    }

    await sql`INSERT INTO creations(user_id, prompt, content, type)
              VALUES (${userId}, ${prompt}, ${content}, 'article')`;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1
        }
      });
    }

    res.json({
      success: true,
      content
    });

  } catch (error) {
    console.error("Gemini Error:", error?.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error?.response?.data?.error?.message || error.message
    });
  }
};
