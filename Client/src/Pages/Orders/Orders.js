import Order from "./Order";
import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Orders() {
  const { userID, role } = useSelector((state) => state.loging);
  const [orderdata, setorderdata] = useState([]);
  const [isLoaded, setLoded] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/Order/user?userId=${userID}`)
      .then((res) => {
        setorderdata(res.data);
        setLoded(true);
      })
      .catch(() => {
        setLoded(true);
      });
  }, []);

  return (
    <>
      <Paper elevation={4}>
        <Box
          p={3}
          sx={{ bgcolor: "#FFFFFF", borderRadius: "6px" }}
          pt={5}
          pb={10}
        >
          <Box>
            <Typography
              sx={{
                fontFamily: "open sans",
                fontWeight: "1000",
                color: "#2B4865",
                letterSpacing: -0.9,
                fontSize: 22,
                my: 1.5,
              }}
            >
              Your Orders
            </Typography>
          </Box>

          <br />
          {orderdata.map((row) => {
            return <Order data={row} />;
          })}

          {isLoaded && orderdata.length <= 0 && (
            <Box sx={{ flex: 1, justifyContent: "center" }}>
              <Typography sx={{ textAlign: "center", color: "#555" }}>
                No Orders found
              </Typography>
            </Box>
          )}
          {!isLoaded && (
            <Box sx={{ flex: 1, justifyContent: "center" }}>
              <Typography sx={{ textAlign: "center", color: "#555" }}>
                Loading ..
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </>
  );
}

export default Orders;
