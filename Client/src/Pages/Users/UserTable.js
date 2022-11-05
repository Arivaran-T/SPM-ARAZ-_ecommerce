import {
  Paper,
  MenuItem,
  Button,
  Select,
  Typography,
  TextField,
} from "@mui/material";
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
import User from "./User";
import generateUserReport from "./generateUserReport";

import SearchIcon from "@mui/icons-material/Search";

function UserTable() {
  const navigate = useNavigate();

  // take from fetching data
  const [getAlladdress, setgetAlladdress] = useState([]);
  const [updatedList, setList] = useState(getAlladdress);
  const [serchvalue, setSerchvalue] = useState();

  const [isEmptyList, setEmpty] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/User")
      .then((res) => {
        setgetAlladdress(res.data.userList);
        setList(res.data.userList);
      })
      .catch(() => {});
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  // using change the color after clicking
  const [buttoncolor, setbuttoncolor] = useState("#1A374D");

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - getAlladdress.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const getSearchValue = (value) => {
    console.log(value);
    if (!value.trim()) {
      setEmpty(false);
      setList(getAlladdress);
      return;
    }

    const updated = getAlladdress.filter(
      (user) =>
        user.id.toUpperCase().includes(value.toUpperCase()) ||
        user.name.toUpperCase().includes(value.toUpperCase()) ||
        user.email.toUpperCase().includes(value.toUpperCase())
    );
    console.log(updated);
    setList(updated);
    if (updated.length === 0) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
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
                  All Users
                </Typography>
              </Box>
              <br />
              <Box mt={1} sx={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    generateUserReport(getAlladdress);
                  }}
                  sx={{
                    fontFamily: "open sans",
                    fontWeight: "700",
                    textTransform: "none",
                  }}
                  style={{ backgroundColor: buttoncolor }}
                >
                  Generate Report
                </Button>
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "row" }}
                px={1}
                py={0}
                m={0}
              >
                <TextField
                  value={serchvalue}
                  onChange={(event) => {
                    console.log(event);
                    setSerchvalue(event.target.value);
                  }}
                  color="status"
                  fullWidth
                  placeholder="search..."
                  size="small"
                  InputProps={{
                    style: { color: "#333" },
                  }}
                />
                <IconButton
                  onClick={() => getSearchValue(serchvalue)}
                  sx={{
                    bgcolor: "#FEC260",
                    borderRadius: 0.5,
                    ml: 0.3,
                    "&:hover": {
                      bgcolor: "#1597BB",
                    },
                  }}
                >
                  <SearchIcon />
                </IconButton>
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
                        User ID
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
                        UserName
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
                        Email
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
                        User Type
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
                      ? updatedList.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : updatedList
                    ).map((row) => (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <User data={row} />
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
                        colSpan={3}
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

export default UserTable;
