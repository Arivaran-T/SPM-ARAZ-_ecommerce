import { Paper, MenuItem, Button, Select, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Container } from "@mui/system";

import { useEffect, useState } from "react";

// all the table imports
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";

// usetheme
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";

// using icons for table pageination
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useNavigate } from "react-router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Category from "./Category";

function CategoryTable() {
  const navigate = useNavigate();

  // take from fetching data
  const [getAlladdress, setgetAlladdress] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/category")
      .then((res) => {
        setgetAlladdress(res.data.categoryList);
      })
      .catch(() => {});
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // using change the color after clicking
  const [buttoncolor, setbuttoncolor] = useState("#1A374D");

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - getAlladdress.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 20));
    setPage(0);
  };

  return (
    <>
      <Box my={3}>
        <Container maxWidth="lg">
          <Paper elevation={4}>
            <ToastContainer />
            <Box
              p={3}
              sx={{ bgcolor: "#FFFFFF", borderRadius: "6px" }}
              pt={5}
              pb={10}
            >
              <Box>
                <Typography
                  sx={{
                    textAlign: "center",
                    fontFamily: "open sans",
                    fontWeight: "1000",
                    color: "#2B4865",
                    letterSpacing: -0.9,
                    fontSize: 20,
                    my: 1.5,
                  }}
                >
                  All Category
                </Typography>
              </Box>
              <br />
              <Box mt={1} sx={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    navigate("/newCategory/" + "createC");
                  }}
                  sx={{
                    fontFamily: "open sans",
                    fontWeight: "700",
                    textTransform: "none",
                  }}
                  style={{ backgroundColor: buttoncolor }}
                >
                  Add New +
                </Button>
              </Box>
              <br />
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: "200", bgcolor: "#D8D8D8" }}
                  aria-label="caption table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="left"
                        style={{
                          fontFamily: "open sans",
                          fontWeight: "800",
                          fontSize: 16,
                          color: "#1A374D",
                        }}
                      >
                        Category Name
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          fontFamily: "open sans",
                          fontWeight: "800",
                          fontSize: 16,
                          color: "#1A374D",
                        }}
                      >
                        Details
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          fontFamily: "open sans",
                          fontWeight: "800",
                          fontSize: 16,
                          color: "#1A374D",
                        }}
                      >
                        Date
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          fontFamily: "open sans",
                          fontWeight: "800",
                          fontSize: 16,
                          color: "#1A374D",
                        }}
                      >
                        Edit
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          fontFamily: "open sans",
                          fontWeight: "800",
                          fontSize: 16,
                          color: "#1A374D",
                        }}
                      >
                        Delete
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? getAlladdress.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : getAlladdress
                    ).map((row) => (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <Category data={row} />
                      </TableRow>
                    ))}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[
                          20,
                          25,
                          30,
                          { label: "All", value: -1 },
                        ]}
                        colSpan={2}
                        count={getAlladdress.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: {
                            "aria-label": "rows per page",
                          },
                          native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>

              {/* <br />
              <Box mt={1} sx={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    navigate("/newCategory");
                  }}
                  sx={{
                    fontFamily: "open sans",
                    fontWeight: "700",
                    textTransform: "none",
                  }}
                  style={{ backgroundColor: buttoncolor }}
                >
                  Add New Category
                </Button>
              </Box> */}
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}

// this function using for Pagination

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
//

export default CategoryTable;
