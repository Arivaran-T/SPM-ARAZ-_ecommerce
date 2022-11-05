import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Modify from "./Modify";
import { ToastContainer, toast } from "react-toastify";

export default function PaymentManage() {
  const [payment, setpayment] = useState();
  const [isLoaded, setLoaded] = useState(false);

  //state
  const [edit, setEdit] = useState(false);

  const baseURL = "http://localhost:5000/";

  const { token, role, userID } = useSelector((state) => state.loging);

  useEffect(() => {
    axios
      .get(`${baseURL}User/${userID}/payment`)
      .then((res) => {
        setLoaded(true);
        setpayment(res.data);
      })
      .catch((er) => {
        setLoaded(true);
      });
  }, []);

  return (
    <Box
      p={{ sm: 3, xs: 1 }}
      sx={{ bgcolor: "#FFFFFF", borderRadius: "6px" }}
      pt={5}
      pb={10}
    >
      <ToastContainer />
      {isLoaded ? (
        payment?.nameOnCard !== null ? (
          edit ? (
            <Modify payment={payment} />
          ) : (
            <Display payment={payment} isLoaded={isLoaded} setEdit={setEdit} />
          )
        ) : (
          <Modify />
        )
      ) : null}
    </Box>
  );
}

const Display = (props) => {
  const { payment, isLoaded, setEdit } = props;
  const baseURL = "http://localhost:5000/";
  const { token, role, userID } = useSelector((state) => state.loging);

  //delete payment
  const deletePayment = () => {
    axios
      .delete(`${baseURL}User/payment/${userID}`)
      .then((res) => {
        toast("Payment details removed", { type: "info" });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((er) => {
        toast("Unable to remove details", { type: "error" });
      });
  };

  return (
    <>
      {isLoaded && payment && (
        <Box sx={{ px: { sm: 5, xs: 2 }, pt: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: { md: "60%", xs: "100%", sm: "95%" },
              }}
            >
              <Box
                sx={{ bgcolor: "silver", borderRadius: 4 }}
                p={2}
                mt={1}
                //
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
                  {payment?.cardNumber.substring(
                    payment?.cardNumber.length,
                    -2
                  )}
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
              <Box
                mt={1}
                mx={{
                  sm: 3.5,
                  xs: 0,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  onClick={() => setEdit(true)}
                  disableTouchRipple
                  disableRipple
                  disableFocusRipple
                  sx={{ textTransform: "none" }}
                  color="info"
                >
                  Edit
                </Button>
                <Button
                  onClick={deletePayment}
                  disableTouchRipple
                  disableRipple
                  disableFocusRipple
                  sx={{ textTransform: "none" }}
                  color="error"
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
