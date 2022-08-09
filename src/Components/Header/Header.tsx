import React, { useState } from "react";
import { AppBar, IconButton, Menu, MenuItem, Typography, Toolbar, Button, Box, Link } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
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

    return (
        <AppBar sx={{width: "calc(100% - 0.95em)", marginRight: "0.95em"}}>
            <Container>
                <Toolbar>
                <Typography variant="h5" sx={{ flexGrow: 1 }}>
                  <Link href="/" sx={{color: "inherit", textDecoration: "none"}}>Movie Catalog</Link>
                </Typography>
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
                  </Box>
                }
                </Toolbar>
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