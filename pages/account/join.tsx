import React, { useCallback, useState } from "react";
import LayoutBasic from "@/libs/components/layouts/LayoutBasic";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Stack } from "@mui/material";
import { sweetErrorAlert, sweetTopSmallSuccessAlert } from "@/libs/sweetAlert";
import { logIn, signUp } from "@/libs/auth";
import { useRouter } from "next/router";
import { Messages } from "@/libs/config";
import { RemoveRedEyeRounded, VisibilityOffRounded } from "@mui/icons-material";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import useDeviceDetect from "@/libs/hooks/useDeviceDetector";
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
    const [inputType, setInputType] = useState<string>("password")
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
        let newValue = e.key.replace(/\D/g, '')
        if (input.phone) {
            newValue = input.phone + newValue
        }
        if (e.key == "Backspace") {
            newValue = newValue.slice(0, newValue.length - 1)
        }
        if (newValue.length < 12) {
            setInput({ ...input, phone: newValue })
        }
    }

    const handleHiddenPassword = (cond: boolean) => {
        if (cond) {
            setInputType("password")
        } else {
            setInputType("text")
        }
        setHidden(!hidden)
    }
    return (
        <>
            <Stack className="join-auth" alignItems={"center"} justifyContent={"center"}>
                <Stack className="authMain" >
                    <Box className="auth_container">
                        <Box className={"auth_signUp"} style={signIn ? {} : { transform: "translateX(100%)", opacity: "1", zIndex: "5" }}>
                            <Box className={"signUp_body"}>
                                <div className="login_title">Create Account</div>
                                <input type="text" id="floatingUser" placeholder="User Name" onChange={(e) => { setInput({ ...input, nick: e.target.value }) }} />
                                <input type="email" id="floatingEmail" placeholder="Email" onChange={(e) => { setInput({ ...input, email: e.target.value }) }} />
                                <input type="text" maxLength={11} id="floatingphone" placeholder="Phone Number" onKeyDown={validatePhoneNumber} value={input.phone} readOnly />
                                <input type="type" id="floatingpassword" placeholder="Password" onChange={(e) => { setInput({ ...input, password: e.target.value }) }} />
                                <input type="type" className="form-control" id="floatingre" placeholder="Re-enter Password" onKeyDown={handleKeyDownSignUp} onChange={(e) => { setCheckPassword(e.target.value) }} />
                                <Stack direction={"row"} gap={"10px"} alignItems={"center"}>
                                    <span className={'text'}>I want to be registered as:</span>
                                    <Stack direction={"row"} alignItems={"center"} gap={"10px"}>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        size="small"
                                                        name={'USER'}
                                                        onChange={checkUserTypeHandler}
                                                        checked={input.type === "USER"}
                                                    />
                                                }
                                                label="User"
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        size="small"
                                                        name={'RETAILER'}
                                                        onChange={checkUserTypeHandler}
                                                        checked={input.type === "RETAILER"}
                                                    />
                                                }
                                                label="Retailer"
                                            />
                                        </FormGroup>
                                    </Stack>
                                </Stack>
                                <Button className={"login-btn"} onClick={handleSignUpRequest} >Sign Up</Button>
                                {
                                    device === "mobile" ? (
                                        <Box sx={{marginTop:"20px"}} onClick={() => toggle(true)}>
                                            I'm already a member
                                        </Box>
                                    ) : null
                                }
                            </Box>
                        </Box>
                        <Box className={"auth_logIn"}>
                            <Box className={"logIn_body"} style={signIn ? {} : { transform: "translateX(100%)", display: "none" }}>
                                <div className="title">Sign in</div>
                                <div>
                                    <input type="text" id="floatinguser" placeholder="User Name" onChange={handleLogInUserName} />
                                </div>
                                <div className="form-floating" style={{ position: "relative" }}>
                                    <input type={inputType} className="form-control" id="floatingpassord" placeholder="Password" onKeyDown={handleKeyDownLogIn} onChange={(e) => setInput2({ ...input2, password: e.target.value })} />
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
                                            backgroundColor: "gray"
                                        }}>
                                        {hidden ? (<VisibilityOffRounded />) : (<RemoveRedEyeRounded />)}
                                    </Button>
                                </div>
                                <div className="warn">If you forget your password, you can log in with your signed up email address </div>
                                <Button onClick={handleLogInRequest}>Sign In</Button>
                                {
                                    device === "mobile" ? (
                                        <Box sx={{marginTop:"20px"}} onClick={() => toggle(false)}>
                                            Create an account
                                        </Box>
                                    ) : null
                                }
                            </Box>
                        </Box>
                        <Box className={"auth_overlay"} style={signIn ? { backgroundImage: 'url("/img/auth/2.png")' } : { transform: "translateX(-100%)", backgroundImage: 'url("/img/auth/1.png")' }}>
                            <Stack
                                alignItems={"center"}
                                flexDirection={"row"}
                                className={"overlay_body"}
                                style={signIn ? { transform: "translateX(-50%)" } : {}}
                            >
                                <Box className={"overlay"} style={signIn ? {} : { transform: "translate(0)" }}>
                                    <Box className="overlay_panel">
                                        <div className="left_overlay_title">Welcome Back!</div>
                                        <p>Enter your personal details and start journey with us</p>
                                        <Button onClick={() => toggle(true)}>
                                            I'm already a member
                                        </Button>
                                    </Box>
                                    <div className="overlay-wrapper"></div>
                                </Box>
                                <Box className={"righ_overlay"} style={signIn ? { transform: "translateX(0)" } : {}}>
                                    <Box className="overlay_panel">
                                        <div className="right_overlay_title ">Hello, Friend!</div>
                                        <p>To keep connected with us please login with your personal info</p>
                                        <Button onClick={() => toggle(false)}>
                                            Create an account
                                        </Button>
                                    </Box>
                                    <div className="overlay-wrapper"></div>
                                </Box>
                            </Stack>
                        </Box>
                    </Box>
                    <div className="auth-overlay"></div>
                </Stack>
            </Stack>
        </>
    )
}
export default LayoutBasic(Join)
