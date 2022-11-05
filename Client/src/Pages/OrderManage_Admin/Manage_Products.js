import { Select, MenuItem } from "@mui/material";

import { useState } from "react";

import TableCell from "@mui/material/TableCell";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Box } from "@mui/system";

function Manage_Products(Props) {
  const baseURL = "http://localhost:5000/";
  const [Status, setStatus] = useState(Props.data.orderStatus);

  const SatatusDATA = [
    { status: "Processing" },
    { status: "Shipped" },
    { status: "Delivered" },
  ];
  console.log(Props.indexes);
  console.log(Props.orderId);
  const orderStatus = (sta) => {
    axios
      .put(
        `${baseURL}Order/sellerOrder?orderId=${Props.orderId}&indexNo=${Props.indexes}&orderStatus=${sta}`
      )
      .then((res) => {
        toast("change the order Status", { type: "info" });
      })
      .catch((er) => {
        toast("Unable to remove product", { type: "error" });
      });
  };

  return (
    <>
      <TableCell
        align="left"
        style={{
          fontFamily: "open sans",
          fontWeight: "600",
          fontSize: 16,
          color: "#1A374D",
        }}
      >
        {Props.data.productID}
      </TableCell>
      <TableCell
        align="left"
        style={{
          fontFamily: "open sans",
          fontWeight: "600",
          fontSize: 16,
          color: "#1A374D",
        }}
      >
        {Props?.data?.count ?? "0"}
      </TableCell>
      <TableCell
        style={{
          fontFamily: "open sans",
          fontWeight: "600",
          fontSize: 16,
          color: "#1A374D",
        }}
      >
        <Select
          sx={{ color: "#FFF", fontWeight: "500", bgcolor: "#406882" }}
          onChange={(event) => {
            setStatus(event.target.value);
            orderStatus(event.target.value);
          }}
          fullWidth
          required
          size="small"
          color="info"
          id="Status"
          value={Status}
        >
          {SatatusDATA.map((row, index) => {
            return (
              <MenuItem
                key={index}
                sx={{
                  fontFamily: "open sans",
                  fontSize: 15,
                  color: "#333",
                }}
                value={row.status}
              >
                {row.status}
              </MenuItem>
            );
          })}
        </Select>
      </TableCell>
      <ToastContainer />
    </>
  );
}

export default Manage_Products;
