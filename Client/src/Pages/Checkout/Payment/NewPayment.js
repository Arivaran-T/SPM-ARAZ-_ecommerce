import { Box, Button } from "@mui/material";
import { useState } from "react";
import Input from "../../../Components/Input";
import Label from "../../../Components/Label";

import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import FormatDate from "../../../Helper/formatDate";

function NewPayment(props) {
  const { token, role, userID } = useSelector((state) => state.loging);
  const { products, address } = useSelector((state) => state.order);

  //state
  var orderID = "";

  let OderProducts = products?.map((item) => {
    return { ...item, orderStatus: "Processing" };
  });

  const baseURL = "http://localhost:5000/";
  const total = useSelector((state) => state.order.total);

  //state
  const [nameOncard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpieyYear] = useState("");
  const [cvc, setCVC] = useState("");
  // time
  const locale = "en";
  const today = new Date();

  const time = today.toLocaleTimeString(locale, {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
  });

  //add payment
  const addPayment = () => {
    if (!nameOncard.trim()) {
      return toast("Fill all fields", { type: "error" });
    }
    if (cardNumber.trim().length !== 12) {
      return toast("Required valid card number", { type: "error" });
    }
    if (expiryMonth.trim() > 12 || expiryMonth < 1) {
      return toast("Required valid month", { type: "error" });
    }
    if (expiryYear.trim() < new Date().getFullYear()) {
      return toast("Required valid year", { type: "error" });
    }
    if (cvc.trim() > 999 || cvc < 1) {
      return toast("Required valid year", { type: "error" });
    }

    const data = {
      nameOnCard: nameOncard,
      cardNumber: cardNumber,
      expiryMonth: expiryMonth,
      expiryYear: expiryYear,
      cvc: cvc,
    };

    const transactionData = {
      id: new Date().toISOString(),
      date: FormatDate(new Date()),
      amount: total,
    };

    axios
      .post(`${baseURL}User/payment/${userID}`, data)
      .then((res) => {
        //add transaction
        addTransaction(transactionData);
        addOrder();
      })
      .catch((er) => {
        toast("Invalid data", { type: "error" });
      });

  };

  //add transaction
  const addTransaction = (data) => {
    axios
      .post(`${baseURL}User/${userID}/transactions`, data)
      .then((res) => {
        toast("Payment successed", { type: "info" });
        // props.handleNext();
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
        emptyCart();
        //TODO empty store as well
      })
      .catch((er) => {});
  };

  //empty cart
  const emptyCart = () => {
    axios
      .delete(`${baseURL}User/${userID}/cart`)
      .then((res) => {
        props.next(orderID);
      })
      .catch((er) => {});
  };

  return (
    <>
      <ToastContainer />
      <Box sx={{ px: { sm: 5, xs: 2 }, pt: 2 }}>
        <Label for="name_on_card" title="Name On Card" />
        <Input
          value={nameOncard}
          set={setNameOnCard}
          id="name_on_card"
          size="small"
          autoFocus={true}
        />
        <Label for="card_number" title="Card Number" />
        <Input
          value={cardNumber}
          set={setCardNumber}
          id="card_number"
          size="small"
          type="number"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: { sm: 2, xs: 0 },
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Label for="ex_month" title="Expiry Month" />
            <Input
              value={expiryMonth}
              set={setExpiryMonth}
              id="ex_month"
              size="small"
              type="number"
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Label for="ex_year" title="Expiry Year" />
            <Input
              value={expiryYear}
              set={setExpieyYear}
              id="ex_year"
              size="small"
              type="number"
            />
          </Box>
        </Box>
        <Label for="cvc" title="CVC" />
        <Input value={cvc} set={setCVC} id="cvc" size="small" type="number" />
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
              disabled
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
              // onClick={props.handleNext}
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

export default NewPayment;
