import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Product from "./Product";

//icon
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useEffect, useState } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import { addProducts, addTotal } from "../../Store/OrderStore";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Cart() {
  const dispatch = useDispatch();
  const baseURL = "http://localhost:5000/";

  const { token, role, userID } = useSelector((state) => state.loging);

  //hook
  const navigate = useNavigate();

  //state
  const [products, setProducts] = useState();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [subTotal, setSubtotal] = useState(0);
  const [loyalty, setLoyalty] = useState(0);
  const [addloyalty, setAddLoyalty] = useState(0);
  const [delivary, setDelivary] = useState(100);

  useEffect(() => {
    getCart();
    getLoyalty();
  }, []);

  //get loyalty
  const getLoyalty = () => {
    axios
      .get(`${baseURL}User/${userID}/loyalty`)
      .then((res) => {
        setLoyalty(res.data);
      })
      .catch((er) => {});
  };

  //get cart
  const getCart = () => {
    axios
      .get(`${baseURL}User/${userID}/cart`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((er) => {});
  };

  //cal sub total
  const calSUbTotal = (count, checked, price, id) => {
    setSubtotal((pre) => {
      let val = price * count;
      if (checked) {
        return pre + val;
      } else {
        return pre - val;
      }
    });
    //set selected products
    setSelectedProducts((pre) => {
      let array;
      if (checked) {
        array = [...pre, { productID: id, count: count }];
      } else {
        array = pre.filter((item) => {
          if (item.productID !== id) {
            return item;
          }
        });
      }
      return array;
    });
  };

  const increaseSUbTotal = (price, action, id) => {
    setSubtotal((pre) => {
      if (action === "inc") {
        return pre + price;
      } else {
        return pre - price;
      }
    });
    //
    setSelectedProducts((pre) => {
      let array = [...pre];
      let index = pre.findIndex((item) => item.productID === id);
      if (action === "inc") {
        array[index] = { productID: id, count: pre[index].count + 1 };
      } else {
        array[index] = { productID: id, count: pre[index].count - 1 };
      }
      return array;
    });
  };

  const handlecheckout = () => {
    dispatch(addProducts({ products: selectedProducts }));
    dispatch(addTotal({ total: subTotal - addloyalty + delivary }));
    navigate("/checkout");
  };

  return (
    <>
      <ToastContainer />
      <Box>
        <Container maxWidth="md">
          <Box p={0.5} my={2}>
            {products?.map((item, index) => {
              return (
                <Product
                  click={increaseSUbTotal}
                  index={index}
                  checked={calSUbTotal}
                  data={item}
                  key={index}
                />
              );
            })}
          </Box>
          {/* price sec */}
          <Box component={Paper} elevation={2} p={1.5} my={2}>
            <Box
              mb={2}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
              }}
            >
              {/* sub total sec */}
              <Typography
                sx={{ fontWeight: 700, fontSize: { xs: 18, sm: 20 } }}
              >
                Sub-Total : {subTotal}
              </Typography>
              {/* ponit sec */}
              <Box
                mt={{ sm: 0, xs: 1 }}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontWeight: 700 }}>
                  Points : {loyalty}
                </Typography>
                <Button
                  onClick={() => {
                    if (loyalty !== 0) {
                      setAddLoyalty(loyalty);
                    }
                    setLoyalty(0);
                  }}
                  sx={{ ml: 2, fontWeight: 700 }}
                  variant="outlined"
                  color="secondary"
                >
                  RADEEM
                </Button>
              </Box>
            </Box>
            {/* line */}
            <hr
              style={{
                borderTop: "2px dashed #333",
                bgcolor: "none",
                width: "100%",
              }}
            />
            {/* calculation sec */}
            <Box mt={2}>
              {/* cal sec */}
              <Box sx={{ width: { md: "25%", xs: "55%", sm: "35%" } }}>
                <Grid container>
                  {/* sub total */}
                  <Grid item xs={5}>
                    <Typography sx={{ fontWeight: 600, color: "#1597BB" }}>
                      Sub Total
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    {" "}
                    :{" "}
                  </Grid>
                  <Grid item xs={5}>
                    <Typography sx={{ fontWeight: 600, color: "#333" }}>
                      {subTotal}
                    </Typography>
                  </Grid>
                  {/* loyalty */}
                  <Grid item xs={5}>
                    <Typography sx={{ fontWeight: 600, color: "#1597BB" }}>
                      Loyalty
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    {" "}
                    :{" "}
                  </Grid>
                  <Grid item xs={5}>
                    <Typography sx={{ fontWeight: 600, color: "#333" }}>
                      {addloyalty}
                    </Typography>
                  </Grid>
                  {/* delivary */}
                  <Grid item xs={5}>
                    <Typography sx={{ fontWeight: 600, color: "#1597BB" }}>
                      Delivary
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    {" "}
                    :{" "}
                  </Grid>
                  <Grid item xs={5}>
                    <Typography sx={{ fontWeight: 600, color: "#333" }}>
                      {delivary}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              {/* line */}
              <hr
                style={{
                  borderTop: "2px dashed #333",
                  bgcolor: "none",
                  width: "100%",
                }}
              />
              {/* total */}
              <Box sx={{ width: { md: "25%", xs: "55%", sm: "35%" } }}>
                <Grid container>
                  <Grid item xs={5}>
                    <Typography
                      sx={{ fontWeight: 800, color: "#333", fontSize: 20 }}
                    >
                      Total
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    {" "}
                    :{" "}
                  </Grid>
                  <Grid item xs={5}>
                    <Typography
                      sx={{ fontWeight: 600, color: "#333", fontSize: 20 }}
                    >
                      {subTotal - addloyalty + delivary}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              {/* btn */}
              <Box my={2}>
                <Button
                  onClick={handlecheckout}
                  disableElevation
                  disabled={selectedProducts?.length === 0}
                  sx={{
                    width: { xs: "100%", sm: "auto" },
                    textTransform: "none",
                  }}
                  color="info"
                  variant="contained"
                  endIcon={<ShoppingCartCheckoutIcon />}
                >
                  Checkout
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Cart;
