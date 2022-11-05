import { Button, Grid, Paper, Typography, Pagination } from "@mui/material";
import { Box } from "@mui/system";
import SingleShippingAddress from "./Single_Shipping_address";
import { useEffect, useState } from "react";
import ShippingAddress_Form from "./ShippingAddress_Form";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

function ShippingAddress(props) {
  const dispatch = useDispatch();
  const { token, role, userID } = useSelector((state) => state.loging);
  const [shipping, setshipping] = useState([]);
  // const [empty, setempty] = useState(false);

  // new
  const [isLoaded, setLoaded] = useState(false);
  const [val, setVal] = useState(false);
  const handleNew = () => {
    setVal(true);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/User/shippingAddress/" + userID)
      .then((res) => {
        setLoaded(true);
        setshipping(res.data.address);
      })
      .catch(() => {
        setLoaded(true);
      });
  }, []);

  const [selectedValue, setSelectedValue] = useState("1");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  const addAddress = () => {
    console.log(shipping);
    dispatch(addAddress({ address: shipping }));
    props.handleNext();
  };
  return (
    <>
      <Box
        p={3}
        sx={{
          borderRadius: "6px",
          bgcolor: "#FFFFFF",
        }}
      >
        <Grid container>
          {/* {show && ( */}
          <Box
            p={3}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                p={2}
                sx={{
                  fontsize: { md: 45, xs: 25 },
                  color: "#2B4865",
                  textAlign: { md: "left", xs: "center" },
                  fontWeight: "1000",
                  fontFamily: "open sans",
                }}
              >
                Shipping Address
              </Typography>
            </Box>
          </Box>

          {isLoaded ? (
            shipping ? (
              val ? (
                <ShippingAddress_Form next={props.handleNext} />
              ) : (
                <SingleShippingAddress
                  data={shipping}
                  new={handleNew}
                  next={props.handleNext}
                />
              )
            ) : (
              <ShippingAddress_Form next={props.handleNext} />
            )
          ) : null}

          {/* <Box
            p={3}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: { md: "row", sm: "row", xs: "row" },
              justifyContent: "space-between",
            }}
          >
            <Box ml={1} pl={1}>
              <Button
                variant="contained"
                sx={{
                  fontWeight: "700",
                  fontFamily: "open sans",
                  textTransform: "none",
                }}
                onClick={props.handleNext}
                // onClick={addAddress}
              >
                Next
              </Button>
            </Box>
          </Box> */}
        </Grid>
      </Box>
    </>
  );
}

export default ShippingAddress;
