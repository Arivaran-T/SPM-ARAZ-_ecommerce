import { CardMedia, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";

// Icons
import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import calReview from "../../Helper/calReview";
import calNewPrice from "../../Helper/calNewPrice";
// axios
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";

function Favorite_Product(props) {
  console.log(props.data.id);
  const { userID, role } = useSelector((state) => state.loging);

  //url
  const baseURL = "http://localhost:5000/";

  const Favorite = props.data;

  const [star, setStar] = useState(0);
  const [count, setCount] = useState(1);
  useEffect(() => {
    setStar(calReview(Favorite?.reviews));
  }, []);
  // addshoppingcart fun
  // const AddShoppingCart = () => {};
  // delete fun
  const OnDelete = () => {
    axios
      .delete(
        `http://localhost:5000/User/favorite?userId=${userID}&indexNo=${props.index}`
      )
      .then((res) => {
        setTimeout(() => {
          toast("succesfully remove from Whishlist", { type: "info" });
        }, 100);
        setTimeout(() => {
          window.location.reload();
        }, 2000);

        setTimeout(() => {}, 1000);
      })
      .catch((er) => {});
  };
  //add to cart
  const addToCart = () => {
    const data = {
      productId: props.data.id,
      count: count,
      userId: userID,
    };

    console.log(data);

    axios
      .post(
        `http://localhost:5000/User/cart?productId=${props.data.id}&count=${count}&userId=${userID}`
      )
      .then((res) => {
        console.log(res.data);
        toast("Added to cart", { type: "info" });
      })
      .catch((er) => {
        toast("Unable to add to cart", { type: "error" });
      });
  };
  return (
    <>
      <ToastContainer />
      <Grid item sx={{ width: { md: 850, xs: 440, sm: 700 } }}>
        <Box
          component={Paper}
          elevation={1}
          sx={{
            borderRadius: 2,
            bgcolor: "#fff",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            "&:hover": { transform: "scale(1.01)" },
            transitionDuration: ".2s",
            transitionProperty: "all",
          }}
        >
          <Box>
            <CardMedia
              component="img"
              sx={{
                width: { md: 200, sm: 240, xs: 425 },
                height: { md: 200, sm: 240, xs: 265 },

                borderRadius: "5px 5px 2px 2px ",
              }}
              image={`${baseURL}products/images/${Favorite?.images[0]}`}
            />
          </Box>

          {/* title */}
          <Box p={2}>
            <Typography
              sx={{
                fontFamily: "Open sans",
                fontWeight: "900",
                fontSize: 14,
                color: "#2B4865",
                letterSpacing: -0.5,
              }}
            >
              {Favorite.title}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Open sans",
                fontWeight: "500",
                fontSize: 14,
                color: "#2B4865",
                letterSpacing: -0.5,
              }}
            >
              {Favorite?.description.substring(0, 60)}...
              {/* {desc} */}
            </Typography>
            {/* Rating */}
            <Box
              my={1}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {" "}
              {[1, 2, 3, 4, 5].map((row, index) => {
                if (star >= row) {
                  return (
                    <StarIcon
                      key={index}
                      sx={{ color: "#FEC260", fontSize: 13 }}
                    />
                  );
                } else {
                  return (
                    <StarBorderIcon
                      key={index}
                      sx={{ color: "#333", fontSize: 13 }}
                    />
                  );
                }
              })}
              <Typography
                sx={{
                  color: "#333",
                  fontSize: 10,
                  fontFamily: "open sans",
                  fontWeight: "700",
                  ml: 2,
                }}
              >
                {/* 102 Rating */}
                {Favorite?.review?.length ?? 0} Rating
              </Typography>
            </Box>
            {/* price */}
            <Box pt={1}>
              <Typography
                sx={{
                  color: "red",
                  fontSize: 15,
                  fontFamily: "open sans",
                  fontWeight: "800",
                }}
              >
                Rs : {calNewPrice(Favorite.price, Favorite?.offer)}
              </Typography>
            </Box>
            {/* discout price */}
            <Box>
              {props.data?.offer !== null ? (
                <Typography
                  sx={{
                    color: "silver",
                    fontSize: 12,
                    fontFamily: "open sans",
                    fontWeight: "700",
                  }}
                >
                  <s>Rs : {props.data?.price} </s>-
                  {props.data?.offer?.percentage}%
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
                  <s>offer</s>
                </Typography>
              )}
            </Box>
          </Box>
          <Box
            my={1}
            sx={{
              p: 1,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifycontent: "space-between",
            }}
          >
            {/* add to cart button */}
            <IconButton
              aria-label="delete"
              variant="contained"
              size="large"
              onClick={addToCart}
              sx={{
                justifycontent: "flex-start",
                m: 1,
                size: 30,
                color: "#fff",
                bgcolor: "#FEC260",
                "&:hover": { bgcolor: "#1597BB" },
              }}
            >
              <AddShoppingCartOutlinedIcon />
            </IconButton>
            {/* delete button */}
            <IconButton
              aria-label="delete"
              variant="contained"
              size="large"
              onClick={OnDelete}
              sx={{
                justifycontent: "flex-end",

                // m: 1,
                size: 30,
                color: "#fff",
                bgcolor: "#FF0000",
                "&:hover": { bgcolor: "#1597BB" },
              }}
            >
              <DeleteOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
      </Grid>
    </>
  );
}

export default Favorite_Product;
