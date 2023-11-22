
import React, { useEffect, useState } from "react"
import Post from './../../../pages/api/Post';
import { APIContext, useAPIContext } from "../../../contexts/APIContexts";
import { useNavigate } from "react-router-dom";
// return default 
import { useContext } from "react";
import AuthGet from "../../../pages/api/AuthGet";

export default function() {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const [error, setError] = useState("");

    // const
    const navigate = useNavigate();
    // const { setAccessToken, setUserInfo, setRefreshToken, 
    //         accessToken,    userInfo,   refreshToken } = useContext(useAPIContext());
    const { userInfo, setUserInfo } = useContext(APIContext);
    const { accessToken,  setAccessToken} = useContext(APIContext);
    const { refreshToken,  setRefreshToken} = useContext(APIContext);


    async function submit(e){
        e.preventDefault();
        const query = {"username": username, "password": password}
        const result = await Post(query,"api/login/token/");
        
        // if (result)
        console.log(result)
        if (result[0] !== 200) {
            
            console.log()
            setError(result[1].detail)
        }
        else{
            console.log('success');
            // console.log(result[1].access)
            // console.log(result[1].refresh)

            // console.log(accessToken);
            // console.log(refreshToken);

            setUserInfo({user:"logged-in"});
            // const val = await setAccessToken("poppop");
            setAccessToken(result[1].access);
            setRefreshToken(result[1].refresh);
            // console.log(accessToken);
            // console.log("g")
            // console.log(refreshToken);

            // console.log(userInfo);

            localStorage.setItem('accessToken', result[1].access);
            localStorage.setItem('refreshToken', result[1].refresh);

            const user = await AuthGet('accounts/view-user-profile/');
            console.log(user[1][0]);
            localStorage.setItem("userInfo", JSON.stringify(user[1][0]));

            const ass = await localStorage.getItem("userInfo");
            setUserInfo(user[1][0]);
            console.log(userInfo);

            
            

            navigate("/");
            
        }

    }

    useEffect(() => {
        console.log(userInfo)
        const ass = localStorage.getItem("userInfo");
        console.log(ass)
    }

    )

    return    (            
    <form className="login-form" onSubmit={submit}>
        <div className="email-row">
        <label className="form-label">Username</label>
        <input
            type="text"
            required
            name="Username"
            placeholder="Username"
            onChange={(e) => {setUsername(e.target.value);}}
        />

        </div>
        <div className="password-row">
        <label className="form-label">Password</label>
        <input
            type="password"
            required
            name="password"
            placeholder="Password"
            onChange={(e) => {setPassword(e.target.value);}}
        />
        </div>
        {error && <p>{error}</p>}
        <div className="submit-button-row">
        <span className="form-label"></span>
        <div className="button-input">
            <button type="submit" className="btn2">Log in</button>
        </div>
        </div>
    </form>
    )

}