
export default async function AuthPostImage(query,inputUrl) {

    const accessToken = await localStorage.getItem("accessToken");

    const url_prefix = 'http://localhost:8000/';

    const url = url_prefix + inputUrl;

    const request = {
        method: 'POST',
        // headers: {  
        //     // 'Content-Type': 'application/json',
        //             'Authorization': 'Bearer ' + accessToken
        // },
        body: query,
        // Vary: 'Accept',
        // Authenticate: "Bearer realm=api",
        mode: 'cors' // remove for deployment
    }

    try {
        console.log('cp0: ' );

        const result = await fetch(url, request);
        // const result = await fetch(url);

        console.log('cp1: ' + result);
        if (result.status >= 200 && result.status < 300){
            const result_js = await result.json();
            // console.log("123213")
            // console.log(result_js);

            return [200, result_js];
        }
        else{
            console.log("L");
            const result_js = await result.json();

            // console.log(result.statusText);
            // console.log(result.json());
            // console.log(result.detail)



            return [result.status, result_js];
        }
    }
    catch(err){
        console.log(err.message);
        return ['error', err.message];
    }
    return null;
}