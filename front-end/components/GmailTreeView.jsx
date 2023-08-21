/* eslint-disable react/require-default-props */
import * as React from "react";
import PropTypes from "prop-types";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import Typography from "@mui/material/Typography";
// import MailIcon from "@mui/icons-material/Mail";
// import DeleteIcon from "@mui/icons-material/Delete";

// import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
// import InfoIcon from "@mui/icons-material/Info";
// import ForumIcon from "@mui/icons-material/Forum";
// import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Button } from "@mui/material";
import UploadButton from "./UploadButton";

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightRegular,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)",
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "inherit",
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

function StyledTreeItem(props) {
  const [isEditMode, setIsEditMode] = React.useState(false);
  const theme = useTheme();
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    colorForDarkMode,
    bgColorForDarkMode,
    isPersonal,
    ...other
  } = props;
  const [newLabelInfo, setNewLabelInfo] = React.useState(labelInfo);
  const styleProps = {
    "--tree-view-color":
      theme.palette.mode !== "dark" ? color : colorForDarkMode,
    "--tree-view-bg-color":
      theme.palette.mode !== "dark" ? bgColor : bgColorForDarkMode,
  };
  const handleEditLabelInfo = (event) => {
    event.stopPropagation();
    setIsEditMode(!isEditMode);
    // console.log(`Editing label info for ${labelText}`);
  };

  return (
    <StyledTreeItemRoot
      label={
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 0.5,
            pr: 0,
          }}
        >
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: "inherit", flexGrow: 1 }}
          >
            {labelText}
          </Typography>
          {labelText === "設定大頭貼" && <UploadButton />}
          {labelInfo == null ? null : (
            <>
              {isEditMode ? (
                <>
                  <input
                    value={newLabelInfo}
                    onChange={(e) => {
                      setNewLabelInfo(e.target.value);
                    }}
                    onClick={(event) => event.stopPropagation()}
                    style={{
                      marginRight: "1rem",
                      width: "3rem",
                      borderRadius: "5px",
                      border: "none",
                      textAlign: "end",
                    }}
                  />
                  <Button variant="outlined" onClick={handleEditLabelInfo}>
                    儲存目標
                  </Button>
                </>
              ) : (
                <>
                  <Typography
                    variant="caption"
                    color="inherit"
                    sx={{ marginRight: "1rem" }}
                  >
                    {labelInfo}
                  </Typography>
                  <Button onClick={handleEditLabelInfo} variant="outlined">
                    編輯
                  </Button>
                </>
              )}
              {/** */}
            </>
          )}
        </Box>
      }
      style={styleProps}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  bgColorForDarkMode: PropTypes.string,
  color: PropTypes.string,
  colorForDarkMode: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  isPersonal: PropTypes.bool,
};

export default function GmailTreeView({ isPersonal, data }) {
  const renderTree = (nodes) => (
    <StyledTreeItem
      key={nodes.nodeId}
      nodeId={nodes.nodeId}
      labelText={nodes.labelText}
      labelIcon={nodes.labelIcon}
      labelInfo={nodes.labelInfo}
      color={nodes.color}
      bgColor={nodes.bgColor}
      colorForDarkMode={nodes.colorForDarkMode}
      bgColorForDarkMode={nodes.bgColorForDarkMode}
      isPersonal={isPersonal}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </StyledTreeItem>
  );
  return (
    <TreeView
      aria-label="assets"
      // defaultExpanded={["1", "2"]}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      sx={{
        maxHeight: "300px",
        flexGrow: 1,
        maxWidth: 400,
        overflowY: "scroll",
        scrollbarWidth: "none", // 新增這行來隱藏滾動條（for Firefox）
        msOverflowStyle: "none", // 新增這行來隱藏滾動條（for IE and Edge）
        "&::-webkit-scrollbar": {
          width: "0.4em",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#333",
        },
      }}
    >
      {data.map((node) => renderTree(node))}
    </TreeView>
  );
}
