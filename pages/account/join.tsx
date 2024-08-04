import LayoutBasic from "@/libs/components/layouts/LayoutBasic";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Stack } from "@mui/material";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";

const Join = () => {
    //Initilizations
    const [signIn, toggle] = React.useState(true);
    const [mb_nick, setMb_nick] = React.useState('');
    const [mb_phone, setMb_phone] = React.useState("");
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState("");
    const [checkPassword, setCheckPassword] = React.useState("");
    const [login_mb_nick, set_login_mb_nick] = useState<string>("")
    const [login_mb_email, set_login_mb_email] = useState<string>("")
    const [login_mb_password, set_login_mb_password] = useState<string>("")
    let resizeWidth: number = 32;
    //LifeCircle
    useEffect(() => {
        resizeWidth = window.screen.width
    }, [])
    //Handlers
    const handleSignUpRequest = async () => {
        try {
            const isFullFilled = (mb_nick != "" && email != "") && (password != "" && checkPassword != "")
            alert("hello")

        } catch (err: any) {
        }
    }
    async function handleLogInRequest() {
        try {
            alert("Logged in")
        } catch (err: any) {
        }
    }
    const handleLogInUserName = (e: any) => {
        if (!e.target.value.includes("@")) {
            set_login_mb_nick(e.target.value)
        } else {
            set_login_mb_email(e.target.value)
        }
    }
    const handleEmailValidator = async (text: string) => {
        const validate_emails = ["gmail", "yahoo", "mail", "yandex", "hotman", "outlook", "icloud", "gmx", "hubspot", "pm"]
        return validate_emails.some((ele) => text.includes(ele))
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
        alert(event.target.checked)
    }
    return (
        <>
            <Stack className="join-auth" alignItems={"center"} justifyContent={"center"}>
                <Stack className="authMain" >
                    <Box className="auth_container">
                        <Box className={"auth_signUp"} style={signIn ? {} : { transform: "translateX(100%)", opacity: "1", zIndex: "5" }}>
                            <Box className={"signUp_body"}>
                                <div className="login_title">Create Account</div>
                                <input type="text" id="floatingUser" placeholder="User Name" onChange={(e) => { setMb_nick(e.target.value) }} />
                                <input type="email" id="floatingEmail" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
                                <input type="text" id="floatingphone" placeholder="Phone Number" onChange={(e) => { setMb_phone(e.target.value) }} />
                                <input type="password" id="floatingpassword" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                                <input type="password" className="form-control" id="floatingre" placeholder="Re-enter Password" onKeyDown={handleKeyDownSignUp} onChange={(e) => { setCheckPassword(e.target.value) }} />
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
                                                        checked={false}
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
                                                        name={'AGENT'}
                                                        onChange={checkUserTypeHandler}
                                                        checked={true}
                                                    />
                                                }
                                                label="Agent"
                                            />
                                        </FormGroup>
                                    </Stack>
                                </Stack>
                                <Button className={"login-btn"} onClick={handleSignUpRequest} >Sign Up</Button>

                            </Box>
                        </Box>
                        <Box className={"auth_logIn"}>
                            <Box className={"logIn_body"} style={signIn ? {} : { transform: "translateX(100%)", display: "none" }}>
                                <div className="title">Sign in</div>
                                <div>
                                    <input type="text" id="floatinguser" placeholder="User Name" onChange={handleLogInUserName} />
                                </div>
                                <div className="form-floating">
                                    <input type="password" className="form-control" id="floatingpassord" placeholder="Password" onKeyDown={handleKeyDownLogIn} onChange={(e) => set_login_mb_password(e.target.value)} />
                                </div>
                                <div className="warn">If you forget your password, you can log in with your signed up email address </div>
                                <Button onClick={handleLogInRequest}>Sign In</Button>
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
                                            Sign In
                                        </Button>
                                    </Box>
                                    <div className="overlay-wrapper"></div>
                                </Box>
                                <Box className={"righ_overlay"} style={signIn ? { transform: "translateX(0)" } : {}}>
                                    <Box className="overlay_panel">
                                        <div className="right_overlay_title ">Hello, Friend!</div>
                                        <p>To keep connected with us please login with your personal info</p>
                                        <Button  onClick={() => toggle(false)}>
                                            Sign Up
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
