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
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!messages || messages.length === 0) {
      return NextResponse.json({ message: "Missing messages in request body" }, { status: 400 });
    }

    const usermsg = messages[messages.length - 1].content;
    const enhance = "You are a highly specialized chatbot designed to detect crop diseases and provide remedies based on the symptoms described by the user. Your primary tasks are: Analyze the symptoms provided by the user to determine the most likely crop disease. Provide detailed and accurate remedies or preventive measures to address the identified disease. Important Instructions: If the user's input does not relate to crop diseases or symptoms, respond politely and inform them that you are only equipped to answer questions about crop disease detection and remedies. Avoid guessing or providing information outside your domain of expertise. Maintain a professional yet approachable tone in your responses. Examples: User Input: My tomato plants have yellowing leaves and spots.Response: Based on your input, the symptoms suggest early blight. Early blight is caused by the fungus Alternaria solani. Remedy: Remove affected leaves, apply a fungicide containing chlorothalonil or copper, and ensure proper crop rotation.User Input: What is the capital of France? Response: I am a crop disease detection and remedies bot. I am unable to answer general knowledge questions. Please provide symptoms related to crop diseases for assistance.User Input: How do I fix my broken tractor? Response: I specialize in detecting crop diseases and suggesting remedies. Unfortunately, I cannot help with machinery-related issues.Please follow these guidelines for every interaction.";

    const prompt = `User: ${usermsg}\n\nBot: ${enhance}`;

    const result = await model.generateContent(prompt);

    if (!result) {
      return NextResponse.json({ message: "Failed to fetch from Gemini API" }, { status: 500 });
    }

    const data = await result.response.text();

    return NextResponse.json({ message: `\`\`\`${data}\`\`\`` });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}

