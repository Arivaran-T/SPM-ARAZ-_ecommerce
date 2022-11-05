import { Box, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import ButtonA from "../../../Components/ButtonA";
import Input from "../../../Components/Input";
import Label from "../../../Components/Label";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import PasswordStrengthBar from "react-password-strength-bar";

function Security() {
  const { userID } = useSelector((state) => state.loging);

  const [curPassword, setCurPassword] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/User/" + userID)
      .then((res) => {
        if (res) {
          setCurPassword(res.data.user.password);
        } else {
          toast("No user Found", { type: "error" });
        }
      })
      .catch((er) => {
        console.log(er);
        toast("Error in Sever", { type: "error" });
      });
  }, []);

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
      .put("http://localhost:5000/User/" + userID, data)
      .then((res) => {
        setTimeout(() => {
          toast("Password Update  Sucess", { type: "success" });
        }, 1500);

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })

      .catch((er) => {
        toast("Invalid User", { type: "error" });
      });
  };
  return (
    <>
      <Paper elevation={4}>
        <ToastContainer />
        <Box
          p={3}
          sx={{ bgcolor: "#FFFFFF", borderRadius: "6px" }}
          pt={5}
          pb={10}
        >
          {/* profile Details */}
          <Container maxWidth="sm">
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
              Change Password
            </Typography>
            {/* Current Password */}
            <Label for="curpassword" title="Current Password" />
            <Input
              id="curpassword"
              type="password"
              size="small"
              value={curPassword}
            />
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
              title="UPDATE"
              handler={OnSubmitHandler}
            />
            <Box mt={2} />
          </Container>
        </Box>
      </Paper>
    </>
  );
}

export default Security;
