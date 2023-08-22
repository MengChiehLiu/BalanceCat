import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        p: 6,
        width: "100%",
      }}
    >
      <Container maxWidth="lg">
        <Grid container justifyContent="space-around" spacing={5}>
          <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              關於我們
            </Typography>
            <Typography variant="body2" color="text.secondary">
              歡迎來到 Balance Cat
              團隊的世界！我們是一群熱愛技術、創新和財務管理的學生，致力於打造一個簡單、有效的記帳網站，幫助您更好地管理您的財務。
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              聯絡我們
            </Typography>
            <Typography variant="body2" color="text.secondary">
              123 Main Street, Anytown, USA
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: info@example.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +1 234 567 8901
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              追蹤我們
            </Typography>
            <Link href="https://www.facebook.com/" color="inherit">
              <Facebook />
            </Link>
            <Link
              href="https://www.instagram.com/"
              color="inherit"
              sx={{ pl: 1, pr: 1 }}
            >
              <Instagram />
            </Link>
            <Link href="https://www.twitter.com/" color="inherit">
              <Twitter />
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link
              color="inherit"
              href="https://www.google.com/search?q=cat&rlz=1C5CHFA_enTW997TW997&oq=cat&aqs=chrome.0.69i59j46i199i433i465i512j46i199i433i457i465i512j69i60l5.4824j0j7&sourceid=chrome&ie=UTF-8"
            >
              Balance Cat
            </Link>{" "}
            {new Date().getFullYear()}.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
