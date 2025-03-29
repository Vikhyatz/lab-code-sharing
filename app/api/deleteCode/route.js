import connectDb from "@/app/db/connectDb"
import code from "@/app/models/code"

export async function GET(request) {
    connectDb();
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const key = searchParams.get("key");

    if (key == process.env.SECRET_KEY) {
        const deleted = await code.findByIdAndDelete(id)

        return new Response(JSON.stringify({ message: `deleted code with id ${id}` }), { status: 200 })
    } else {
        return new Response(JSON.stringify({ message: "not authorised" }), { status: 403 })
    }

    
}