import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Box, Button, CircularProgress, IconButton, Stack } from "@mui/material"
import { ArrowLeft } from "phosphor-react"
import { useState } from "react"

interface OTPProps {
    handleVerifiedCodes: any,
    backto: any,
    loading: boolean
}

export function OTPInput(props: OTPProps) {
    const { handleVerifiedCodes, backto, loading } = props;
    const [fullFilled, setFullFilled] = useState(true)
    const [otp, setOtp] = useState("")

    const handleCheckFill = (e: any) => {
        if (e.length === 6) {
            setFullFilled(false)
            setOtp(e)
        } else {
            setFullFilled(true)
        }
    }
    return (
        <Stack alignItems={"center"} className="h-full m-6">
            <IconButton className="text-white self-start" onClick={backto}>
                <ArrowLeft />
            </IconButton>
            <Box className="text-3xl font-bold self-center text-gray-300 mt-3">
                Verification Email
            </Box>
            <Box className="mt-[20%] mb-5 text-center">
                You’re almost done! Check your email for the 6-digit verification code to complete your registration.
            </Box>
            <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} onChange={handleCheckFill} >
                <InputOTPGroup>
                    <InputOTPSlot index={0} className="text-3xl w-14 h-14" />
                    <InputOTPSlot index={1} className="text-3xl w-14 h-14" />
                    <InputOTPSlot index={2} className="text-3xl w-14 h-14" />
                    <InputOTPSlot index={3} className="text-3xl w-14 h-14" />
                    <InputOTPSlot index={4} className="text-3xl w-14 h-14" />
                    <InputOTPSlot index={5} className="text-3xl w-14 h-14" />
                </InputOTPGroup>
            </InputOTP>
            {
                loading ? (
                    <Button className="w-[90%] py-4 text-white mt-7" variant="outlined" color="warning">
                        <CircularProgress color="success" />
                    </Button>
                ) : !fullFilled ? (
                    <button
                        className="tarcking-wider font-bold text-white w-[90%] mt-4 py-2 text-xl bg-[#D77B3D] rounded hover:bg-[#AF3E45] transition duration-300 cursor-pointer"
                        onClick={() => { handleVerifiedCodes(otp) }}
                    >
                        Register
                    </button>
                ) : (
                    <button
                        disabled
                        className="tarcking-wider font-bold text-white w-[90%] mt-4 py-2 text-xl bg-gray-500 rounded cursor-not-allowed"
                    >
                        Register
                    </button>
                )

            }
        </Stack>
    )
}