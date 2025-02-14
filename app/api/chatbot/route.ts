import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing in environment variables");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { messages, b64 } = body;

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { message: "Missing messages in request body" },
        { status: 400 }
      );
    }

    const userMsg = messages[messages.length - 1].content;
    const enhance = `You are a highly specialized chatbot designed to detect crop and cattle diseases and provide remedies based on the symptoms described by the user. Your primary tasks are: Analyze the symptoms provided by the user to determine the most likely crop or cattle disease. Provide detailed and accurate remedies or preventive measures to address the identified disease. Important Instructions: If the user's input relates to crop diseases, focus on detecting and providing remedies for plant-related issues. If the user's input relates to cattle diseases, focus on detecting and providing remedies for livestock-related issues. If the user's input does not relate to crop or cattle diseases, respond politely and inform them that you are only equipped to answer questions about crop and cattle disease detection and remedies. Avoid guessing or providing information outside your domain of expertise. Maintain a professional yet approachable tone in your responses. Examples: User Input: My tomato plants have yellowing leaves and spots. Response: Based on your input, the symptoms suggest early blight. Early blight is caused by the fungus Alternaria solani. Remedy: Remove affected leaves, apply a fungicide containing chlorothalonil or copper, and ensure proper crop rotation. User Input: My cow has a cough and is not eating well. Response: Based on your input, the symptoms suggest a respiratory issue in cattle, potentially caused by bovine respiratory disease (BRD). Remedy: Consult a veterinarian for an accurate diagnosis and treatment. In the meantime, ensure your cow is in a well-ventilated area and maintain hydration. User Input: What is the capital of France? Response: I am a crop and cattle disease detection and remedies bot. I am unable to answer general knowledge questions. Please provide symptoms related to crop or cattle diseases for assistance. User Input: How do I fix my broken tractor? Response: I specialize in detecting crop and cattle diseases and suggesting remedies. Unfortunately, I cannot help with machinery-related issues. Please follow these guidelines for every interaction.`; // Your existing prompt

    if (b64) {
      // Handle image-based input
      const promptImage = [
        { text: `User uploaded an image: [Image Data]\n\nBot: ${enhance}` },
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: b64.split(",")[1], // Remove data URI prefix if present
          },
        },
      ];

      const result = await model.generateContent({
        contents: [{ role: "user", parts: promptImage }],
      });

      if (!result?.response) {
        return NextResponse.json(
          { message: "Failed to generate response" },
          { status: 500 }
        );
      }

      const response = await result.response.text();
      return NextResponse.json({ message: response });
    }

    // Handle text-based input
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: `User: ${userMsg}\n\nBot: ${enhance}` }],
        },
      ],
    });

    if (!result?.response) {
      return NextResponse.json(
        { message: "Failed to generate response" },
        { status: 500 }
      );
    }

    const response = await result.response.text();
    return NextResponse.json({ message: response });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
