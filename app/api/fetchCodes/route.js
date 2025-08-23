import connectDb from "@/app/db/connectDb"
import code from "@/app/models/code"

export async function GET(request) {
    connectDb();

    const searchParams = request.nextUrl.searchParams;
    const lang = searchParams.get('lang');
    console.log(lang)

    const allCodes = await code.find();

    if (lang != null) {
        // apply language filter
        const langFilter = allCodes.filter((code) => (code.lang == lang))
        return new Response(JSON.stringify({ langFilter }), { status: 200 })
    }
    else {
        const firstYear = allCodes.filter((code) => (code.lang == null))
        return new Response(JSON.stringify({ firstYear }), { status: 200 })
    }


}