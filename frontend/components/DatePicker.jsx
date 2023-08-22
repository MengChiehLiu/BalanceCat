import * as React from "react";
import dayjs from "dayjs";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

export default function DateRangePickerValue() {
  const [value, setValue] = React.useState([
    dayjs(
      `${
        new Date(new Date().setDate(new Date().getDate() - 7))
          .toISOString()
          .split("T")[0]
      }`,
    ),
    dayjs(`${new Date().toISOString().split("T")[0]}`),
  ]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* <DemoContainer
        components={["DateRangePicker", "DateRangePicker"]}
        sx={{ color: "white" }}
      >
        <DemoItem
          label="選擇日期"
          component="DateRangePicker"
          sx={{ color: "white" }}
        > */}
      <DateRangePicker
        value={value}
        onChange={(newValue) => setValue(newValue)}
        sx={{
          // color: "white",
          // ".MuiFormLabel-root": {
          //   color: "white",
          // },
          // ".MuiOutlinedInput-notchedOutline": {
          //   borderColor: "white",
          // },
          ".MuiOutlinedInput-root": {
            borderRadius: "10px",
            // color: "white",
          },
        }}
      />
      {/* </DemoItem>
      </DemoContainer> */}
    </LocalizationProvider>
  );
}
