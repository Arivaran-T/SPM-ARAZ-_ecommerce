import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import OrderManage from "./OrderManage";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

function OrderManages() {
  const { token, role, userID } = useSelector((state) => state.loging);

  //base url
  const baseURL = "http://localhost:5000/";

  //state
  const [order, setOrder] = useState([]);
  const [isLoaded, setLoded] = useState(false);

  useEffect(() => {
    axios
      .get(`${baseURL}Order/seller/${userID}`)
      .then((res) => {
        setOrder(res.data);
        setLoded(true);
      })
      .catch((er) => {
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
                fontSize: 20,
                my: 2,
              }}
            >
              Manage Orders
            </Typography>
          </Box>

          {order?.map((item, index) => {
            return <OrderManage key={index} data={item} />;
          })}
          {isLoaded && order.length <= 0 && (
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

export default OrderManages;
