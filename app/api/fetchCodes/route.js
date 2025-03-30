import connectDb from "@/app/db/connectDb"
import code from "@/app/models/code"

export async function GET(request){
    connectDb();
    const allCodes = await code.find();
    // console.log(allCodes);

    return new Response(JSON.stringify({ allCodes }), {status: 200})
}