import connectDb from '@/app/db/connectDb'
import code from '@/app/models/code'

export async function GET(request){
    connectDb();
    const searchParams = request.nextUrl.searchParams;
    const codeName = searchParams.get("codeName");

    const findCode = await code.findOne({codeHeading: codeName});


    if(findCode == null){
        return new Response(JSON.stringify({ message: "not found" }), {status: 404})
    }else{
        return new Response(JSON.stringify({ findCode }), {status: 200})
    }
}