import { Box, Button, Divider, Menu, MenuItem, Stack, Typography } from "@mui/material"
import { useReactiveVar } from "@apollo/client"
import { userVar } from "@/apollo/store"
import { useEffect, useState } from "react"
import { NotificationsOutlined } from "@mui/icons-material"
import { getJwtToken, logOut, updateUserInfo } from "@/libs/auth"
import { sweetErrorAlert, sweetTopSmallSuccessAlert } from "@/libs/sweetAlert"
import { useRouter } from "next/router"

const NavbarAdmin = () => {
    //Initializations
    const user = useReactiveVar(userVar)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const openAnchor = Boolean(anchorEl)
    const imageUrl = user?.memberImage ? `${"http://localhost:3005"}/${user.memberImage}` : "/img/profile/defaultUser.svg";
    const router = useRouter()
    
    //LifeCircle
    useEffect(() => {
        const jwtToken = getJwtToken();
        if (jwtToken) {
            updateUserInfo(jwtToken).then()
        }
    }, [])

    //Handlers
    const handleCloseAnchor = () => {
        setAnchorEl(null)
    }

    const handleLogOut = async () => {
        try {
            logOut();
            await sweetTopSmallSuccessAlert("Successfully log out!");
            router.push("/")
        } catch (err: any) {
            console.log("Erorr: handleLogOut", err.message);
            await sweetErrorAlert(err.message)
        }
    }
    return (
        <>
            <Stack className={"admin-navbar"} direction={"row"} justifyContent={"end"}>
                <Stack direction={"row"} alignItems={"center"} gap={"10px"}>
                    <>
                        <Button onClick={(e: any) => setAnchorEl(e.target)}>
                            <img src={imageUrl} alt=""  />
                        </Button>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            className={'pop-menu'}
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={openAnchor}
                            onClose={handleCloseAnchor}
                        >
                            <Box
                                component={'div'}
                                onClick={handleCloseAnchor}
                                sx={{
                                    width: '200px',
                                }}
                            >
                                <Stack sx={{ px: '20px', my: '12px' }}>
                                    <Typography variant={'h6'} component={'h6'} sx={{ mb: '4px' }}>
                                        {user?.memberNick}
                                    </Typography>
                                    <Typography variant={'subtitle1'} component={'p'} color={'#757575'}>
                                        {user?.memberPhone}
                                    </Typography>
                                </Stack>
                                <Divider />
                                <Box component={'div'} sx={{ p: 1, py: '6px' }} onClick={handleLogOut}>
                                    <MenuItem sx={{ px: '16px', py: '6px' }}>
                                        <Typography variant={'subtitle1'} component={'span'}>
                                            Logout
                                        </Typography>
                                    </MenuItem>
                                </Box>
                            </Box>
                        </Menu>
                    </>
                </Stack>

            </Stack>
        </>
    )
}
export default NavbarAdmin