import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { Container } from "@mui/system";
import Input from "../../Components/Input";
import Label from "../../Components/Label";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ToastContainer, toast } from "react-toastify";
import Ack from "../../Components/Ack";

//icon
import DeleteIcon from "@mui/icons-material/Delete";

//react
import { useEffect, useState } from "react";
import ButtonA from "../../Components/ButtonA";
import { Navigate, useNavigate, useParams } from "react-router";
import axios from "axios";

function Offer() {
  //data
  const [product, setProduct] = useState("");
  const [percentage, setpercentage] = useState("");
  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);

  //id
  const { id } = useParams();

  const navigate = useNavigate();

  //cal new price
  const calNewPrice = (price, percentage) => {
    if (percentage && percentage <= 100) {
      return price - price * (percentage / 100);
    } else {
      return price;
    }
  };

  //base url
  const baseURL = "http://localhost:5000/";

  // add offer
  const addOffer = () => {
    const data = { percentage, validUntil: date };
    axios
      .post(`${baseURL}products/offer/${id}`, data)
      .then((res) => {
        toast("offer added", { type: "info" });
        setTimeout(() => {
          navigate("/store");
        }, 1000);
      })
      .catch((er) => {
        toast("unable to add offer", { type: "error" });
      });
  };

  //
  useEffect(() => {
    axios
      .get(`${baseURL}products/${id}`)
      .then((res) => {
        setProduct(res.data.product);
        setpercentage(res.data.product?.offer?.percentage);
        setDate(res.data.product?.offer?.validUntil);
      })
      .catch((er) => {
        toast("error while getting data", { type: "error" });
      });
  }, []);

  //delete offer
  const deleteOffer = () => {
    setOpen(false);
    axios
      .delete(`${baseURL}products/offer/${id}`)
      .then((res) => {
        toast("Offer deleted", { type: "info" });
        setTimeout(() => {
          navigate("/store");
        }, 1000);
      })
      .catch((er) => {
        toast("Unable to delete", { type: "error" });
      });
  };
  return (
    <>
      <Ack
        handleYes={deleteOffer}
        open={open}
        handleClose={() => setOpen(false)}
        title="Delete?"
        msg="Do you want to delete?"
      />
      <ToastContainer />
      <Box>
        <Container maxWidth="sm">
          {/* title */}
          <Typography
            sx={{
              fontFamily: "open sans",
              fontWeight: "1000",
              color: "#2B4865",
              letterSpacing: -0.9,
              fontSize: 18,
              my: 1.5,
            }}
          >
            Manage Offer
          </Typography>
          {/* form */}
          <Box
            sx={{ bgcolor: "#fff" }}
            px={3}
            pt={3}
            pb={2}
            my={2}
            mb={7}
            component={Paper}
            elevation={1}
          >
            {/* discount percentage */}
            <Label for="offer_percentage" title="Discount percentage" />
            <Input
              id="offer_percentage"
              autoFocus={true}
              size="small"
              type="number"
              value={percentage}
              set={setpercentage}
              error={percentage > 100}
              helperText={percentage > 100 && "percentage should be below 100"}
            />
            {/* valid period */}
            <Label for="valid_date" title="Valid Until" />
            <LocalizationProvider disablePast dateAdapter={AdapterDateFns}>
              <DatePicker
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                disablePast
                renderInput={(params) => (
                  <TextField
                    color="info"
                    inputProps={{
                      style: { color: "#1597BB", fontWeight: "500" },
                    }}
                    id="valid_date"
                    fullWidth
                    size="small"
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
            {/* new price auto generate */}
            <Box sx={{ mb: 1 }} />
            <Label for="new_price" title="New Price (Auto Generate)" />
            <Input
              disabled={true}
              value={calNewPrice(product.price, percentage)}
              id="new_price"
              size="small"
              type="number"
            />
            {/* button */}
            <ButtonA handler={addOffer} fullWidth={true} title="SAVE" />
            {/* delete button sec */}
            <Box
              mt={1.5}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Box sx={{ flexGrow: 1 }} />
              {product?.offer && (
                <Button
                  onClick={() => setOpen(true)}
                  variant="outlined"
                  sx={{
                    fontFamily: "open sans",
                    fontWeight: "700",
                    textTransform: "none",
                  }}
                  color="error"
                  endIcon={<DeleteIcon />}
                >
                  DELETE
                </Button>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Offer;
