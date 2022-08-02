import React, { useState } from "react";
import { AppBar, IconButton, Menu, MenuItem, Typography, Toolbar, Button, Box } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Container } from "@mui/system";
import Search from "../Search/Search";
import Auth from "../Auth/Auth";
import { connect } from "react-redux";
import { AppStatetype } from "../../store/reducers";
import { logoutUser } from "../../store/action-creators/authActionCreators"
import { UserType } from "../../types/Auth";

type IReact = React.FunctionComponent<{ user: UserType} & { logoutUser: () => Promise<void>;}>


const Header: IReact = ({ user, logoutUser }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
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
        <AppBar sx={{position: "static"}}>
            <Container>
                <Toolbar>
                <Typography variant="h5" sx={{ flexGrow: 1 }}>Movie Catalog</Typography>
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
                        <MenuItem onClick={handleClose}>Favorite</MenuItem>
                        <MenuItem onClick={logoutUser}>LogOut</MenuItem>
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

const mapStateToProps = ( state: AppStatetype ) => {
  return {
    user: state.auth.currentUser
  }
}

export default connect(mapStateToProps, { logoutUser })(Header);