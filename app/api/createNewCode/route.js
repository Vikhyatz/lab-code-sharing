import connectDb from "@/app/db/connectDb"
import code from "@/app/models/code"

export async function GET(request) {
    connectDb();
    const searchParams = request.nextUrl.searchParams;
    const codeHeading = searchParams.get("codeHeading");
    const codeContent = searchParams.get("code");
    const key = searchParams.get("key");


    if (key == process.env.SECRET_KEY) {
        const saveCode = await code.create(
            { codeHeading: codeHeading, code: codeContent }
        )
        console.log(saveCode);

        return new Response(JSON.stringify({ messageg: "authorised and saved" }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ message: "not authorised" }), { status: 403 })
    }


}