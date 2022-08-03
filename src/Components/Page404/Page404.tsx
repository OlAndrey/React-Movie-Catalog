import React from "react";
import { Container, Typography, Link } from "@mui/material";

const FourOFour = () => (
    <Container sx={{ textAlign: "center" }}>
        <Typography variant="h1" sx={{margin: "1em 0 0 0"}}>404</Typography>
        <Typography variant="h2" sx={{margin: "1em 0 1em 0"}}>Page not found</Typography>
        <Link href="/" variant="h4">Go to Home page</Link>
    </Container>
  );
  
  export default FourOFour;