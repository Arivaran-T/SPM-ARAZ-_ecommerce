import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import FormatDate from "../../../Helper/formatDate";
import { ToastContainer, toast } from "react-toastify";

function DefaultPayment(props) {
  const { token, role, userID } = useSelector((state) => state.loging);
  const { products, address } = useSelector((state) => state.order);

  //state
  var orderID = "";

  let OderProducts = products?.map((item) => {
    return { ...item, orderStatus: "Processing" };
  });

  const payment = props.data;
  const total = useSelector((state) => state.order.total);

  const baseURL = "http://localhost:5000/";

  // time
  const locale = "en";
  const today = new Date();

  const time = today.toLocaleTimeString(locale, {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
  });

  const addPayment = () => {
    const transactionData = {
      id: new Date().toISOString(),
      date: FormatDate(new Date()),
      amount: total,
    };
    // add transaction
    addTransaction(transactionData);
    // addorder
    addOrder();
  };

  //add transaction
  const addTransaction = (data) => {
    axios
      .post(`${baseURL}User/${userID}/transactions`, data)
      .then((res) => {
        toast("Payment successed", { type: "info" });
      })
      .catch((er) => {
        toast("Payment failed", { type: "error" });
      });
  };

  //empty cart
  const emptyCart = () => {
    axios
      .delete(`${baseURL}User/${userID}/cart`)
      .then((res) => {
        console.log(orderID);
        props.next(orderID);
      })
      .catch((er) => {});
  };

  // add Order
  const addOrder = () => {
    const Orderdata = {
      userId: userID,
      total: total,
      payment: true,
      address: address,
      products: OderProducts,
      date: FormatDate(new Date()),
      time: time,
    };

    axios
      .post(`http://localhost:5000/Order`, Orderdata)
      .then((res) => {
        orderID = res.data;
        console.log(res.data + "dd");
        emptyCart();
        //TODO empty store as well
      })
      .catch((er) => {});
  };

  return (
    <>
      <ToastContainer />
      <Box sx={{ px: { sm: 5, xs: 2 }, pt: 2 }}>
        <Box
          sx={{ bgcolor: "silver", borderRadius: 4 }}
          p={2}
          mt={1}
          mx={{ sm: 5, xs: 0 }}
        >
          <Typography
            sx={{
              fontFamily: "Open sans",
              fontSize: 20,
              fontWeight: 900,
              color: "blue",
            }}
          >
            VISA
          </Typography>
          <Typography
            sx={{
              fontFamily: "Open sans",
              fontSize: 17,
              fontWeight: 700,
              color: "black",
              mt: 3,
            }}
          >
            ****{" "}
            {payment?.cardNumber?.substring(payment?.cardNumber.length, -2)}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Open sans",
              fontSize: 17,
              fontWeight: 700,
              color: "black",
              mt: 1,
            }}
          >
            {payment.expiryMonth}/{payment.expiryYear}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Open sans",
              fontSize: 17,
              fontWeight: 700,
              color: "black",
              mt: 1,
              textAlign: "right",
            }}
          >
            {payment.nameOnCard}
          </Typography>
        </Box>
        {/* btn */}
        <Box mx={{ sm: 5, xs: 0 }}>
          <Button
            onClick={() => props.new()}
            disableTouchRipple
            disableRipple
            disableFocusRipple
            sx={{ textTransform: "none" }}
            color="info"
          >
            + pay with new card
          </Button>
        </Box>
        {/* button */}
        <Box
          py={3}
          sx={{
            display: "flex",
            flexDirection: { md: "row", sm: "row", xs: "row" },
            justifyContent: "space-between",
            px: { sm: 5, xs: 2 },
          }}
        >
          {/* button sec */}
          <Box>
            <Button
              disableElevation
              variant="contained"
              sx={{
                fontWeight: "700",
                fontFamily: "open sans",
                textTransform: "none",
              }}
              onClick={props.handleBack}
            >
              Back
            </Button>
          </Box>
          <Box ml={1}>
            <Button
              disableElevation
              variant="contained"
              sx={{
                fontWeight: "700",
                fontFamily: "open sans",
                textTransform: "none",
              }}
              onClick={addPayment}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default DefaultPayment;
