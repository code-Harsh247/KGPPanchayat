import { NextResponse } from "next/server";
import Together from "together-ai";
import fs from "fs/promises"; // Use fs.promises for async file reading

const together = new Together({ apiKey: process.env.TOGETHER_AI_KEY });

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    if (!prompt) return NextResponse.json({ error: "Prompt is required" }, { status: 400 });

    // Read schema from file
    let schema = "No schema available";

    try {
      schema = await fs.readFile("schemaString.txt", "utf-8");
    } catch (error) {
      console.error("Error reading schema file:", error);
    }

    // Prepare the full prompt with schema
    const fullPrompt = `You are an AI that converts text to SQL. Here is the database schema:\n${schema}\n\nUser request: ${prompt}`;

    // Create a streaming response from Together AI
    const stream = await together.chat.completions.create({
      model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
      messages: [{ role: "user", content: fullPrompt }],
      stream: true,
    });

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content || "";
            controller.enqueue(encoder.encode(text));
          }
          controller.close();
        } catch (error) {
          console.error("Streaming error:", error);
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
