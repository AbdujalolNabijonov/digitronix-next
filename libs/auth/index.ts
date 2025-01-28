import { initializeApollo } from "@/apollo/client";
import { userVar } from "@/apollo/store";
import { SIGN_UP } from "@/apollo/user/mutation";
import { sweetMixinErrorAlert } from "../sweetAlert";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../types/customJwtPayload";
import { LOG_IN } from "@/apollo/user/query";

export function getJwtToken() {
    if (typeof window !== "undefined") {
        return localStorage.getItem("accessToken") ?? ""
    }
}

export async function signUp({ nick, password, email, phone, type }: { nick: string, password: string, phone: string, email: string, type: string }) {
    try {
        const { jwtToken } = await requestSignUpJwtToken({ nick, password, phone, email, type })
        if (jwtToken) {
            updateStorage({ jwtToken })
            updateUserInfo(jwtToken)
        }
    } catch (err: any) {
        console.warn("login err", err);
        logOut();
    }
}

export async function logIn({ nick, email, password }: { nick: string, email: string, password: string }) {
    try {
        const { jwtToken } = await requestJwtToken({ nick, email, password });
        if (jwtToken) {
            updateStorage({ jwtToken })
            updateUserInfo(jwtToken)
        }
    } catch (err: any) {
        console.warn("login err", err);
        logOut()
        throw err
    }
}

export const updateStorage = ({ jwtToken }: { jwtToken: any }) => {
    setJwtToken(jwtToken);
    window.localStorage.setItem("login", Date.now().toString())
}

export function setJwtToken(jwtToken: any) {
    localStorage.setItem("accessToken", jwtToken)
}

export const updateUserInfo = async (jwtToken: any) => {
    const claims = jwtDecode<CustomJwtPayload>(jwtToken);
    userVar({
        _id: claims._id || "",
        memberEmail: claims.memberEmail || '',
        memberType: claims.memberType || "",
        memberStatus: claims.memberStatus || "",
        memberAuthType: claims.memberAuthType || "",
        memberPhone: claims.memberPhone || "",
        memberNick: claims.memberNick || "",
        memberFullName: claims.memberFullName || '',
        memberImage: claims.memberImage === null || claims.memberImage === "undefined" ?
            "/img/profile/defaultuser.svg" :
            claims.memberImage
        ,
        memberAddress: claims.memberAddress || "",
        memberDesc: claims.memberDesc || "",
        memberProducts: claims.memberProducts || 0,
        memberArticles: claims.memberArticles || 0,
        memberFollowers: claims.memberFollowers || 0,
        memberFollowings: claims.memberFollowings || 0,
        memberPoints: claims.memberPoints || 0,
        memberLikes: claims.memberLikes || 0,
        memberViews: claims.memberViews || 0,
        memberComments: claims.memberComments || 0,
        memberRank: claims.memberRank || 0,
        memberWarnings: claims.memberWarnings || 0,
        memberBlocks: claims.memberBlocks || 0
    })
}

const requestSignUpJwtToken = async ({ nick, password, phone, email, type }:
    {
        nick: string,
        password: string,
        email: string,
        phone: string,
        type: string
    }) => {
    const apolloClient = await initializeApollo()
    try {
        const result = await apolloClient.mutate({
            mutation: SIGN_UP,
            variables: { input: { memberNick: nick, memberEmail: email, memberPassword: password, memberPhone: phone, memberType: type } },
            fetchPolicy: "network-only"
        })
        console.log("---------login--------")
        const { accessToken } = result?.data?.signup;
        return { jwtToken: accessToken }
    } catch (err: any) {
        console.log('request token err', err.graphQLErrors)
        switch (err.graphQLErrors[0].message) {
            case 'wrong password, try again':
                await sweetMixinErrorAlert('Please check your password again');
                break;
            case 'Definer: user has been blocked!':
                await sweetMixinErrorAlert('User has been blocked!');
                break;
        }
        throw new Error('token error')
    }
}

export const requestJwtToken = async ({ nick, email, password }: { nick: string, email: string, password: string }): Promise<{ jwtToken: any }> => {
    const apolloClient = await initializeApollo();
    try {
        const result = await apolloClient.query({
            query: LOG_IN,
            variables: { input: { memberNick:nick, memberEmail:email, memberPassword:password } },
            fetchPolicy: "network-only"
        })

        const { accessToken } = result.data.login;
        return { jwtToken: accessToken }
    } catch (err: any) {
        console.log("Error, requestJwtToken:", err.graphQLErrors);
        switch (err.graphQLErrors[0].message) {
            case 'Wrong password, try again':
                await sweetMixinErrorAlert('Please check your password again');
                break;
            case 'Definer: user has been blocked!':
                await sweetMixinErrorAlert('User has been blocked!');
                break;
        }
        throw new Error('token error')
    }
}


export const logOut = () => {
    deleteStorage()
    deleteUserInfo()
}

const deleteStorage = () => {
    localStorage.removeItem("accessToken");
    window.localStorage.setItem("logout", Date.now().toString())
}

const deleteUserInfo = () => {
    userVar({
        _id: '',
        memberEmail: '',
        memberType: '',
        memberStatus: '',
        memberAuthType: '',
        memberPhone: '',
        memberNick: '',
        memberFullName: '',
        memberImage: '',
        memberAddress: '',
        memberDesc: '',
        memberProducts: 0,
        memberArticles: 0,
        memberFollowers: 0,
        memberFollowings: 0,
        memberPoints: 0,
        memberLikes: 0,
        memberViews: 0,
        memberComments: 0,
        memberRank: 0,
        memberWarnings: 0,
        memberBlocks: 0
    })
}