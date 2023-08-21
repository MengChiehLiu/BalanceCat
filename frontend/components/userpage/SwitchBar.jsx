/* eslint-disable prettier/prettier */
import * as React from "react";
import { styled } from "@mui/system";
import { Tabs } from "@mui/base/Tabs";
import { TabsList } from "@mui/base/TabsList";
import { TabPanel } from "@mui/base/TabPanel";
import { buttonClasses } from "@mui/base/Button";
import { Tab, tabClasses } from "@mui/base/Tab";
import TargetList from "./TargetList";

export default function SwitchBar() {
  return (
    <Tabs defaultValue={0}>
      <StyledTabsList>
        <StyledTab value={0}>總覽</StyledTab>
        <StyledTab value={1}>資產目標</StyledTab>
        <StyledTab value={2}>支出限制</StyledTab>
      </StyledTabsList>
      <TabPanel value={0}>
        <TargetList display="all" />
      </TabPanel>
      <TabPanel value={1}>
        <TargetList display="asset" />
      </TabPanel>
      <TabPanel value={2}>
        <TargetList display="limit" />
      </TabPanel>
    </Tabs>
  );
}

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#80BFFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
};

// const grey = {
//   50: "#f6f8fa",
//   100: "#eaeef2",
//   200: "#d0d7de",
//   300: "#afb8c1",
//   400: "#8c959f",
//   500: "#6e7781",
//   600: "#57606a",
//   700: "#424a53",
//   800: "#32383f",
//   900: "#24292f",
// };

const StyledTab = styled(Tab)`
  font-family: "IBM Plex Sans", sans-serif;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: transparent;
  width: 100%;
  padding: 10px 12px;
  margin: 6px;
  border: none;
  border-radius: 20px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: #7fe2f6;
  }

  &:focus {
    color: #7fe2f6;
  }

  &.${tabClasses.selected} {
    background-color: ${blue[400]};
    color: black;
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
//  color: #fff;
// background-color: ${blue[400]};

// const StyledTabPanel = styled(TabPanel)(
//   ({ theme }) => `
//   width: 100%;
//   font-family: IBM Plex Sans, sans-serif;
//   font-size: 0.875rem;
//   padding: 20px 12px;
//   background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
//   border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
//   border-radius: 12px;
//   opacity: 0.6;
//   `
// );

const StyledTabsList = styled(TabsList)(
  // eslint-disable-next-line no-unused-vars
  ({ theme }) => `
  max-width: 400px;
  background-color: inherit;
  border-radius: 12px;
  margin-bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  
  `
);

//  background-color: ${blue[500]};
// box-shadow: 0px 4px 30px ${
//     theme.palette.mode === "dark" ? grey[900] : grey[200]
//   };
