import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function InputBox({
  isEmail,
  isUsername,
  email,
  setEmail,
  username,
  setUsername,
}) {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "36ch" },
      }}
      noValidate
      autoComplete="off"
    >
      {isEmail && (
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          sx={{
            backgroundColor: "white",
            borderRadius: "15px",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            ".MuiOutlinedInput-root": {
              borderRadius: "15px",
            },
          }}
        />
      )}
      {isUsername && (
        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="outlined-basic"
          label="Name"
          variant="outlined"
          sx={{
            backgroundColor: "white",
            borderRadius: "15px",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            ".MuiOutlinedInput-root": {
              borderRadius: "15px",
            },
          }}
        />
      )}
    </Box>
  );
}
