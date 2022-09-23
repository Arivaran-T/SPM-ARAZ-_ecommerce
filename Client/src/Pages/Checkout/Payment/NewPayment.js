import { Box, Button } from "@mui/material";
import { useState } from "react";
import Input from "../../../Components/Input";
import Label from "../../../Components/Label";

import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

function NewPayment(props) {
  // 63187f8829fe6a6deecec97a

  const baseURL = "http://localhost:5000/";
  const total = useSelector((state) => state.order.total);

  //state
  const [nameOncard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpieyYear] = useState("");
  const [cvc, setCVC] = useState("");

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

    axios
      .post(`${baseURL}User/payment/${"63187f8829fe6a6deecec97a"}`, data)
      .then((res) => {
        // props.handleNext();
        //add transaction
        toast("Payment successed", { type: "info" });
      })
      .catch((er) => {
        toast("Invalid data", { type: "error" });
      });
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
