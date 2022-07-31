import React, { useState } from "react";
import { AppBar, IconButton, Menu, MenuItem, Typography, Toolbar, Button, Box } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Container } from "@mui/system";
import Search from "../Search/Search";
import Login from "../Auth/Login";
import Auth from "../Auth/Auth";

const Header: React.FunctionComponent = () => {
    const [auth, setAuth] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(true);
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
        <AppBar>
            <Container>
                <Toolbar>
                <Typography variant="h5" sx={{ flexGrow: 1 }}>Movie Catalog</Typography>
                <Search />
                {
                  auth
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
                        <MenuItem onClick={handleClose}>LogOut</MenuItem>
                      </Menu>
                    </div>
                  :<Box>
                    <Button color="inherit" onClick={() => setOpen(true)}>Login</Button>
                    <Auth open={open} handleClose={closeWindow} />
                  </Box>
                }
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header;