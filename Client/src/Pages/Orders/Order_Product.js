import { useEffect, useState } from "react";

import TableCell from "@mui/material/TableCell";
import axios from "axios";

function Order_Product(Props) {
  const [Status, setStatus] = useState("processing");

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
        {Props.data.count}
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
        {Props.data.orderStatus}
      </TableCell>
    </>
  );
}

export default Order_Product;
