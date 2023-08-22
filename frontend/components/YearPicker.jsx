// import React, { useState } from "react";
// import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

// function YearPicker({ content }) {
//   const [year, setYear] = useState(new Date().getFullYear()); // Default to the current year
//   const currentYear = new Date().getFullYear();
//   const startYear = currentYear - 50; // Let's say 50 years back
//   const years = Array.from({ length: 20 }, (_, index) => startYear + index); // List of 101 years

//   return (
//     <FormControl variant="outlined" sx={{ width: "130px", height: "50px" }}>
//       <InputLabel id="year-label">{`${content} Year`}</InputLabel>
//       <Select
//         labelId="year-label"
//         value={year}
//         onChange={(e) => setYear(e.target.value)}
//         label="Year"
//       >
//         {years.map((y, index) => (
//           <MenuItem key={index} value={y}>
//             {y}
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   );
// }

// export default YearPicker;
import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function YearPicker({ content }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker label={`${content} year`} views={["year"]} />
      </DemoContainer>
    </LocalizationProvider>
  );
}
