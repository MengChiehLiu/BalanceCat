import * as React from "react";
// import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
// import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
import { ThemeProvider } from "@mui/joy/styles";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
import { Box, createTheme } from "@mui/system";

// import { PieChart } from "@mui/x-charts";

const PieChart = dynamic(
  () => import("@mui/x-charts").then((mod) => mod.PieChart),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);

const pieArcClasses = dynamic(
  () => import("@mui/x-charts").then((mod) => mod.pieArcClasses),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);

const data = [
  { label: "資產", value: 400 },
  { label: "Group B", value: 300 },
  { label: "Group C", value: 300 },
  { label: "Group D", value: 200 },
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

export default function CongratCard() {
  return (
    <ThemeProvider>
      <Card
        data-resizable
        sx={{
          textAlign: "center",
          alignItems: "center",
          width: 343,
          // to make the demo resizable
          // overflow: "auto",
          resize: "horizontal",
          "--icon-size": "100px",
          borderRadius: "30px",
          // backgroundColor: "#f9ccff",
          backgroundImage: "linear-gradient(to bottom, #ddd3ff, #fdcbff)",
        }}
      >
        <CardOverflow variant="solid" color="warning" />
        {/* <Typography level="title-lg" sx={{ mt: "calc(var(--icon-size) / 2)" }}>
          🎊 Congrats Julia 🎊
        </Typography> */}
        <CardContent sx={{ maxWidth: "40ch" }}>
          <div style={{ display: "flex" }}>
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
                <Box sx={{ color: "text.secondary" }}>資產</Box>
                <Box
                  sx={{
                    color: "text.primary",
                    fontSize: 34,
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
                  minWidth: 200,
                }}
              >
                <Box sx={{ color: "text.secondary" }}>負債</Box>
                <Box
                  sx={{
                    color: "text.primary",
                    fontSize: 34,
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
                  innerRadius: 60,
                  outerRadius: 80,
                  // arcLabel: (item) => `${item.label} (${item.value})`, //show the inner data
                  arcLabelMinAngle: 15,
                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: { innerRadius: 30, additionalRadius: -30 },
                  data,
                },
              ]}
              margin={{ right: 5 }}
              width={200}
              height={200}
              // legend={{ hidden: true }}  //hide the color stand for
              sx={{
                [`& .${pieArcClasses.faded}`]: {
                  fill: "gray",
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
