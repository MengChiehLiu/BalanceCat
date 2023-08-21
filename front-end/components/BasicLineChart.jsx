import dynamic from "next/dynamic";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, ThemeProvider, createTheme } from "@mui/system";
import SettingsIcon from "@mui/icons-material/Settings";
import useMediaQuery from "@mui/material/useMediaQuery";
// import { useTheme } from "@mui/material/styles";
import YearPicker from "./YearPicker";
import styles from "../styles/BasicLineChart.module.scss";

const DynamicLineChart = dynamic(
  () => import("@mui/x-charts").then((mod) => mod.LineChart),
  {
    ssr: false, // This will load the component only on the client side
    loading: () => <p>Loading...</p>,
    // eslint-disable-next-line prettier/prettier
  }
);

const theme = createTheme({
  palette: {
    background: {
      paper: "#fff",
    },
    text: {
      primary: "#173A5E",
      secondary: "#46505A",
    },
    action: {
      active: "#001E3C",
    },
    success: {
      dark: "#009688",
    },
  },
});
export default function BasicLineChart() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [isSetting, setIsSetting] = useState(false);
  // const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      {isSetting && (
        <Dialog
          fullScreen={fullScreen}
          open={isSetting}
          onClose={() => setIsSetting(false)}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">設定圖表年份</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ height: "100px" }}>
              <div className={styles.yearPicker}>
                <YearPicker content="Start" />
                <YearPicker content="End" />
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => setIsSetting(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsSetting(false)} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <DynamicLineChart
        // sx={{
        //   "& .MuiChartsTooltip-table": {
        //     position: "relative",
        //     zIndex: "8000",
        //     backgroundColor: "red",
        //   },
        // }}
        xAxis={[{ data: [1, 2, 3, 5, 8, 10, 12], label: "月份" }]}
        yAxis={[
          {
            label: "1000 (TWD)", // Hypothetical label property for y-axis
          },
        ]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5, 1],
          },
          {
            data: [21, 4.5, 0, 1.5, 12.5, 5, 10],
          },
        ]}
        width={500}
        height={300}
      />
      <Button onClick={handleClickOpen("paper")}>scroll=paper</Button>
      <Button onClick={handleClickOpen("body")}>scroll=body</Button>
      <Dialog
        sx={{
          zIndex: "0",
        }}
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <div className={styles.accountbar}>
            項目名稱
            <SettingsIcon onClick={() => setIsSetting(true)} />
          </div>
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <div className={styles.infotext}>
              <ThemeProvider theme={theme}>
                <Box
                  sx={{
                    bgcolor: "background.paper",
                    boxShadow: 0,
                    borderRadius: 2,
                    p: 2,
                    minWidth: 200,
                  }}
                >
                  <Box sx={{ color: "text.secondary" }}>目標金額</Box>
                  <Box
                    sx={{
                      color: "text.primary",
                      fontSize: 44,
                      fontWeight: "medium",
                    }}
                  >
                    98.3 K
                  </Box>
                  <Box
                    sx={{
                      color: "success.dark",
                      display: "inline",
                      fontWeight: "bold",
                      mx: 0.5,
                      fontSize: 14,
                    }}
                  >
                    +18.77%
                  </Box>
                  <Box
                    sx={{
                      color: "text.secondary",
                      display: "inline",
                      fontSize: 14,
                    }}
                  >
                    vs. last week
                  </Box>
                </Box>
              </ThemeProvider>
              <ThemeProvider theme={theme}>
                <Box
                  sx={{
                    bgcolor: "background.paper",
                    boxShadow: 0,
                    borderRadius: 2,
                    p: 2,
                    minWidth: 200,
                  }}
                >
                  <Box sx={{ color: "text.secondary" }}>總額</Box>
                  <Box
                    sx={{
                      color: "text.primary",
                      fontSize: 44,
                      fontWeight: "medium",
                    }}
                  >
                    98.3 K
                  </Box>
                  <Box
                    sx={{
                      color: "success.dark",
                      display: "inline",
                      fontWeight: "bold",
                      mx: 0.5,
                      fontSize: 14,
                    }}
                  >
                    +18.77%
                  </Box>
                  <Box
                    sx={{
                      color: "text.secondary",
                      display: "inline",
                      fontSize: 14,
                    }}
                  >
                    vs. last week
                  </Box>
                </Box>
              </ThemeProvider>
            </div>
            <DynamicLineChart
              sx={{
                "& .MuiChartsTooltip-table": {
                  position: "relative",
                  zIndex: "8000",
                  backgroundColor: "red",
                },
                "& table": {
                  position: "relative",
                  zIndex: "8000",
                  backgroundColor: "red",
                },
              }}
              className={styles.MuiChartsTooltip}
              xAxis={[{ data: [1, 2, 3, 5, 8, 10, 12], label: "月份" }]}
              yAxis={[
                {
                  label: "1000 (TWD)", // Hypothetical label property for y-axis
                },
              ]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5, 1],
                  label: 2023,
                },
                {
                  data: [21, 4.5, 0, 1.5, 12.5, 5, 10],
                  label: 2022,
                },
              ]}
              width={500}
              height={300}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Cancel</Button> */}
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
