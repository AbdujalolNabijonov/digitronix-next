import { Box, Button, Divider, Menu, MenuItem, Stack, Typography } from "@mui/material"
import { useReactiveVar } from "@apollo/client"
import { userVar } from "@/apollo/store"
import { useState } from "react"
import { NotificationsOutlined } from "@mui/icons-material"

const NavbarAdmin = () => {
    //Initializations
    const user = useReactiveVar(userVar)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const openAnchor = Boolean(anchorEl)
    const imageUrl = user?.memberImage ? `${"http://localhost:3005"}/${user.memberImage}` : "/img/profile/defaultUser.svg";

    //Handlers
    const handleCloseAnchor = () => {
        setAnchorEl(null)
    }
    return (
        <>
            <Stack className={"admin-navbar"} direction={"row"} justifyContent={"end"}>
                <Stack direction={"row"} alignItems={"center"} gap={"10px"}>
                    <>
                        <Button className="notify">
                            <NotificationsOutlined fontSize="large" />
                        </Button>
                    </>
                    <>
                        <Button onClick={(e: any) => setAnchorEl(e.target)}>
                            <img src={imageUrl} alt="" />
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
                                        {user?.memberNick}John
                                    </Typography>
                                    <Typography variant={'subtitle1'} component={'p'} color={'#757575'}>
                                        {user?.memberPhone}31211212312
                                    </Typography>
                                </Stack>
                                <Divider />
                                <Box component={'div'} sx={{ p: 1, py: '6px' }} onClick={()=>alert("salom")}>
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