import { useState } from "react"
import { AddAPhotoRounded } from "@mui/icons-material"
import { CssVarsProvider, FormControl, FormHelperText, FormLabel, Input } from "@mui/joy"
import { Avatar, Box, Button, Divider, Fab, IconButton, Stack } from "@mui/material"
import { useMutation, useReactiveVar } from "@apollo/client"
import { userVar } from "@/apollo/store"
import { sweetErrorHandling, sweetMixinSuccessAlert } from "@/libs/sweetAlert"
import axios from "axios"
import { getJwtToken, setJwtToken, updateStorage, updateUserInfo } from "@/libs/auth"
import { Messages, serverApi } from "@/libs/config"
import { UPDATE_MEMBER } from "@/apollo/user/mutation"

const MyProfile = (props: any) => {
    const user = useReactiveVar(userVar);
    const token = getJwtToken()
    const [memberUpdate, setMemberUpdate] = useState({
        _id: user._id,
        memberNick: "",
        memberFullName: "",
        memberPhone: "",
        memberAddress: "",
        memberDesc: "",
        memberImage: user.memberImage
    })

    const [updateMember] = useMutation(UPDATE_MEMBER)

    const changeImageHandler = async (e: any) => {
        try {
            const image = e.target.files[0];
            const formData = new FormData();
            formData.append(
                'operations',
                JSON.stringify({
                    query: `mutation ImageUploader($file: Upload!, $target: String!) {
						imageUploader(file: $file, target: $target) 
				  }`,
                    variables: {
                        file: null,
                        target: 'member',
                    },
                }),
            );
            formData.append(
                'map',
                JSON.stringify({
                    '0': ['variables.file'],
                }),
            );
            formData.append('0', image);

            const response = await axios.post(`${process.env.REACT_APP_API_GRAPHQL_URL}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'apollo-require-preflight': true,
                    Authorization: `Bearer ${token}`,
                },
            });

            memberUpdate.memberImage = response.data.data.imageUploader;
            setMemberUpdate({ ...memberUpdate })
        } catch (err: any) {
            console.log(`ERROR: changeImageHandler, ${err.message}`)
            await sweetErrorHandling(err)
        }
    }
    const changeNickHandler = (e: any) => {
        memberUpdate.memberNick = e.target.value
        setMemberUpdate({ ...memberUpdate })
    }
    const changePhoneHandler = (e: any) => {
        memberUpdate.memberPhone = e.target.value
        setMemberUpdate({ ...memberUpdate })
    }
    const changeFullNameHandler = (e: any) => {
        memberUpdate.memberFullName = e.target.value
        setMemberUpdate({ ...memberUpdate })
    }
    const changeAddressHandler = (e: any) => {
        memberUpdate.memberAddress = e.target.value
        setMemberUpdate({ ...memberUpdate })
    }
    const changeDescHandler = (e: any) => {
        memberUpdate.memberDesc = e.target.value
        setMemberUpdate({ ...memberUpdate })
    }

    const submitUpdateMember = async () => {
        try {
            if (!user._id) throw new Error(Messages.error2)
            Object.keys(memberUpdate).map((key: string) => {
                //@ts-ignore
                if (!memberUpdate[key]) delete memberUpdate[key];
            })
            const result = await updateMember({ variables: { input: memberUpdate } });
            const jwtToken = result?.data?.updateMember?.accessToken;
            await updateStorage({ jwtToken });
            await updateUserInfo(jwtToken);
            await sweetMixinSuccessAlert("Information Updated Successfully")
        } catch (err: any) {
            console.log(`ERROR: submitUpdateMember, ${err.message}`);
            await sweetErrorHandling(err)
        }
    }

    return (
        <Stack className="myprofile">
            <Stack className="myprofile-head">
                <Box className="title">
                    My Profile
                </Box>
                <Box className="subtitle">
                    You can adjust your account anytime you want!
                </Box>
            </Stack>
            <Stack className="myprofile-body">
                <Stack className="member-image">
                    <Stack className="member-set">
                        <Avatar
                            sx={{ height: "150px", width: "150px", border: "4px solid white" }}
                            src={memberUpdate.memberImage ? `${serverApi}/${memberUpdate.memberImage}` : "img/profile/noUser.jpg"}
                        />
                        <Fab
                            color="primary"
                            aria-label="add"
                            className="image-icon"
                        >
                            <AddAPhotoRounded />
                            <input type="file" onChange={changeImageHandler} />
                        </Fab>
                    </Stack>
                    <Button onClick={submitUpdateMember}>
                        Save
                    </Button>
                </Stack>
                <Stack className="member-edit">
                    <Stack className="info-part-one">
                        <CssVarsProvider>
                            <FormControl sx={{ flex: 1 }}>
                                <FormLabel sx={{ fontWeight: 500, fontSize: "18px" }}>Nick Name</FormLabel>
                                <Input placeholder={user.memberNick} variant="soft" onChange={changeNickHandler} />
                            </FormControl>
                            <FormControl sx={{ flex: 1 }}>
                                <FormLabel sx={{ fontWeight: 500, fontSize: "18px" }}>Phone</FormLabel>
                                <Input placeholder={user.memberPhone} variant="soft" onChange={changePhoneHandler} />
                            </FormControl>
                        </CssVarsProvider>
                    </Stack>
                    <Stack className="info-part-two">
                        <CssVarsProvider>
                            <FormControl sx={{ flex: 1, marginBottom: "20px" }}>
                                <FormLabel sx={{ fontWeight: 500, fontSize: "18px" }}>Full Name</FormLabel>
                                <Input placeholder={user.memberFullName || "Full Name..."} variant="soft" onChange={changeFullNameHandler} />
                            </FormControl>
                        </CssVarsProvider>
                        <CssVarsProvider>
                            <FormControl sx={{ flex: 1 }}>
                                <FormLabel sx={{ fontWeight: 500, fontSize: "18px" }}>Address</FormLabel>
                                <Input placeholder={user.memberAddress || "Address..."} variant="soft" onChange={changeAddressHandler} />
                            </FormControl>
                        </CssVarsProvider>
                        <Box className="edit-bio">
                            <Box className="edit-label">Bio</Box>
                            <textarea rows={10} placeholder={user.memberDesc ?? "Bio..."} onChange={changeDescHandler}></textarea>
                        </Box>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default MyProfile