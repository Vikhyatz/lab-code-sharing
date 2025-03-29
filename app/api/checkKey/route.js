import connectDb from "@/app/db/connectDb"
import code from "@/app/models/code"

export async function GET(request){
    connectDb();
    const searchParams = request.nextUrl.searchParams;
    const key = searchParams.get('key');

    if(key == process.env.SECRET_KEY){
        return new Response (JSON.stringify({message: "authorised"}), {status: 200});
    }else{
        return new Response (JSON.stringify({message: "not authorised"}), {status: 403})
    }
}