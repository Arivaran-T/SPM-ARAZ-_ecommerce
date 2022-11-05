import { Grid, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import { addAddress } from "../../../Store/OrderStore";
function SingleShippingAddress(props) {
  const dispatch = useDispatch();
  const onSumitFun = () => {
    dispatch(addAddress({ address: props.data }));
    props.next();
  };
  return (
    <>
      <Box mt={1}>
        <Button
          variant="outlined"
          sx={{
            textAlign: { sm: "left", xs: "right" },
            fontWeight: "700",
            fontFamily: "open sans",
            textTransform: "none",
            "&:hover": {
              bgcolor: "#D8D874",
            },
          }}
          onClick={() => props.new()}
        >
          Add New Shipping Address
        </Button>
      </Box>
      <Grid
        container
        p={2}
        m={2}
        spacing={2}
        sx={{
          width: "92%",
          border: 0,
          borderRadius: "6px",

          justifyContent: "center",
        }}
      >
        <Grid
          item
          my={2}
          sx={{
            justifyContent: "center",

            borderRadius: "10px",
            border: "3px solid #406882",
            "&:hover": {
              transform: "scale(1.01)",
              bgcolor: "#D8D874",
              transitionDuration: ".2s",
              transitionProperty: "all",
            },
          }}
        >
          <Grid item p={5}>
            <Box>
              <Typography
                style={{
                  justifyContent: "center",
                  fontsize: 30,
                  color: "#2B4865",
                  textAlign: "left",
                  fontWeight: 600,
                  fontFamily: "open sans",
                }}
              >
                {props.data.name}
              </Typography>{" "}
              <Typography
                style={{
                  justifyContent: "center",
                  fontsize: 30,
                  color: "#2B4865",
                  textAlign: "left",
                  fontWeight: 600,
                  fontFamily: "open sans",
                }}
              >
                {props.data.province}
              </Typography>
              <Typography
                style={{
                  justifyContent: "center",
                  fontsize: 30,
                  color: "#2B4865",
                  textAlign: "left",
                  fontWeight: 600,
                  fontFamily: "open sans",
                }}
              >
                {props.data.district}
              </Typography>
              <Typography
                style={{
                  justifyContent: "center",
                  fontsize: 30,
                  color: "#2B4865",
                  textAlign: "left",
                  fontWeight: 600,
                  fontFamily: "open sans",
                }}
              >
                {props.data.address}
              </Typography>
              <Typography
                style={{
                  justifyContent: "center",
                  fontsize: 30,
                  color: "#2B4865",
                  textAlign: "left",
                  fontWeight: 600,
                  fontFamily: "open sans",
                }}
              >
                {props.data.contactNumber}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box
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
              onClick={onSumitFun}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Grid>
    </>
  );
}

export default SingleShippingAddress;
