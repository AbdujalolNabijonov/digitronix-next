import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Divider, Drawer, List, ListItem, Menu, MenuItem, Stack } from '@mui/material';
import { useReactiveVar } from "@apollo/client"
import { userVar } from '@/apollo/store';
import { serverApi } from '@/libs/config';
import { DesktopTower, Handshake, House, Keyboard, Mouse } from 'phosphor-react';
import { useTranslation } from 'react-i18next';
import { BorderColor, Devices, ExpandMore, Groups, HouseOutlined, LaptopOutlined, SupportAgent } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { Chair, GraphicsCard } from '@phosphor-icons/react';
import { ProductCategory } from '@/libs/enum/product.enum';
import { Direction } from '@/libs/enum/common.enum';
import { sweetErrorHandling } from '@/libs/sweetAlert';
import { logOut } from '@/libs/auth';

export default function MobileBar() {
    const user = useReactiveVar(userVar)
    const router = useRouter()
    const { t, i18n } = useTranslation("common")
    const [anchor, setAnchor] = React.useState(null)
    const [open, setOpen] = React.useState(false)
    const toogleMenuHandler = (e: any) => {
        if (!anchor) {
            setAnchor(e.target)
        } else {
            setAnchor(null)
        }
    }

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const logoutHandler = async() => {
        try{
            await logOut()
        }catch(err:any){
            console.log(`ERROR: logoutHandler, ${err.message}`)
            await sweetErrorHandling(err)
        }
    }
    const navigateHandler = (path: string) => {
        router.push(path, path, { scroll: false })
    }
    return (
        <Box>
            <AppBar position="static">
                <Toolbar className='mobile-navbar'>
                    <Stack>
                        <IconButton
                            onClick={toggleDrawer(true)}
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            open={open}
                            onClose={toggleDrawer(false)}
                        >
                            <Box className="navbar-drawer">
                                <Divider />
                                <Box className="title" onClick={() => navigateHandler("/")}>DIGITRONIX</Box>
                                <Divider />
                                <List>
                                    <MenuItem className='list-item' onClick={() => navigateHandler("/")}>
                                        <IconButton disableRipple>
                                            <HouseOutlined sx={{ fill: "white" }} />
                                        </IconButton>
                                        <Box>
                                            {t('Home')}
                                        </Box>
                                    </MenuItem>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMore sx={{ fill: "white" }} />}
                                            aria-controls="panel1-content"
                                            id="panel1-header"
                                            className='list-item-accor'
                                        >
                                            <Stack className='list-item'>
                                                <IconButton disableRipple>
                                                    <Devices sx={{ fill: "white" }} />
                                                </IconButton>
                                                <Box>
                                                    {t('Products')}
                                                </Box>
                                            </Stack>
                                        </AccordionSummary>
                                        <AccordionDetails className='list-item-accor'>
                                            <MenuItem className="list-item">
                                                <Stack
                                                    className="list-item"
                                                    onClick={() => {
                                                        let link = "/products/?input="
                                                        const jsonObj = JSON.stringify({ page: 1, limit: 6, sort: "createdAt", search: { productCategory: ProductCategory.LAPTOP } })
                                                        link += jsonObj
                                                        router.push(link, link, { scroll: false })
                                                    }}>
                                                    <LaptopOutlined style={{ fontSize: "20px" }} />
                                                    <div>{t('Laptops')}</div>
                                                </Stack>
                                            </MenuItem>
                                            <MenuItem className="list-item">
                                                <Stack
                                                    className="list-item"
                                                    onClick={() => {
                                                        let link = "/products/?input="
                                                        const jsonObj = JSON.stringify({ page: 1, limit: 6, sort: "createdAt", search: { productCategory: ProductCategory.DESKTOP } })
                                                        link += jsonObj
                                                        router.push(link, link, { scroll: false })
                                                    }}>
                                                    <DesktopTower size={"20px"} />
                                                    <div>{t('Desktops')}</div>
                                                </Stack>
                                            </MenuItem>
                                            <MenuItem >
                                                <Stack
                                                    className="list-item"
                                                    onClick={() => {
                                                        let link = "/products/?input="
                                                        const jsonObj = JSON.stringify({ page: 1, limit: 6, sort: "createdAt", search: { productCategory: ProductCategory.GRAPHICS } })
                                                        link += jsonObj
                                                        router.push(link, link, { scroll: false })
                                                    }}>
                                                    <GraphicsCard size={"20px"} />
                                                    <div>{t('Graphics')}</div>
                                                </Stack>
                                            </MenuItem>
                                            <MenuItem className="list-item">
                                                <Stack
                                                    className="list-item"
                                                    onClick={() => {
                                                        let link = "/products/?input="
                                                        const jsonObj = JSON.stringify({ page: 1, limit: 6, sort: "createdAt", search: { productCategory: ProductCategory.MICE } })
                                                        link += jsonObj
                                                        router.push(link, link, { scroll: false })
                                                    }}>
                                                    <Mouse style={{ fontSize: "20px" }} />
                                                    <div>{t('Mice')}</div>
                                                </Stack>
                                            </MenuItem>
                                            <MenuItem className="list-item">
                                                <Stack
                                                    className="list-item"
                                                    onClick={() => {
                                                        let link = "/products/?input="
                                                        const jsonObj = JSON.stringify({ page: 1, limit: 6, sort: "createdAt", search: { productCategory: ProductCategory.KEYBOARD } })
                                                        link += jsonObj
                                                        router.push(link, link, { scroll: false })
                                                    }}>
                                                    <Keyboard style={{ fontSize: "20px" }} />
                                                    <div>{t('Keyboard')}</div>
                                                </Stack>
                                            </MenuItem>
                                            <MenuItem className="list-item">
                                                <Stack
                                                    className="list-item"
                                                    alignItems={"center"}
                                                    onClick={() => {
                                                        let link = "/products/?input="
                                                        const jsonObj = JSON.stringify({ page: 1, limit: 6, sort: "createdAt", direction: Direction.DESC, search: { productCategory: ProductCategory.CHAIR } })
                                                        link += jsonObj
                                                        router.push(link, link, { scroll: false })
                                                    }}>
                                                    <Chair style={{ fontSize: "20px" }} />
                                                    <div>{t('Chair')}</div>
                                                </Stack>
                                            </MenuItem>
                                        </AccordionDetails>
                                    </Accordion>
                                    <MenuItem className='list-item' onClick={() => navigateHandler('/retailers?input={"page":1,"limit":8,"sort":"createdAt","search":{"memberType":"RETAILER"}}')}>
                                        <IconButton disableRipple>
                                            <Handshake style={{ color: "white" }} />
                                        </IconButton>
                                        <Box>
                                            {t('Retailer')}
                                        </Box>
                                    </MenuItem>
                                    <MenuItem className='list-item'  onClick={() => navigateHandler("/community")}>
                                        <IconButton disableRipple>
                                            <Groups sx={{ fill: "white" }} />
                                        </IconButton>
                                        <Box>
                                            {t('Society')}
                                        </Box>
                                    </MenuItem>
                                    <MenuItem className='list-item'  onClick={() => navigateHandler("/cs")}>
                                        <IconButton disableRipple>
                                            <SupportAgent sx={{ fill: "white" }} />
                                        </IconButton>
                                        <Box>
                                            {t('CS')}
                                        </Box>
                                    </MenuItem>
                                </List>
                            </Box>
                        </Drawer>
                    </Stack>
                    <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                        DIGITRONIX
                    </Typography>
                    <Stack>
                        <Button color="inherit" onClick={toogleMenuHandler}>
                            <Avatar src={user.memberImage ? `${serverApi}/${user.memberImage}` : "/img/profile/noUser.jpg"} />
                        </Button>
                        <Menu
                            anchorEl={anchor}
                            open={Boolean(anchor)}
                            onClose={toogleMenuHandler}
                        >
                            {
                                !user._id ? (
                                    <MenuItem onClick={()=>{router.push("/account/join", "/account/join", {scroll:false})}}>
                                        Login/signup
                                    </MenuItem>
                                ) : (
                                    <MenuItem onClick={logoutHandler}>
                                        Logout
                                    </MenuItem>
                                )
                            }
                        </Menu>
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    );
}