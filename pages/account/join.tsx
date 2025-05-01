import React, { useCallback, useState } from "react";
import LayoutBasic from "@/libs/components/layouts/LayoutBasic";
import { Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, Stack } from "@mui/material";
import { sweetErrorAlert, sweetTopSmallSuccessAlert } from "@/libs/sweetAlert";
import { logIn, signUp } from "@/libs/auth";
import { useRouter } from "next/router";
import { Messages } from "@/libs/config";
import { GitHub, Google, RemoveRedEyeRounded, VisibilityOffRounded } from "@mui/icons-material";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import useDeviceDetect from "@/libs/hooks/useDeviceDetector";
import { useGoogleLogin } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"
import WaterDropGrid from "@/libs/components/others/waterDropAnima";
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
    const [inputType2, setInputType2] = useState<string>("password")
    const router = useRouter()

    //Handlers
    const handleSignUpRequest = async () => {
        try {
            if (input.password !== checkPassword) {
                throw new Error("Password is not the same!")
            }
            if (!handleEmailValidator(input.email)) {
                throw new Error("Enter valid email address!")
            }
            await signUp(input);
            router.push("/")
        } catch (err: any) {
            console.log("handleSignUpRequest:", err.message)
            sweetErrorAlert(err.message)
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

    const googleAuth = useGoogleLogin({
        onSuccess: (code) => {
            const member = jwtDecode(code.access_token);
            console.log("user:", member)
        },
        onError: () => {
            console.log("Failed to login")
        }
    })

    const handleLogInUserName = (e: any) => {
        if (!e.target.value.includes("@")) {
            setInput2({ ...input2, nick: e.target.value })
        } else {
            setInput2({ ...input2, email: e.target.value })
        }
    }
    const handleEmailValidator = async (text: string) => {
        const validate_emails = ["gmail", "yahoo", "mail", "yandex", "hotman", "outlook", "icloud", "gmx", "hubspot", "pm"]
        const valid = validate_emails.some((ele) => text.includes(ele));
        let cat: boolean = false;
        if (valid) {
            cat = text.includes("@")
        }
        return cat && valid
    }
    const handleKeyDownSignUp = (e: any) => {
        if (e.key == "Enter") {
            handleSignUpRequest()
        }
    }
    const handleKeyDownLogIn = (e: any) => {
        if (e.key == "Enter") {
            handleLogInRequest()
        }
    }

    const checkUserTypeHandler = (event: any) => {
        setInput({ ...input, type: event.target.name })
    }
    const validatePhoneNumber = (e: any) => {
        let value = e.target.value.replace(/\D/g, "");
        setInput(prev => ({ ...prev, phone: value }));
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
        setRePasswordHidden(!hidden)
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
                            <Box className={"signUp_body"}>
                                <div className="login_title">Create Account</div>
                                <input type="email" id="floatingEmail" placeholder="Email" onChange={(e) => { setInput({ ...input, email: e.target.value }) }} />
                                <input type="text" maxLength={11} id="floatingphone" placeholder="Phone Number" onChange={validatePhoneNumber} value={input.phone} />
                                <div className="form-floating relative w-full">
                                    <input type={inputType} className="form-control" id="floatingpassord" placeholder="Password" onKeyDown={handleKeyDownSignUp} onChange={(e) => { setInput({ ...input, password: e.target.value }) }} required />
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
                                    <input type={inputType2} className="form-control" id="floatingpassord" placeholder="Re-enter Password" onChange={(e) => { setCheckPassword(e.target.value) }} required />
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
                                <Button onClick={handleSignUpRequest} className="tarcking-wider font-bold text-white w-full mt-2 py-3 text-xl" variant="contained" color="warning" >Sign Up</Button>
                                <Box className="self-start mt-3 text-sm text-gray-300">
                                    Have an account already? <a onClick={() => toggle(true)} className="cursor-pointer text-red-200 tracking-wider">Sign In</a>
                                </Box>
                                <Stack sx={{ width: "100%" }} flexDirection={"row"} gap={"10px"} alignItems={"center"} className="mt-2">
                                    <Divider sx={{ borderColor: "white", flex: "1" }} orientation="horizontal" />
                                    <Box>
                                        OR
                                    </Box>
                                    <Divider sx={{ borderColor: "white", flex: "1" }} orientation="horizontal" />
                                </Stack>
                                <Stack flexDirection={"row"} justifyContent={"space-between"} sx={{ marginTop: '20px' }} gap={"20px"}>
                                    <Button startIcon={<Google />} variant="outlined" onClick={() => googleAuth()} sx={{ color: "white", flex: 1 }}>
                                        Google
                                    </Button>
                                    <Button startIcon={<GitHub />} variant="outlined" color="warning" sx={{ color: "whitesmoke", flex: 1 }}>
                                        GitHub
                                    </Button>
                                </Stack>
                            </Box>
                        </Box>
                        <Box className={"auth_logIn"}>
                            <Box className={"logIn_body"} style={signIn ? {} : { transform: "translateX(100%)", display: "none" }}>
                                <div className="title">Sign in</div>
                                <input type="text" id="floatinguser" placeholder="User Name" onChange={handleLogInUserName} required />
                                <div className="form-floating" style={{ position: "relative" }}>
                                    <input type={inputType} className="form-control" id="floatingpassord" placeholder="Password" onKeyDown={handleKeyDownLogIn} onChange={(e) => setInput2({ ...input2, password: e.target.value })} required />
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
                                <div className="warn">If you forget your password, you can log in with your signed up email address </div>
                                <Button onClick={handleLogInRequest} variant="contained" color="warning" className="h-[40px] w-full text-white font-bold tracking-wider text-xl">Sign In</Button>
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
                                    <Button startIcon={<Google />} variant="outlined" onClick={() => googleAuth()} sx={{ color: "white", flex: 1 }}>
                                        Google
                                    </Button>
                                    <Button startIcon={<GitHub />} variant="outlined" color="warning" sx={{ color: "whitesmoke", flex: 1 }}>
                                        GitHub
                                    </Button>
                                </Stack>
                            </Box>
                        </Box>
                        <Box className={"auth_overlay"} style={signIn ? { backgroundImage: 'url("/img/auth/2.png")' } : { transform: "translateX(-100%)", backgroundImage: 'url("/img/auth/1.png")' }}>
                        </Box>
                    </Box>
                </Stack>
            </Stack>
        </Stack>
    )
}
export default LayoutBasic(Join)
