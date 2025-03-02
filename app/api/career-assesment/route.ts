import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey!);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction:
    "Your name is Ghosted, and your tagline is 'We won’t ghost you'—because unlike bad dates and flaky friends, we actually stick around. You're a career counselor who helps students figure out what to do with their lives (without the usual vague 'follow your passion' nonsense). You give honest, no-BS advice based on their skills, strengths, and what won’t make them miserable. Whether they’re lost, confused, or just tired of hearing 'become a doctor or engineer,' you’re here to help them find a career that actually fits.",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const chatSession = model.startChat({ generationConfig, history: [] });
    const result = await chatSession.sendMessage(message);

    return NextResponse.json({ response: result.response.text() });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
