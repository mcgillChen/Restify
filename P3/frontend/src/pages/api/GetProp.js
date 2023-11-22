
export default async function GetProp(query) {

    const url_prefix = 'http://localhost:8000';

    const url = url_prefix + "/prop/search/";

    const request = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(
            query
        ),
        
        mode: 'cors'
        
        
    }

    try {
        // console.log('cp0: ' );

        const result = await fetch(url, request);
        // const result = await fetch(url);

        // console.log('cp1: ' + result);
        if (result.status >= 200 && result.status < 300){
            const result_js = await result.json();
            // console.log("123213")
            // console.log(result_js);

            return result_js;
        }
        else{
            console.log("L");

            // console.log(result.statusText);
            console.log(result);


            return null;
        }
    }
    catch(err){
        console.log(err.message);
    }
    return null;

}