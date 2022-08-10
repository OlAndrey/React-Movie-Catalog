import React, { useState } from "react";
import "../../styles/menu.css"
import { AppBar, IconButton, Menu, MenuItem, Typography, Toolbar, Button, Box, Link } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { Container } from "@mui/system";
import Search from "../Search/Search";
import Auth from "../Auth/Auth";
import { connect } from "react-redux";
import { AppStatetype } from "../../store/reducers";
import { logoutUser } from "../../store/action-creators/authActionCreators"
import { UserType } from "../../types/Auth";
import { useNavigate } from "react-router-dom";


type MapStatePropsType = { user: UserType }
type MapDispatchPropsType = { logoutUser: () => void }
type HeaderPropsType = MapStatePropsType & MapDispatchPropsType


const Header: React.FC<HeaderPropsType> = ({ user, logoutUser }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
  
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const closeWindow = () => {
      setOpen(false)
    }

    const menu = <>
      <Search />
      {
        user
        ?<div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
                <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
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
              open={Boolean(anchorEl)}
                onClose={handleClose}
            >
              <MenuItem onClick={() => {
                handleClose()
                navigate(`/favoriteMovies`, { replace: true });
              }}>Favorite</MenuItem>
              <MenuItem onClick={() => { 
                logoutUser()
                handleClose()
              }}>LogOut</MenuItem>
            </Menu>
          </div>
        :<Box>
          <Button color="inherit" onClick={() => setOpen(true)}>Login</Button>
          <Auth open={open} handleClose={closeWindow} user={user} />
        </Box>}
        </>
    

    return (
        <AppBar sx={{width: "calc(100% - 0.95em)", background: "#000", marginRight: "0.95em"}}>
            <Container>
                <Toolbar>
                <Typography variant="h5" sx={{ flexGrow: 1 }}>
                  <Link href="/" sx={{ display: "flex", alignItems: "center", color: "inherit", textDecoration: "none"}}>
                    <LiveTvIcon fontSize="large" />
                    Movie Catalog
                  </Link>
                </Typography>
                  <Box sx={{ display: {xs: "block", md: "none"}}}>
                    <input id="menu-toggle" type="checkbox" />
                    <label className='menu-button-container' htmlFor="menu-toggle">
                    <div className='menu-button' onClick={() => setOpenMenu(!openMenu)}></div></label>
                  </Box>
                  <Box sx={{ display: {xs: "none", md: "flex"}, alignItems: "center"}}>
                    {menu}
                  </Box>
                </Toolbar>
                  <div style={{display: openMenu ? "flex": "none", alignItems: "center", paddingBottom: "1em"}}>{menu}</div>
            </Container>
        </AppBar>
    )
}

const mapStateToProps = ( state: AppStatetype ): MapStatePropsType => {
  return {
    user: state.auth.currentUser
  }
}

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStatetype>(
  mapStateToProps, { logoutUser }
)(Header);
