import connectDb from "@/app/db/connectDb"
import code from "@/app/models/code"

export async function POST(request) {
    connectDb();

    const body = await request.json();
    console.log(body)
    const { key, lang, codeContent, codeHeading } = body;


    if (key == process.env.SECRET_KEY) {
        const data = {
            codeHeading: codeHeading,
            code: codeContent,
        }

        // adding lang if it is not null or undefined (basically saved for second year with diff languages)
        if (lang !== undefined && lang !== null) {
            data.lang = lang;
        }

        const saveCode = await code.create(data)


        return new Response(JSON.stringify({ message: "authorised and saved" }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ message: "not authorised" }), { status: 403 })
    }



}