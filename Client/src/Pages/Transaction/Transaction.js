import React, { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

export default function Transaction() {
  const { token, role, userID } = useSelector((state) => state.loging);

  //state
  const [transactions, setTransactions] = useState([]);

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  //base url
  const baseURL = "http://localhost:5000/";

  useEffect(() => {
    axios
      .get(`${baseURL}User/${userID}/transactions`)
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((er) => {});
  }, []);

  return (
    <Box>
      <Container maxWidth="md">
        {/* header sec */}
        {/* <Box>
          <Box sx={{ flexGrow: 1 }} />
          <Button sx={{ color: "#073050" }}>Print Report</Button>
        </Box> */}
        {/* data sec */}
        {transactions?.length < 0 && (
          <Typography sx={{ textAlign: "center", mt: 3, mb: 48 }}>
            No Transaction data
          </Typography>
        )}
        {transactions?.length > 0 && (
          <TableContainer component={Paper} sx={{ my: 5 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              {/* heading */}
              <TableHead>
                <TableRow sx={{ bgcolor: "#1A374D" }}>
                  <TableCell sx={{ color: "#fff" }}>Transaction ID #</TableCell>
                  <TableCell sx={{ color: "#fff" }} align="right">
                    Date
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }} align="right">
                    Amount
                  </TableCell>
                </TableRow>
              </TableHead>
              {/* data part */}
              <TableBody>
                {transactions.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.date}</TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </Box>
  );
}
