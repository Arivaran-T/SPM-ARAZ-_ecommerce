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
import PasswordStrengthBar from "react-password-strength-bar";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState();
  const [dob, setDob] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState(false);

  const OnSubmitHandler = () => {
    setError(false);
    //validation
    if (!name.trim() || name.length < 2) {
      toast("Enter valid Name", { type: "error" });
      return setError(true);
    }
    if (!email.trim() || !email.includes("@") || !email.includes(".")) {
      toast("Enter valid Email", { type: "error" });
      return setError(true);
    }
    if (!password.trim() || password.length < 5) {
      toast("Enter valid Password", { type: "error" });
      return setError(true);
    }
    if (!cpassword.trim() || cpassword.length < 5 || !(cpassword == password)) {
      toast("Please check confirm password", { type: "error" });
      return setError(true);
    }
    if (!contactNo.trim() || contactNo.length < 8) {
      toast("Enter valid Contact Number", { type: "error" });
      return setError(true);
    }
    if (!address.trim() || address.length < 3) {
      toast("Enter valid Address", { type: "error" });
      return setError(true);
    }
    if (!gender == "") {
      toast("Select a Gender", { type: "error" });
      return setError(true);
    }
    if (!dob.trim()) {
      toast("Enter valid Date of birth", { type: "error" });
      return setError(true);
    }
    const data = {
      name: name,
      email: email,
      password: password,
      userType: "buyer",
      contactNo: contactNo,
      address: address,
      gender: gender,
      dob: dob,
    };
    axios
      .post(`http://localhost:5000/User`, data)
      .then((res) => {
        dispatch(
          login({
            role: res.data.user.userType,
            userID: res.data.user.id,
            /*token: res.data.token*/
          })
        );
        setTimeout(() => {
          toast("Registered Sucess", { type: "success" });
        }, 1000);

        setTimeout(() => {
          navigate("/profile/details");
        }, 1500);
      })

      .catch(() => {
        toast("Error Occured", { type: "error" });
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
              Register
            </Typography>
            {/* user name */}
            <Label title="UserName" for="uname" />
            <Input
              id="uname"
              autoFocus={true}
              size="small"
              type="text"
              value={name}
              set={setName}
            />
            {/* Email */}
            <Label title="Email" for="email" />
            <Input
              id="email"
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
            {/* contact number */}
            <Label title="Contact Number" for="contact_number" />
            <Input
              id="contact_number"
              size="small"
              placeholder="07xxxxxxxx"
              type="number"
              value={contactNo}
              set={setContactNo}
            />
            {/* address */}
            <Label for="address" title="Address" />
            <Input
              id="address"
              multiple={true}
              minRows={3}
              maxRows={4}
              type="text"
              size="small"
              value={address}
              set={setAddress}
            />
            {/* gender */}
            <Label title="Gender" for="gender" />
            <Select
              sx={{ mb: 1, color: "#1597BB", fontWeight: "500" }}
              fullWidth
              required
              size="small"
              color="info"
              id="gender"
              value={gender}
              set={setGender}
            >
              <MenuItem value={"male"} selected>
                Male
              </MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
            </Select>
            {/* dob */}
            <Label title="Date of Birth" for="dob" />
            <Input id="dob" size="small" type="date" value={dob} set={setDob} />

            {/* save button */}
            <Box mt={2} />
            <ButtonA
              fullWidth={true}
              title="REGISTER"
              handler={OnSubmitHandler}
            />
            <Box mt={2} />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default SignUp;
