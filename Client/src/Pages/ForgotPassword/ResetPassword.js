import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import ButtonA from "../../Components/ButtonA";
import Input from "../../Components/Input";
import Label from "../../Components/Label";

import { login } from "../../Store/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router";
import PasswordStrengthBar from "react-password-strength-bar";

function ResetPassword() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [error, setError] = useState(false);

  const OnSubmitHandler = () => {
    setError(false);
    //validation

    if (!password.trim() || password.length < 5) {
      toast("Enter valid Password", { type: "error" });
      return setError(true);
    }
    if (!cpassword.trim() || cpassword.length < 5 || !(cpassword == password)) {
      toast("Please check conform password", { type: "error" });
      return setError(true);
    }

    const data = {
      password: password,
    };
    axios
      .put("http://localhost:5000/User/" + id, data)
      .then((res) => {
        setTimeout(() => {
          toast("Password reset  Sucess", { type: "success" });
        }, 1000);

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      })

      .catch((er) => {
        toast(er.response.data.msg, { type: "error" });
      });
  };

  return (
    <>
      <Box>
        <ToastContainer />
        <Container maxWidth="sm">
          {/* title */}

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

            {/* Password */}
            <Label for="password" title="Password" />
            <Input
              id="password"
              type="password"
              size="small"
              value={password}
              set={setPassword}
            />
            <PasswordStrengthBar password={password} />
            {/* Confirm Password */}
            <Label for="re_password" title="Confirm Password" />
            <Input
              id="re_password"
              type="password"
              size="small"
              value={cpassword}
              set={setCPassword}
            />
            {/* save button */}
            <Box mt={2} />
            <ButtonA
              fullWidth={true}
              title="SUBMIT"
              handler={OnSubmitHandler}
            />
            <Box mt={2} />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default ResetPassword;
