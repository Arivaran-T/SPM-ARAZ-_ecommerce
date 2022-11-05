import {
  Box,
  CardMedia,
  Checkbox,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";

//icon
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import calreview from "../../Helper/calReview";
import calNewPrice from "../../Helper/calNewPrice";

import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

function Product(props) {
  const { token, role, userID } = useSelector((state) => state.loging);
  const id = props.data.productID;

  const [count, setCount] = useState(1);
  const [product, setProduct] = useState();
  const [star, setStar] = useState(0);

  const [isChecked, setChecked] = useState(false);

  //url
  const baseURL = "http://localhost:5000/";

  //get data
  useEffect(() => {
    axios
      .get(`${baseURL}products/${id}`)
      .then((res) => {
        const product = res.data.product;
        setProduct(product);
        setCount(props.data.count);
        setStar(calreview(product?.reviews));
      })
      .catch((er) => {});
  }, []);

  //remove from cart
  const removeFromCart = () => {
    const data = new FormData();

    data.append("userId", userID);
    data.append("productId", id);

    axios
      .put(`${baseURL}User/cart`, data)
      .then((res) => {
        toast("Product removed from cart", { type: "info" });
      })
      .catch((er) => {
        toast("Unable to remove product", { type: "error" });
      });
  };

  return (
    <Box sx={{ bgcolor: "#fff" }} mb={2} p={0}>
      <Grid
        sx={{ borderRadius: 10 }}
        container
        justifyContent={"start"}
        alignItems="stretch"
      >
        <Grid item xs={12} sm={3}>
          <CardMedia
            component="img"
            alt="product image"
            sx={{
              width: "100%",
              height: 200,
              // height: "100%",
              borderRadius: { sm: "3px 0 0 3px", xs: "3px 3px 0 0 " },
            }}
            image={`${baseURL}products/images/${product?.images[0]}`}
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
            p={1.5}
          >
            {/* title sec */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "start",
                justifyContent: "top",
              }}
            >
              <Typography
                onClick={() => {
                  //TODO
                }}
                sx={{
                  cursor: "pointer",
                  py: 0.7,
                  fontFamily: "Open sans",
                  fontWeight: "900",
                  fontSize: 16,
                  color: "#1597BB",
                  letterSpacing: -0.5,
                }}
              >
                {product?.title}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Checkbox
                onChange={(event) => {
                  setChecked(event.target.checked);
                  props.checked(
                    count,
                    event.target.checked,
                    calNewPrice(product?.price, product?.offer),
                    id
                  );
                }}
                color="secondary"
                sx={{ color: "#1597BB" }}
              />
            </Box>
            {/* rating sec */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {[1, 2, 3, 4, 5].map((row, index) => {
                if (star >= row) {
                  return <StarIcon key={index} sx={{ color: "#FEC260" }} />;
                } else {
                  return <StarBorderIcon key={index} sx={{ color: "#333" }} />;
                }
              })}
              <Typography
                sx={{
                  color: "#333",
                  fontSize: 12,
                  fontFamily: "open sans",
                  fontWeight: "700",
                  ml: 2,
                }}
              >
                {product?.reviews?.length} Rating
              </Typography>
            </Box>
            {/* peice sec */}
            <Box>
              <Typography
                sx={{
                  color: "red",
                  fontSize: 13,
                  fontFamily: "open sans",
                  fontWeight: "800",
                }}
              >
                Rs : {calNewPrice(product?.price, product?.offer)}
              </Typography>
            </Box>
            {/* discount sec */}
            <Box>
              {product?.offer !== null ? (
                <Typography
                  sx={{
                    color: "silver",
                    fontSize: 12,
                    fontFamily: "open sans",
                    fontWeight: "700",
                  }}
                >
                  <s>
                    Rs : {product?.price} -{product?.offer.percentage}%
                  </s>
                </Typography>
              ) : (
                <Typography
                  sx={{
                    color: "silver",
                    fontSize: 12,
                    fontFamily: "open sans",
                    fontWeight: "700",
                  }}
                >
                  <s>Offer</s>
                </Typography>
              )}
            </Box>
            {/* quantity sec */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography sx={{ color: "#2B4865", mr: 3, fontWeight: 700 }}>
                Quanitity
              </Typography>
              <IconButton
                onClick={() => {
                  if (isChecked) {
                    props.click(
                      calNewPrice(product?.price, product?.offer),
                      "inc",
                      id
                    );
                  }
                  setCount((pre) => {
                    return ++pre;
                  });
                }}
                disableRipple
              >
                <AddIcon
                  sx={{
                    bgcolor: "#1597BB",
                    fontSize: 30,
                    mr: 2,
                    color: "#fff",
                  }}
                />
              </IconButton>
              <Typography sx={{ fontSize: 18 }}>{count}</Typography>
              <IconButton
                onClick={() => {
                  setCount((pre) => {
                    if (pre === 1) {
                      return 1;
                    } else {
                      if (isChecked) {
                        props.click(
                          calNewPrice(product?.price, product?.offer),
                          "dec",
                          id
                        );
                      }
                      return --pre;
                    }
                  });
                }}
                disableRipple
              >
                <RemoveIcon
                  sx={{
                    bgcolor: "#1597BB",
                    fontSize: 30,
                    ml: 2,
                    color: "#fff",
                  }}
                />
              </IconButton>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton onClick={removeFromCart}>
                <DeleteIcon color="error" />
              </IconButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Product;
