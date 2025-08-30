
import { GoogleGenAI } from "@google/genai"
import { marked, Marked } from "marked";


export async function GET(request) {

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");
    const code = searchParams.get('code')
    const codeHead = searchParams.get("codeHead")

    // creating a final query with the mix of code written, the code heading and the query which the user asked!
    const finalQuery = `You are the teacher for coding, languages like java, python, cpp, dsa and all. Your classmates will ask you questions about their code, i want the answers to be more like a cool friend answering like a bro. 
    Here is the code they wrote: 
    ${code} 

    Code Heading: ${codeHead} 

    Their question: ${query}`;

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_APIKEY })

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: finalQuery,
    });

    const convertedText = marked.parse(response.text)

    return new Response(JSON.stringify({ message: convertedText }, { status: 200 }));



}