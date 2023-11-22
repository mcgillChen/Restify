import { createContext, useState } from 'react';

export const APIContext = createContext({
    userInfo: {user:"anonymous"},
    // setUserInfo: (input) => {this.userInfo.user = input},
    setUserInfo: () => {},


    accessToken: "",
    setAccessToken: () => {},

    refreshToken: "",
    setRefreshToken: () => {},
})

function useAPIContext() {
    const [accessToken, setAccessToken] = useState("at");
    const [refreshToken, setRefreshToken] = useState("rt");

    const [userInfo, setUserInfo] = useState({user:"anonymous"});

    return {
        accessToken, setAccessToken,
        refreshToken, setRefreshToken,
        userInfo, setUserInfo,
    }

}


export {useAPIContext};
