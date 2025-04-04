import connectDb from "@/app/db/connectDb"
import code from "@/app/models/code"

export async function GET(request) {
    connectDb();
    const searchParams = request.nextUrl.searchParams;
    const key = searchParams.get('key');


    const codeHeading = searchParams.get("codeHeading");
    const codeContent = searchParams.get("code");
    const id = searchParams.get("id");

    if (key == process.env.SECRET_KEY) {
        const saveCode = await code.findOneAndUpdate(
            { _id: id },
            { codeHeading: codeHeading, code: codeContent },
            { upsert: true, new: true }
        )
        return new Response(JSON.stringify({ message: "authorised and code saved", savedCode: saveCode }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ message: "not authorised" }), { status: 403 })
    }
}