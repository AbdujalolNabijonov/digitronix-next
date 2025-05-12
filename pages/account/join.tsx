import React, { useCallback, useEffect, useState } from "react";
import LayoutBasic from "@/libs/components/layouts/LayoutBasic";
import { Box, Button, Divider, IconButton, Stack } from "@mui/material";
import { sweetErrorAlert, sweetTopSmallSuccessAlert } from "@/libs/sweetAlert";
import { logIn, signUp, updateStorage, updateUserInfo } from "@/libs/auth";
import { useRouter } from "next/router";
import { Messages } from "@/libs/config";
import { Circle, GitHub, RemoveRedEyeRounded, VisibilityOffRounded } from "@mui/icons-material";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GoogleLogin } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"
import WaterDropGrid from "@/libs/components/others/waterDropAnima";
import useDeviceDetect from "@/libs/hooks/useDeviceDetector";
import { useMutation } from "@apollo/client";
import { GOOGLE_AUTH, OTP_CONFIRM, OTP_REQUEST } from "@/apollo/user/mutation";
import { Member } from "@/libs/types/member/member";
import { OTPInput } from "@/libs/components/account/OTPInput";
export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

const Join = () => {
    //Initilizations
    const device = useDeviceDetect()
    const [input, setInput] = useState({ nick: '', phone: '', email: '', type: "USER", password: '', })
    const [signIn, toggle] = React.useState(true);
    const [checkPassword, setCheckPassword] = React.useState("");
    const [input2, setInput2] = useState({ nick: '', email: '', password: '' });
    const [hidden, setHidden] = useState<boolean>(true)
    const [rePasswordHidden, setRePasswordHidden] = useState<boolean>(true)
    const [inputType, setInputType] = useState<string>("password")
    const [otpShow, setOtpShow] = useState(false)
    const [inputType2, setInputType2] = useState<string>("password")
    const [readyRegisterBtn, setReadyRegisterBtn] = useState(true)
    const [rebuild, setRebuild] = useState(new Date())
    const [loadingBtn, setLoadingBtn] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (!input.email || !input.phone || !input.password || input.password !== checkPassword) {
            setReadyRegisterBtn(true)
        } else {
            setReadyRegisterBtn(false)
        }
    }, [input, rebuild])

    //Apollo Request
    const [googleLogin] = useMutation(GOOGLE_AUTH)
    const [otpRequest] = useMutation(OTP_REQUEST)
    const [otpConfirm] = useMutation(OTP_CONFIRM)

    //Handlers
    const handleSignUpRequest = async () => {
        try {
            if (!input.email || !input.phone || !input.password || input.password !== checkPassword) {
                await sweetErrorAlert("Please fill all fields and ensure passwords match!");
                return;
            }
            if (input.password !== checkPassword) {
                throw new Error("Password is not the same!")
            }
            await signUp(input);
            router.push("/")
        } catch (err: any) {
            console.log("handleSignUpRequest:", err.message)
            router.reload()
        }
    }
    const handleLogInRequest = useCallback(async () => {
        try {
            await logIn(input2);
            await sweetTopSmallSuccessAlert(Messages.success1)
            router.push("/")
        } catch (err: any) {
            console.log("handleLogInRequest:", err.message)
        }
    }, [input2])

    const handleLogInUserName = (e: any) => {
        if (!e.target.value.includes("@")) {
            setInput2({ ...input2, nick: e.target.value })
        } else {
            setInput2({ ...input2, email: e.target.value })
        }
    }
    const handleKeyDownLogIn = (e: any) => {
        if (e.key == "Enter") {
            handleLogInRequest()
        }
    }
    const validatePhoneNumber = (e: any) => {
        let value = e.target.value.replace(/\D/g, "");
        setInput(prev => ({ ...prev, phone: value }));
        setRebuild(new Date())
    }

    const handleHiddenPassword = (cond: boolean) => {
        if (cond) {
            setInputType("password")
        } else {
            setInputType("text")
        }
        setHidden(!hidden)
    }
    const handleHiddenRePassword = (cond: boolean) => {
        if (cond) {
            setInputType2("password")
        } else {
            setInputType2("text")
        }
        setRePasswordHidden(!rePasswordHidden)
    }

    const handleShowOtp = async () => {
        try {
            setOtpShow(!otpShow)
            const { data } = await otpRequest({
                variables: {
                    input: input.email
                }
            })
        } catch (err: any) {
            console.log(err)
        }
    }
    const backtoRegister = () => {
        setOtpShow(false)
    }
    const googleAuthLogin = async ({ name, email }: { name: string, email: string }) => {
        try {
            const { data } = await googleLogin({ variables: { input: { name, email } } })
            const jwtToken = data.googleAuthLogin as String;
            if (jwtToken) {
                updateStorage({ jwtToken });
                updateUserInfo(jwtToken);
                router.push("/");
            } else {
                throw new Error("Not authorized")
            }
        } catch (err: any) {
            await sweetErrorAlert(err.message)
        }
    }
    const handleVerifiedCodes = async (e: any) => {
        try {
            const { data } = await otpConfirm({
                variables: { input: e }
            })
            if (data.checkOTPConfirmation.email_verified) {
                setLoadingBtn(true)
                await handleSignUpRequest()
            }
        } catch (err: any) {
            await sweetErrorAlert(err);
        }
    }
    return (
        <Stack flexDirection={"row"} className="bg-[#0F172B] h-[100vh] relative overflow-hidden" justifyContent={"center"}>
            <Box className="absolute">
                <WaterDropGrid />
            </Box>
            <Stack className="join-auth" alignItems={"center"} justifyContent={"center"}>
                <Stack className="authMain" >
                    <Box className="auth_container">
                        <Box className={"auth_signUp"} style={signIn ? {} : { transform: "translateX(100%)", opacity: "1", zIndex: "5" }}>
                            {
                                otpShow ? (
                                    <OTPInput handleVerifiedCodes={handleVerifiedCodes} backto={backtoRegister} loading={loadingBtn} />
                                ) : (
                                    <Box className={"signUp_body"}>
                                        <div className="login_title">Create Account</div>
                                        <input
                                            type="text"
                                            id="floatingEmail"
                                            placeholder="Name"
                                            onChange={(e) => {
                                                setInput({ ...input, nick: e.target.value })
                                                setRebuild(new Date())
                                            }}
                                            value={input.nick}
                                            required
                                        />
                                        <input
                                            type="email"
                                            id="floatingEmail"
                                            placeholder="Email"
                                            onChange={(e) => {
                                                setInput({ ...input, email: e.target.value })
                                                setRebuild(new Date())
                                            }}
                                            value={input.email}
                                            required
                                        />
                                        <input
                                            type="text"
                                            maxLength={11}
                                            id="floatingphone"
                                            placeholder="Phone Number"
                                            onChange={validatePhoneNumber}
                                            value={input.phone}
                                            required
                                        />
                                        <Stack justifyContent={"space-between"} flexDirection={"row"} gap={"10px"}>
                                            <div className="form-floating relative w-full">
                                                <input
                                                    type={inputType}
                                                    className="form-control"
                                                    id="floatingpassord"
                                                    placeholder="Password"
                                                    onChange={(e) => {
                                                        setInput({ ...input, password: e.target.value })
                                                        setRebuild(new Date())
                                                    }} required />
                                                <Button
                                                    onClick={() => handleHiddenPassword(!hidden)}
                                                    style={{
                                                        position: "absolute",
                                                        right: "10px",
                                                        height: "30px",
                                                        width: "30px",
                                                        borderRadius: "50%",
                                                        top: "17px",
                                                        padding: "5px",
                                                        backgroundColor: "#aaaaaa"
                                                    }}>
                                                    {hidden ? (<VisibilityOffRounded />) : (<RemoveRedEyeRounded />)}
                                                </Button>
                                            </div>
                                            <div className="form-floating relative w-full">
                                                <input type={inputType2} className="form-control" id="floatingpassord" placeholder="Check Password" onChange={(e) => {
                                                    setCheckPassword(e.target.value)
                                                    setRebuild(new Date())
                                                }} required />
                                                <Button
                                                    onClick={() => handleHiddenRePassword(!rePasswordHidden)}
                                                    style={{
                                                        position: "absolute",
                                                        right: "10px",
                                                        height: "30px",
                                                        width: "30px",
                                                        borderRadius: "50%",
                                                        top: "17px",
                                                        padding: "5px",
                                                        backgroundColor: "#aaaaaa"
                                                    }}>
                                                    {rePasswordHidden ? (<VisibilityOffRounded />) : (<RemoveRedEyeRounded />)}
                                                </Button>
                                            </div>
                                        </Stack>
                                        {
                                            readyRegisterBtn?(
                                                <button
                                                disabled
                                                className="tarcking-wider font-bold text-white w-[90%] mt-2 py-2 text-xl bg-gray-500 rounded cursor-not-allowed"
                                            >
                                                Verify Email
                                            </button>
                                            ):(
                                                <button
                                                onClick={handleShowOtp}
                                                className="tarcking-wider font-bold text-white w-[90%] mt-2 py-2 text-xl bg-[#D77B3D] rounded hover:bg-[#AF3E45] transition duration-300 cursor-pointer"
                                            >
                                                Verify Email
                                            </button>
                                            )
                                        }
                                        <Box className="self-start mt-3 text-sm text-gray-300">
                                            Have an account already? <a onClick={() => toggle(true)} className="cursor-pointer text-red-200 tracking-wider">Sign In</a>
                                        </Box>
                                    </Box>
                                )
                            }
                        </Box>
                        <Stack className={"auth_logIn"} justifyContent={"center"}>
                            <Box className={"logIn_body"} style={signIn ? {} : { transform: "translateX(100%)", display: "none" }}>
                                <div className="title mb-3">Sign in</div>
                                <input type="text" className="mb-2" id="floatinguser" placeholder="Email" onChange={handleLogInUserName} required />
                                <Stack className="w-full" style={{ position: "relative" }}>
                                    <input
                                        type={inputType}
                                        className="w-full m-0"
                                        id="floatingpassord"
                                        placeholder="Password"
                                        onKeyDown={handleKeyDownLogIn}
                                        onChange={(e) => setInput2({ ...input2, password: e.target.value })}
                                        required
                                    />
                                    <div className="self-end mb-4 text-sm text-blue-200 tracking-wider">Forgot password?</div>
                                    <Button
                                        onClick={() => handleHiddenPassword(!hidden)}
                                        style={{
                                            position: "absolute",
                                            right: "10px",
                                            height: "30px",
                                            width: "30px",
                                            borderRadius: "50%",
                                            top: "10px",
                                            padding: "5px",
                                            backgroundColor: "#aaaaaa"
                                        }}>
                                        {hidden ? (<VisibilityOffRounded />) : (<RemoveRedEyeRounded />)}
                                    </Button>
                                </Stack>
                                <button
                                    onClick={handleLogInRequest}
                                    className="tarcking-wider font-bold text-white w-[90%] mt-2 py-2 text-xl bg-[#D77B3D] rounded hover:bg-[#AF3E45] transition duration-300 cursor-pointer"
                                >
                                    Sign In
                                </button>
                                <Box className="self-start mt-3 text-sm text-gray-300">
                                    Don't you have an account yet? <a onClick={() => toggle(false)} className="cursor-pointer text-red-200 tracking-wider">Create an account</a>
                                </Box>
                                <Stack sx={{ width: "100%", marginTop: "30px" }} flexDirection={"row"} gap={"10px"} alignItems={"center"}>
                                    <Divider sx={{ borderColor: "white", flex: "1" }} orientation="horizontal" />
                                    <Box>
                                        OR
                                    </Box>
                                    <Divider sx={{ borderColor: "white", flex: "1" }} orientation="horizontal" />
                                </Stack>
                                <Stack flexDirection={"row"} justifyContent={"space-between"} sx={{ marginTop: '20px' }} gap={"20px"}>
                                    <Button
                                        className="text-white"
                                        color="secondary"
                                        variant="outlined"
                                        startIcon={
                                            <GoogleLogin
                                                onSuccess={async (code) => {
                                                    const member = jwtDecode(code.credential as string) as any;
                                                    await googleAuthLogin({ name: member.name, email: member.email })
                                                }
                                                }
                                                onError={() => console.log("")}
                                                shape="circle"
                                                type="icon"
                                            />
                                        }
                                        sx={{ color: "whitesmoke", flex: 1 }}
                                    >
                                        Google
                                    </Button>
                                    <Button startIcon={<GitHub />} variant="outlined" color="warning" sx={{ color: "whitesmoke", flex: 1 }}>
                                        GitHub
                                    </Button>
                                </Stack>
                            </Box>
                        </Stack>
                        <Box className={"auth_overlay"} style={signIn ? { backgroundImage: 'url("/img/auth/2.png")' } : { transform: "translateX(-100%)", backgroundImage: 'url("/img/auth/1.png")' }}>
                        </Box>
                    </Box>
                </Stack>
            </Stack>
        </Stack>
    )
}
export default LayoutBasic(Join)
