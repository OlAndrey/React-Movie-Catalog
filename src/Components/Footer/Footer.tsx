import React from "react"
import { Container, Typography } from "@mui/material";
import image from "../../image/themdb.svg"

const Footer = () => {
    return (
        <footer>
           <Container fixed sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography component="h5">Make with love by Oleynik!</Typography> 
                <img src={image} alt="logo" style={{ width: "auto", height: "2em" }}></img>
            </Container> 
        </footer>
        
    )
}

export default Footer;