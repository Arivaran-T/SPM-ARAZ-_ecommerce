import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import ButtonA from "../../../Components/ButtonA";
import Input from "../../../Components/Input";
import Label from "../../../Components/Label";
import { login } from "../../../Store/auth";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";

function Profile_Details() {
  const { userID, role } = useSelector((state) => state.loging);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newemail, setNewemail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState();
  const [dob, setDob] = useState("");
  const [otpPin, setOtpPin] = useState("");
  const [error, setError] = useState(false);
  const [visibility, setVisibility] = useState(false);

  //get user details by id and fetch data
  useEffect(() => {
    axios
      .get("http://localhost:5000/User/" + userID)
      .then((res) => {
        if (res) {
          setName(res.data.user.name);
          setEmail(res.data.user.email);
          setContactNo(res.data.user.contactNo);
          setAddress(res.data.user.address);
          setGender(res.data.user.gender);
          setDob(res.data.user.dob);
        }
      })
      .catch((er) => {
        toast(er.response.data.msg, { type: "error" });
      });
  }, []);

  //update user details
  const updateHandler = () => {
    setError(false);
    //validation
    if (!name.trim() || name.length < 2) {
      toast("Enter valid Name", { type: "error" });
      return setError(true);
    }
    if (contactNo.length < 8) {
      toast("Enter valid Contact Number", { type: "error" });
      return setError(true);
    }
    if (!address.trim() || address.length < 3) {
      toast("Enter valid Address", { type: "error" });
      return setError(true);
    }
    if (dob == "") {
      toast("Enter valid Date of birth", { type: "error" });
      return setError(true);
    }
    const data = {
      name: name,
      contactNo: contactNo,
      address: address,
      gender: gender,
      dob: dob,
    };
    axios
      .put("http://localhost:5000/User/" + userID, data)
      .then((res) => {
        setTimeout(() => {
          toast("Sucessfully Update your Details", { type: "success" });
        }, 1500);

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })

      .catch((er) => {
        toast(er.response.data.msg, { type: "error" });
      });
  };

  //check new email and send otp
  const emailUpdateHandler = () => {
    setError(false);
    if (!email.trim() || !email.includes("@") || !email.includes(".")) {
      toast("Enter valid Email", { type: "error" });
      return setError(true);
    }
    const data = {
      email: email,
    };
    axios
      .put("http://localhost:5000/User/email/" + userID, data)
      .then((res) => {
        setNewemail(res.data.user.email);
        setTimeout(() => {
          setVisibility(true);
          toast("OTP Send to your new " + res.data.user.email + " Email", {
            type: "success",
          });
        }, 1500);
      })

      .catch((er) => {
        toast(er.response.data.msg, { type: "error" });
      });
  };

  //check whether otp is correct and update email
  const otpSubmitHandler = () => {
    setError(false);
    //validation
    if (!otpPin.trim() || otpPin.length < 3) {
      toast("Enter Valid Otp", { type: "error" });
      return setError(true);
    }
    const data = {
      id: userID,
      otp: otpPin,
    };
    //check otp
    axios
      .post(`http://localhost:5000/User/otp`, data)
      .then((res) => {
        if (res) {
          const data = {
            email: newemail,
          };
          //update email
          axios
            .put("http://localhost:5000/User/" + userID, data)
            .then((res) => {
              if (res) {
                setVisibility(false);
                setTimeout(() => {
                  toast("Sucessfully Update your Email", { type: "success" });
                }, 1500);

                setTimeout(() => {
                  window.location.reload();
                }, 1500);
              } else {
                console.log("----Error----");
              }
            })

            .catch((er) => {
              toast(er.response.data.msg, { type: "error" });
            });
        }
      })

      .catch((er) => {
        setTimeout(() => {
          toast(er.response.data.msg, { type: "error" });
        }, 1500);
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
              Profile
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
            {/* dob */}
            <Label title="Date of Birth" for="dob" />
            {/* <Input id="dob" size="small" type="date" value={dob} set={setDob} /> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disableFuture
                openTo="year"
                views={["year", "month", "day"]}
                value={dob}
                onChange={(newValue) => {
                  setDob(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            {/* update button */}
            <Box mt={2} />
            <ButtonA fullWidth={true} title="UPDATE" handler={updateHandler} />
            <Box mt={2} />
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
            {/* OTP button */}
            <Box mt={2} />
            <ButtonA
              fullWidth={true}
              title="SEND OTP"
              handler={emailUpdateHandler}
            />
            <Box mt={2} />
            {visibility && (
              <>
                {/* OTP Pin */}
                <Label title="OTP" for="otp" />
                <Input
                  id="otp"
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
                  handler={otpSubmitHandler}
                />
                <Box mt={2} />
              </>
            )}
          </Container>
        </Box>
      </Paper>
    </>
  );
}

export default Profile_Details;
