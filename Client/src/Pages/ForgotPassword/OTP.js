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
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function OTP(props) {
  const { id } = useParams();
  const [otpPin, setOtpPin] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const OnSubmitHandler = () => {
    setError(false);
    //validation
    if (!otpPin.trim() || otpPin.length < 3) {
      toast("Enter Valid Otp", { type: "error" });
      return setError(true);
    }
    const data = {
      id: id,
      otp: otpPin,
    };

    axios
      .post(`http://localhost:5000/User/otp`, data)
      .then((res) => {
        setTimeout(() => {
          toast("Otp Matched. You can now reset Password", { type: "success" });
        }, 1500);

        setTimeout(() => {
          navigate("/passwordReset/" + id, { replace: true });
        }, 4000);
      })

      .catch((er) => {
        setTimeout(() => {
          toast(er.response.data.msg, { type: "error" });
        }, 1500);
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
              OTP Validation
            </Typography>
            {/* OTP Pin */}
            <Label title="OTP" for="otp" />
            <Input
              id="otp"
              autoFocus={true}
              size="small"
              type="number"
              value={otpPin}
              set={setOtpPin}
            />

            {/* submit button */}
            <Box mt={2} />
            <ButtonA
              fullWidth={true}
              title="SUBMIT"
              handler={OnSubmitHandler}
            />
            <Box mt={2} />
            <Typography
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
              <Link href="/passwordReset" underline="none" fontSize={15}>
                Resend OTP
              </Link>
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default OTP;
