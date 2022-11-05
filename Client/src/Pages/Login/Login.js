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
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { login } from "../../Store/auth";
import { useDispatch } from "react-redux";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const OnSubmitHandler = () => {
    setError(false);
    //validation
    if (!email.trim() || !email.includes("@") || !email.includes(".")) {
      toast("Enter valid Email", { type: "error" });
      return setError(true);
    }
    if (!password.trim() || password.length < 5) {
      toast("Enter valid Password", { type: "error" });
      return setError(true);
    }
    const data = {
      email: email,
      password: password,
    };
    axios
      .post(`http://localhost:5000/User/login`, data)
      .then((res) => {
        dispatch(
          login({
            role: res.data.user.userType,
            userID: res.data.user.id,
            /*token: res.data.token*/
          })
        );
        toast(res.data.msg, { type: "success" });

        setTimeout(() => {
          navigate("/", { replace: true });
        }, 2000);
      })

      .catch((er) => {
        toast(er.response.data.msg, { type: "error" });
      });
  };
  return (
    <>
      <Box
        sx={{
          my: 10,
        }}
      >
        {" "}
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
              Welcome Back,
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

            {/* Password */}
            <Label for="password" title="Password" />
            <Input
              id="password"
              type="password"
              size="small"
              value={password}
              set={setPassword}
            />

            <Link
              href="/passworForgot"
              underline="none"
              color="red"
              sx={{ mr: "210px", fontFamily: "open sans" }}
            >
              Forgot Password?
            </Link>
            {/* </Typography> */}

            <Link
              href="/signup"
              underline="none"
              fontSize={15}
              sx={{ mr: "20px", fontFamily: "open sans" }}
            >
              Don't have Account?
            </Link>
            {/* login button */}
            <Box mt={2} />
            <ButtonA
              fullWidth={true}
              title="LOG IN"
              handler={OnSubmitHandler}
            />
            <Box mt={2} />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Login;
