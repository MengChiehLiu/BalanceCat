import * as React from "react";
import Box from "@mui/material/Box";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import LogoutIcon from "@mui/icons-material/Logout";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
// import IconButton from "@mui/material/IconButton";
// import Tooltip from "@mui/material/Tooltip";
// import ArrowRight from "@mui/icons-material/ArrowRight";
// import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Home from "@mui/icons-material/Home";
import Settings from "@mui/icons-material/Settings";
import People from "@mui/icons-material/People";
import Dns from "@mui/icons-material/Dns";
import Public from "@mui/icons-material/Public";
import Link from "next/link";
import BarChartIcon from "@mui/icons-material/BarChart";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";
import SettingsBar from "./SettingsBar";

const data = [
  { icon: <People />, label: "個人頁面" },
  { icon: <Dns />, label: "資產負債表" },
  { icon: <BarChartIcon />, label: "綜合損益表" },
  { icon: <Public />, label: "支持我們" },
  { icon: <LogoutIcon />, label: "登出" },
  { icon: <PlayCircleOutlineIcon />, label: "Start Free Trial" },
  { icon: <Settings />, label: "設定" },
];
function getItemLink(label) {
  switch (label) {
    case "個人頁面":
      return "/userpage";
    case "資產負債表":
      return "/balancesheet";
    case "綜合損益表":
      return "/incomestatement";
    default:
      return "";
  }
}
const FireNav = styled(List)({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

export default function SideBar() {
  const router = useRouter();

  const [isHovering, setIsHovering] = React.useState(false);
  const [isHoveringSettings, setIsHoveringSettings] = React.useState(false);
  const handleSettingsHover = (label) => {
    if (label === "設定") {
      setIsHoveringSettings(true);
    }
  };
  function logoutHandler() {
    cookieCutter.set("token", "");
    router.push("/signin");
  }

  //   const handleSettingsLeave = (label) => {
  //     if (label === "設定") {
  //       setIsHoveringSettings(true);
  //     }
  //   };
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        minHeight: "100%",
        // overflowX: "auto",
        // overflowY: "scroll",
      }}
    >
      <Box
        sx={{ display: "flex", minHeight: "100%" }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setIsHoveringSettings(false);
        }}
      >
        <ThemeProvider
          theme={createTheme({
            components: {
              MuiListItemButton: {
                defaultProps: {
                  disableTouchRipple: true,
                },
              },
            },
            palette: {
              mode: "dark",
              primary: { main: "rgb(102, 157, 246)" },
              background: { paper: "rgb(5, 30, 52)" },
            },
          })}
        >
          <Paper
            elevation={0}
            sx={{
              width: 70,
              ":hover": { width: "300px", transition: "0.3s" },
            }}
          >
            <FireNav component="nav" disablePadding>
              <ListItemButton
                component="a"
                sx={{
                  minHeight: 32,
                  "&:hover": {
                    bgcolor: "rgba(71, 98, 130, 0.2)",
                  },
                }}
              >
                <ListItemIcon sx={{ fontSize: 20 }}>🐱</ListItemIcon>
                {isHovering && (
                  <ListItemText
                    sx={{ my: 0 }}
                    primary="Balance Cat"
                    primaryTypographyProps={{
                      fontSize: 20,
                      fontWeight: "700",
                      letterSpacing: 0,
                    }}
                  />
                )}
              </ListItemButton>
              <Divider />
              <Link href="/">
                <ListItem component="div" disablePadding>
                  <ListItemButton sx={{ minHeight: 32 }} className="listItem">
                    <ListItemIcon>
                      <Home color="primary" />
                    </ListItemIcon>
                    {isHovering && (
                      <ListItemText
                        primary="主頁"
                        primaryTypographyProps={{
                          color: "primary",
                          fontWeight: "medium",
                          variant: "body2",
                        }}
                      />
                    )}
                  </ListItemButton>
                  {/* <Tooltip title="設定">
                  <IconButton
                    size="large"
                    sx={{
                      "& svg": {
                        color: "rgba(255,255,255,0.8)",
                        transition: "0.2s",
                        transform: "translateX(0) rotate(0)",
                      },
                      "&:hover, &:focus": {
                        bgcolor: "unset",
                        "& svg:first-of-type": {
                          transform: "translateX(-4px) rotate(-20deg)",
                        },
                        "& svg:last-of-type": {
                          right: 0,
                          opacity: 1,
                        },
                      },
                      "&:after": {
                        content: '""',
                        position: "absolute",
                        height: "80%",
                        display: "block",
                        left: 0,
                        width: "1px",
                        bgcolor: "divider",
                      },
                    }}
                  >
                    <Settings />
                    <ArrowRight
                      sx={{ position: "absolute", right: 4, opacity: 0 }}
                    />
                  </IconButton>
                </Tooltip> */}
                </ListItem>
              </Link>

              <Divider />
              <Box
                sx={{
                  bgcolor: null,
                  pb: 0,
                  height: "100%",
                }}
              >
                {data.map((item, index) => (
                  <ListItemButton
                    key={item.label}
                    sx={{
                      py: 0,
                      minHeight: 32,
                      color: "rgba(255,255,255,.8)",
                      "&:hover": {
                        bgcolor: "rgba(71, 98, 130, 0.2)",
                      },
                    }}
                    onMouseEnter={() => handleSettingsHover(item.label)}
                    //   onMouseLeave={() => handleSettingsLeave(item.label)}
                    href={getItemLink(item.label)}
                    onClick={index === 4 ? () => logoutHandler() : undefined}
                  >
                    <ListItemIcon sx={{ color: "inherit" }}>
                      {item.icon}
                    </ListItemIcon>
                    {isHovering && (
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontSize: 14,
                          fontWeight: "medium",
                        }}
                      />
                    )}
                  </ListItemButton>
                ))}
                {isHovering && isHoveringSettings && <SettingsBar />}
              </Box>
            </FireNav>
          </Paper>
        </ThemeProvider>
      </Box>
    </div>
  );
}
