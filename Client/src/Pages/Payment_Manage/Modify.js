import { Box, Button } from "@mui/material";
import { useState } from "react";
import Input from "../../Components/Input";
import Label from "../../Components/Label";

import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import FormatDate from "../../Helper/formatDate";
import ButtonA from "../../Components/ButtonA";

function Modify(props) {
  const { token, role, userID } = useSelector((state) => state.loging);

  const baseURL = "http://localhost:5000/";

  const payment = props.payment;

  //state
  const [nameOncard, setNameOnCard] = useState(payment?.nameOnCard ?? "");
  const [cardNumber, setCardNumber] = useState(payment?.cardNumber ?? "");
  const [expiryMonth, setExpiryMonth] = useState(payment?.expiryMonth ?? "");
  const [expiryYear, setExpieyYear] = useState(payment?.expiryYear ?? "");
  const [cvc, setCVC] = useState(payment?.cvc ?? "");

  //add payment
  const addPayment = () => {
    if (!nameOncard.trim()) {
      return toast("Fill all fields", { type: "error" });
    }
    if (cardNumber.toString().trim().length !== 12) {
      return toast("Required valid card number", { type: "error" });
    }
    if (expiryMonth.toString().trim() > 12 || expiryMonth < 1) {
      return toast("Required valid month", { type: "error" });
    }
    if (expiryYear.toString().trim() < new Date().getFullYear()) {
      return toast("Required valid year", { type: "error" });
    }
    if (cvc.toString().trim() > 999 || cvc < 1) {
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
      .post(`${baseURL}User/payment/${userID}`, data)
      .then((res) => {
        toast("New payment method added", { type: "info" });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((er) => {
        toast("Invalid data", { type: "error" });
      });
  };

  return (
    <>
      <Box
        p={0}
        m={0}
        sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
      >
        <Box sx={{ px: { sm: 5, xs: 1 }, pt: 2 }}>
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

          <Box my={2}>
            <ButtonA handler={addPayment} fullWidth={true} title="SUBMIT" />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Modify;
