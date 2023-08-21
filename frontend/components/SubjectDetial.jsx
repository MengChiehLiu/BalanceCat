import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { DotGothic16 } from "next/font/google";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

const dot = DotGothic16({
  weight: "400",
  subsets: ["cyrillic"],
});
const columns = [
  { id: "date", label: "日期", minWidth: 100 },
  { id: "amount", label: "金額", minWidth: 100 },
  { id: "description", label: "註解", minWidth: 100 },
  { id: "day", label: "曜日", minWidth: 100 },
];

function createData(date, amount, description, debit, credit) {
  const parsedDate = new Date(date); // 將字串轉換成 Date 物件
  const dayNum = parsedDate.getDay(); // 取得星期幾的數字
  let day = "還沒";
  switch (dayNum) {
    case 0:
      day = "星期天";
      break;
    case 1:
      day = "星期一";
      break;
    case 2:
      day = "星期二";
      break;
    case 3:
      day = "星期三";
      break;
    case 4:
      day = "星期四";
      break;
    case 5:
      day = "星期五";
      break;
    case 6:
      day = "星期六";
      break;
    default:
      day = "錯誤";
      break;
  }
  const parts = date.split("-");
  const formattedDate = `${parts[0]}/${parts[1]}/${parts[2]}`;
  return { date: formattedDate, amount, description, day, debit, credit };
}

const rows = [
  createData(
    "2023-8-17",
    "$ 100,000",
    "小明在國小同學會的時候跟我借了１０萬元，他說8/13時會回我部分現金，約在台北車站面交",
    "負債",
    "資產",
  ),
  createData(
    "2023-8-17",
    "$ 100,000",
    "小明在國小同學會的時候跟我借了１０萬元，他說8/13時會回我部分現金，約在台北車站面交",
    "負債",
    "資產",
  ),
  createData(
    "2023-8-16",
    "$ 100,000",
    "小明在國小同學會的時候跟我借了１０萬元，他說8/13時會回我部分現金，約在台北車站面交",
    "負債",
    "資產",
  ),
  createData(
    "2023-8-13",
    "$ 100,000",
    "小明在國小同學會的時候跟我借了１０萬元，他說8/13時會回我部分現金，約在台北車站面交",
    "負債",
    "資產",
  ),
  createData(
    "2023-8-13",
    "$ 100,000",
    "小明在國小同學會的時候跟我借了１０萬元，他說8/13時會回我部分現金，約在台北車站面交",
    "負債",
    "資產",
  ),
  createData(
    "2023-8-12",
    "$ 100,000",
    "小明在國小同學會的時候跟我借了１０萬元，他說8/13時會回我部分現金，約在台北車站面交",
    "負債",
    "資產",
  ),
  createData(
    "2023-8-11",
    "$ 100,000",
    "小明在國小同學會的時候跟我借了１０萬元，他說8/13時會回我部分現金，約在台北車站面交",
    "負債",
    "資產",
  ),
  createData(
    "2023-8-10",
    "$ 100,000",
    "小明在國小同學會的時候跟我借了１０萬元，他說8/13時會回我部分現金，約在台北車站面交",
    "負債",
    "資產",
  ),
  createData(
    "2023-8-9",
    "$ 100,000",
    "小明在國小同學會的時候跟我借了１０萬元，他說8/13時會回我部分現金，約在台北車站面交",
    "負債",
    "資產",
  ),
  createData(
    "2023-8-9",
    "$ 100,000",
    "小明在國小同學會的時候跟我借了１０萬元，他說8/13時會回我部分現金，約在台北車站面交",
    "負債",
    "資產",
  ),
  createData(
    "2023-8-9",
    "$ 100,000",
    "小明在國小同學會的時候跟我借了１０萬元，他說8/13時會回我部分現金，約在台北車站面交",
    "負債",
    "資產",
  ),
];

export default function SubjectDetail() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);

  const handleClickOpen = (row) => {
    setSelectedRow(row);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        background: "linear-gradient(to bottom right, #eef0f2, #eee)",
        boxShadow: "0 0 40px rbg(0,0,0,0.5)",
        borderRadius: "20px",
        border: "3px solid #d9d9d9",
      }}
    >
      <TableContainer
        sx={{
          minHeight: 300,
          maxHeight: 440,
          // "&::-webkit-scrollbar-track": {
          //   backgroundColor: "#212131", // 更改滾動條軌道的顏色
          // },
          // "&::-webkit-scrollbar": {
          //   width: "12px", // 調整滾動條的寬度
          //   color: "#212131",
          // },
          // "&::-webkit-scrollbar-thumb": {
          //   backgroundColor: "#666", // 更改滾動條的顏色
          //   borderRadius: "10px", // 設定圓角
          // },
          // "&::-webkit-scrollbar-thumb:hover": {
          //   backgroundColor: "#777", // 滑鼠懸停時的顏色
          // },
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    background:
                      "linear-gradient(to bottom right, #eef0f2, #eee)",
                    // backgroundColor: "#212131",
                    // color: "white",
                  }}
                  className={dot.className}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              // backgroundColor: "#212131",
              "& :hover": {
                backgroundColor: "#fff",
              },
              cursor: "pointer",
            }}
          >
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  role="checkbox"
                  tabIndex={-1}
                  key={row.code}
                  onClick={() => handleClickOpen(row)}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        // style={{ color: "white" }}
                      >
                        {column.id === "description" && value.length > 30
                          ? `${value.slice(0, 30)}...`
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
          <Dialog open={openDialog} onClose={handleClose}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <DialogTitle>詳細資訊</DialogTitle>
              <Button
                variant="contained"
                sx={{ cursor: "pointer", margin: "1rem 1rem 0 0" }}
              >
                刪除分錄
              </Button>
            </div>

            <DialogContent sx={{ paddingTop: "0" }}>
              {selectedRow && (
                <div>
                  <p>日期： {selectedRow.date}</p>
                  <p>金額： {selectedRow.amount}</p>
                  <p>註解： {selectedRow.description}</p>
                  <p>曜日： {selectedRow.day}</p>
                  <p>借方： {selectedRow.debit}</p>
                  <p>貸方： {selectedRow.credit}</p>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          // color: "white",
          "& .Mui-disabled": {
            color: "#ccc",
          },
          // backgroundColor: "#170023",
          // "& .MuiTablePagination-selectIcon": {
          //   color: "white",
          // },
        }}
      />
    </Paper>
  );
}
