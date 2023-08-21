import * as React from "react";
// import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// const bull = (
//   <Box
//     component="span"
//     sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
//   >
//     •
//   </Box>
// );

export default function PlanCard() {
  return (
    <Card
      sx={{
        minWidth: 275,
        height: 195,
        borderRadius: "20px",
        backgroundColor: "#fff",
        // boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
        boxShadow: "0 0 20px rgb(0,0,0,0.2)",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.08)",
        },
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14, fontWeight: "600" }}
          color="text.secondary"
          gutterBottom
        >
          備忘錄
        </Typography>
        <Typography variant="h5" component="div" sx={{ fontWeight: "700" }}>
          理財策略：如何規劃未來的財富之路？
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: "500" }}>
          隨著社會的進步，越來越多的人開始意識到金錢管理的重要性。正確的理財策略不僅能確保您的財富增值，還能夠為您和您的家人創建一個穩定的未來。但要如何建立一個成功的理財計劃呢？
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Read More</Button>
      </CardActions>
    </Card>
  );
}
