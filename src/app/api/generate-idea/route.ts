import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Inisialisasi Gemini client dengan API Key dari environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST() {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
    });

    const prompt = `
      Berikan saya satu ide proyek aplikasi web yang menarik untuk portofolio.
      Balas hanya dengan format JSON dengan kunci "name" untuk judul ide dan "description" untuk deskripsi singkatnya.
      Pastikan JSON valid dan tidak ada teks tambahan atau markdown.
      Tulis dalam Bahasa Indonesia
      Contoh: {"name": "Judul Ide", "description": "Deskripsi singkat ide."}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Membersihkan respons untuk memastikan formatnya adalah JSON string yang valid
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const idea = JSON.parse(text);

    return NextResponse.json(idea);
  } catch (error) {
    console.error("Error generating idea from Gemini:", error);
    return NextResponse.json(
      { error: "Failed to generate idea" },
      { status: 500 }
    );
  }
}
