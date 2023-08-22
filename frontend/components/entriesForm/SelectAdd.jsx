import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import styles from "../../styles/selectadd.module.scss";

const ITEM_HEIGHT = 48;

export default function SelectAdd({
  isDebit,
  addBox,
  isDescriptionVisible,
  setDescriptionVisible,
}) {
  const options = [
    isDescriptionVisible ? "取消註解" : "增加註解",
    isDebit ? "新增借方科目" : "新增貸方科目",
  ];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const selected = (e) => {
    if (
      e.target.innerText === "新增借方科目" ||
      e.target.innerText === "新增貸方科目"
    ) {
      addBox();
    } else if (
      e.target.innerText === "增加註解" ||
      e.target.innerText === "取消註解"
    ) {
      setDescriptionVisible(!isDescriptionVisible);
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <div
        className={styles.circle}
        id="long-button"
        role="button"
        aria-label="add the input box"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            setAnchorEl(event.currentTarget);
          }
        }}
        style={{
          backgroundImage: "url('/add.png')",
        }}
      />

      {/* <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton> */}
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "16ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={selected}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
