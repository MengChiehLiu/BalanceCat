import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function PwdInput({
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
  confirm,
}) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <div>
        <FormControl
          sx={{
            backgroundColor: "white",
            borderRadius: "15px",
            m: 1,
            width: "36ch",
            ".MuiOutlinedInput-root": {
              borderRadius: "15px",
            },
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
          }}
          variant="outlined"
        >
          {confirm ? (
            <InputLabel htmlFor="outlined-adornment-password">
              Confirm Password
            </InputLabel>
          ) : (
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
          )}
          <OutlinedInput
            value={confirm ? confirmPassword : password}
            onChange={(e) => {
              if (confirm) {
                setConfirmPassword(e.target.value);
              } else {
                setPassword(e.target.value);
              }
            }}
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </div>
    </Box>
  );
}
