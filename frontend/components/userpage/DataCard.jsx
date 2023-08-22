import * as React from "react";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import { ThemeProvider } from "@mui/joy/styles";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
import { Box, createTheme } from "@mui/system";
import styles from "../../styles/DataCard.module.scss";

const PieChart = dynamic(
  () => import("@mui/x-charts").then((mod) => mod.PieChart),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
    // eslint-disable-next-line prettier/prettier
  }
);

const pieArcClasses = dynamic(
  () => import("@mui/x-charts").then((mod) => mod.pieArcClasses),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
    // eslint-disable-next-line prettier/prettier
  }
);

const data = [
  { label: "資產", value: 400, color: "#9bbfe0" },
  { label: "負債", value: 300, color: "#e8a09a" },
  { label: "Group C", value: 300, color: "#fbe29f" },
  { label: "Group D", value: 200, color: "#c6d68f" },
];

const theme = createTheme({
  palette: {
    background: {
      paper: "inherint",
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

export default function DataCard({ isDebitCard, color }) {
  return (
    <ThemeProvider>
      <Card
        data-resizable
        sx={{
          textAlign: "center",
          alignItems: "center",
          width: 280,
          // height: 240,
          height: 263,
          // to make the demo resizable
          // overflow: "auto",
          resize: "horizontal",
          "--icon-size": "100px",
          borderRadius: "30px",
          backgroundColor: color,
          boxShadow: "0 0 20px rgb(0,0,0,0.2)",
          // backgroundImage: color,
        }}
      >
        <CardOverflow variant="solid" color="warning" />

        <CardContent sx={{ maxWidth: "40ch" }}>
          <div className={styles.datacontent}>
            <ThemeProvider theme={theme}>
              <Box
                sx={{
                  bgcolor: "background.paper",
                  boxShadow: 0,
                  borderRadius: 2,
                  p: 2,
                  minWidth: 120,
                  paddingRight: "0px",
                  padding: "0px",

                  textAlign: "left",
                }}
              >
                <Box sx={{ color: "text.secondary" }}>
                  {isDebitCard ? "資產" : "當月支出金額 "}
                </Box>
                <Box
                  sx={{
                    color: "text.primary",
                    fontSize: 24,
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
                    fontSize: 10,
                  }}
                >
                  +18.77%
                </Box>
                <Box
                  sx={{
                    color: "text.secondary",
                    display: "inline",
                    fontSize: 10,
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
                  minWidth: 120,
                  paddingLeft: "0px",
                  padding: "0px",
                  textAlign: "left",
                }}
              >
                <Box sx={{ color: "text.secondary" }}>
                  {isDebitCard ? "負債" : "已支出金額"}
                </Box>
                <Box
                  sx={{
                    color: "text.primary",
                    fontSize: 24,
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
                    fontSize: 10,
                  }}
                >
                  +18.77%
                </Box>
                <Box
                  sx={{
                    color: "text.secondary",
                    display: "inline",
                    fontSize: 10,
                  }}
                >
                  vs. last week
                </Box>
              </Box>
            </ThemeProvider>
          </div>

          <Stack direction="row">
            <PieChart
              series={[
                {
                  paddingAngle: 5,
                  innerRadius: 40,
                  outerRadius: 60,
                  // arcLabel: (item) => `${item.label} (${item.value})`, //show the inner data
                  arcLabelMinAngle: 15,
                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: { innerRadius: 20, additionalRadius: -20 },
                  data,
                },
              ]}
              // width={100}
              height={130}
              // legend={{ hidden: true }}  //hide the color stand for
              sx={{
                marginTop: "20px",
                marginRight: "10px",
                [`& .${pieArcClasses.faded}`]: {
                  fill: "gray",
                },
                "& .MuiChartsLegend-root.MuiChartsLegend-column": {
                  // display: "none",
                  margin: "20px",
                },
              }}
            />
          </Stack>
        </CardContent>
        <CardActions
          orientation="vertical"
          buttonFlex={1}
          sx={{
            "--Button-radius": "40px",
            width: "clamp(min(100%, 160px), 50%, min(100%, 200px))",
          }}
        />
      </Card>
    </ThemeProvider>
  );
}
