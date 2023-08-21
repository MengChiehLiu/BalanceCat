import React from "react";
import Select from "react-select";

const defaultOption = {
  value: "",
  label: "現金",
  isDisabled: true,
};
const currentAssetsOptions = [
  { value: "ocean", label: "現金", color: "#00B8D9" },
  { value: "blue", label: "股票", color: "#0052CC" },
  { value: "purple", label: "應收帳款", color: "#5243AA" },
  { value: "red", label: "其他", color: "#FF5630" },
];

const nonCurrentAssetsOptions = [
  { value: "orange", label: "車子", color: "#FF8B00" },
  { value: "yellow", label: "房子", color: "#FFC400" },
  { value: "green", label: "3C", color: "#36B37E" },
  { value: "forest", label: "家電", color: "#00875A" },
  { value: "slate", label: "預付款", color: "#253858" },
  { value: "silver", label: "其他", color: "#666666" },
];

const currentLiabilitiesOptions = [
  { value: "orange", label: "信用卡", color: "#FF8B00" },
  { value: "yellow", label: "應付帳款", color: "#FFC400" },
  { value: "green", label: "其他", color: "#36B37E" },
];

const nonCurrentLiabilitiesOptions = [
  { value: "orange", label: "分期付款", color: "#FF8B00" },
  { value: "yellow", label: "車貸", color: "#FFC400" },
  { value: "green", label: "房貸", color: "#36B37E" },
  { value: "forest", label: "其他", color: "#00875A" },
];
const recurringIncomeOptions = [
  { value: "orange", label: "薪資收入", color: "#FF8B00" },
  { value: "yellow", label: "利息收入", color: "#FFC400" },
  { value: "forest", label: "其他", color: "#00875A" },
];

const nonRecurringIncomeOptions = [
  { value: "orange", label: "兼職收入", color: "#FF8B00" },
  { value: "yellow", label: "中獎", color: "#FFC400" },
  { value: "forest", label: "其他", color: "#00875A" },
];
const fixedChargesOptions = [
  { value: "orange", label: "食", color: "#FF8B00" },
  { value: "yellow", label: "衣", color: "#FFC400" },
  { value: "forest", label: "住", color: "#00875A" },
  { value: "forest", label: "孝親", color: "#00875A" },
  { value: "forest", label: "折舊", color: "#00875A" },
  { value: "forest", label: "其他", color: "#00875A" },
];
const variableChargesOptions = [
  { value: "orange", label: "食", color: "#FF8B00" },
  { value: "yellow", label: "衣", color: "#FFC400" },
  { value: "forest", label: "住", color: "#00875A" },
  { value: "forest", label: "孝親", color: "#00875A" },
  { value: "forest", label: "其他", color: "#00875A" },
];

const groupedOptions = [
  {
    label: "流動資產",
    options: currentAssetsOptions,
  },
  {
    label: "非流動資產",
    options: nonCurrentAssetsOptions,
  },
  {
    label: "流動負債",
    options: currentLiabilitiesOptions,
  },
  {
    label: "非流動負債",
    options: nonCurrentLiabilitiesOptions,
  },
  {
    label: "經常性收入",
    options: recurringIncomeOptions,
  },
  {
    label: "非經常性收入",
    options: nonRecurringIncomeOptions,
  },
  {
    label: "固定支出",
    options: fixedChargesOptions,
  },
  {
    label: "非固定支出",
    options: variableChargesOptions,
  },
];

const customStyles = {
  menu: (provided) => ({
    ...provided,
    width: "180px", // Set this to whatever width you prefer
    fontFamily: "Arial, sans-serif",
    fontSize: "1rem",
  }),

  option: (provided, state) => ({
    ...provided,

    color: state.isSelected ? "#000" : "#333",
    // padding: "10px",
    width: "100%",
    fontFamily: "Arial, sans-serif",
    fontSize: "1rem",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    cursor: "pointer",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  control: (provided) => ({
    ...provided,
    backgroundColor: "none",
    // borderColor: "none",
    padding: "5px",
    border: "none",
    boxShadow: "none",
    fontSize: "1rem",
    fontFamily: "Arial, sans-serif",
    // "&:hover": {
    //   borderColor: "#fff",
    // },
  }),
};

export default function SelectAccount() {
  return (
    <Select
      //   aria-labelledby="aria-label"
      options={groupedOptions}
      isOptionDisabled={(option) => option.isDisabled}
      //   placeholder="Select an option..."
      styles={customStyles}
      defaultValue={defaultOption}
    />
  );
}
