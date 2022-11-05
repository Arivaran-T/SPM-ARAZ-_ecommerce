import {
  Box,
  Button,
  Link,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import ButtonA from "../../Components/ButtonA";
import Input from "../../Components/Input";
import Label from "../../Components/Label";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const OnSubmitHandler = () => {
    setError(false);
    //validation
    if (!email.trim() || !email.includes("@") || !email.includes(".")) {
      toast("Enter valid Email", { type: "error" });
      return setError(true);
    }

    axios
      .get("http://localhost:5000/User/resetPwd/" + email)
      .then((res) => {
        if (res) {
          setTimeout(() => {
            toast("OTP Send to your " + res.data.user.email + " Email.", {
              type: "success",
            });
          }, 2000);

          setTimeout(() => {
            navigate("/otp/" + res.data.user.id);
          }, 4000);
        }
      })

      .catch((er) => {
        toast("No user found", { type: "error" });
        console.log(er);
      });
  };

  return (
    <>
      <Box
        sx={{
          my: 10,
        }}
      >
        <ToastContainer />
        <Container maxWidth="sm">
          <Box component={Paper} sx={{ bgcolor: "#fff" }} p={3} my={2.5}>
            {/* title */}
            <Typography
              sx={{
                fontFamily: "open sans",
                fontWeight: "1000",
                color: "#2B4865",
                letterSpacing: -0.9,
                fontSize: 20,
                my: 1,
                textAlign: "center",
              }}
            >
              Reset Password
            </Typography>
            {/* Email */}
            <Label title="Email" for="email" />
            <Input
              id="email"
              autoFocus={true}
              size="small"
              placeholder="xxxxxx@gmail.com"
              type="text"
              value={email}
              set={setEmail}
            />

            {/* submit button */}
            <Box mt={2} />
            <ButtonA
              fullWidth={true}
              title="SUBMIT"
              handler={OnSubmitHandler}
            />
            <Box mt={2} />
            {/* <Typography
              sx={{
                fontFamily: "open sans",
                fontWeight: "500",
                color: "#2B4865",
                letterSpacing: -0.9,
                fontSize: 15,
                my: 1,
                textAlign: "right",
              }}
            >
              1.00
            </Typography> */}
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default ForgotPassword;
