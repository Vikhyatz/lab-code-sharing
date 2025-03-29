import connectDb from "@/app/db/connectDb"
import code from "@/app/models/code"

export async function GET(request) {
    connectDb();
    const searchParams = request.nextUrl.searchParams;
    const codeHeading = searchParams.get("codeHeading");
    const codeContent = searchParams.get("code");

    const saveCode = await code.create({
        codeHeading: codeHeading,
        code: codeContent
    })
    console.log(saveCode);

    return new Response(JSON.stringify(saveCode), {status: 200});
}