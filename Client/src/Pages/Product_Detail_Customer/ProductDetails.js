import {
  Box,
  Button,
  CardMedia,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";

//icon
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useState, useEffect } from "react";
import Review from "./Review";
import Input from "../../Components/Input";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useParams } from "react-router";
import axios from "axios";
import calNewPrice from "../../Helper/calNewPrice";
import { useSelector, useDispatch } from "react-redux";

function ProductDetails(props) {
  const { token, role, userID } = useSelector((state) => state.loging);

  //state
  const [previewImage, setPreviewImage] = useState("");
  const [isFavorite, setFavorite] = useState(false);
  const [count, setCount] = useState(1);
  const [userName, setUserName] = useState("");
  const [existInCart, setExistInCart] = useState(false);

  //review state
  const [review, setReview] = useState("");
  const [star, setStar] = useState(0);

  //image handler
  const setImage = (index) => {
    setPreviewImage(`${baseURL}products/images/${product?.images[index]}`);
  };

  //id
  const { id } = useParams();

  //get user data
  const getUserData = () => {
    axios
      .get(`${baseURL}User/${userID}`)
      .then((res) => {
        setUserName(res.data.user.name);
      })
      .catch((er) => {});
  };

  //url
  const baseURL = "http://localhost:5000/";

  //data
  const [imageArray, setImageArray] = useState([]);
  const [product, setProduct] = useState({});

  //handle favorite click
  const handlefavorite = (val) => {
    axios
      .put(
        `http://localhost:5000/User/Favorite?userId=${userID}&productId=${product.id}&val=${val}`
      )
      .then((res) => {
        setFavorite((isFavorite) => !isFavorite);
        if (!isFavorite) {
          toast("Added to Favoritelist", { type: "info" });
        } else {
          toast("remove to Favoritelist", { type: "error" });
        }
      })
      .catch(() => {});
  };

  //add review
  const addReview = () => {
    //validate
    if (star == 0) {
      return;
    }
    if (!review.trim()) {
      return;
    }

    //data
    const data = { userName: userName, date: new Date(), star, review };

    axios
      .post(`${baseURL}products/${product.id}/reviews`, data)
      .then((res) => {
        toast("Review added", { type: "info" });
      })
      .catch((er) => {
        toast("Unable to add review", { type: "error" });
      });
  };

  //add to cart
  const addToCart = () => {
    const data = new FormData();

    data.append("productId", id);
    data.append("count", count);
    data.append("userId", userID);

    axios
      .post(`${baseURL}User/cart`, data)
      .then((res) => {
        setExistInCart(true);
        toast("Added to cart", { type: "info" });
      })
      .catch((er) => {
        toast("Unable to add to cart", { type: "error" });
      });
  };

  //check product alredy exist in cart
  const checkcart = (id) => {
    axios
      .get(`${baseURL}User/${userID}/cart/${id}`)
      .then((res) => {
        setExistInCart(res.data);
      })
      .catch((er) => {});
  };

  //get data
  useEffect(() => {
    getUserData();
    axios
      .get(`${baseURL}products/${id}`)
      .then((res) => {
        const product = res.data.product;
        setProduct(product);
        checkcart(res.data.product.id);
        setPreviewImage(`${baseURL}products/images/${product?.images[0]}`);
      })
      .catch((er) => {});
  }, []);

  return (
    <>
      <ToastContainer />
      <Box>
        <Container maxWidth="md">
          <Box
            my={{ sm: 4, xs: 2 }}
            component={Paper}
            elevation={1}
            sx={{ bgcolor: "#fff" }}
          >
            <Grid
              sx={{ borderRadius: 10 }}
              container
              justifyContent={"start"}
              alignItems="stretch"
            >
              <Grid item xs={12} sm={4}>
                <Box>
                  <CardMedia
                    component="img"
                    sx={{
                      width: "100%",
                      minHeight: 250,
                      height: 300,

                      borderRadius: "5px 0 0 0px",
                      objectFit: "cover",
                    }}
                    image={previewImage}
                  />
                  {/* multiple image sec */}
                  <Box
                    p={1}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "stretch",
                      bgcolor: "#2B4865",
                      objectFit: "cover",
                    }}
                  >
                    <Grid container sx={{ p: 0, m: 0 }}>
                      {product?.images?.map((row, index) => {
                        return (
                          <Grid key={index} item xs={12 / imageArray.length}>
                            <Box mx={0.5}>
                              <img
                                onClick={() => {
                                  setImage(index);
                                }}
                                onMouseOver={() => {
                                  setImage(index);
                                }}
                                style={{
                                  width: "100%",
                                  maxHeight: "60px",
                                  height: "50px",
                                  margin: 1,
                                  cursor: "pointer",
                                  border: "1px solid #fff",
                                }}
                                src={`${baseURL}products/images/${product?.images[index]}`}
                              />
                            </Box>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={8}>
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
                      sx={{
                        py: 0.7,
                        fontFamily: "Open sans",
                        fontWeight: "900",
                        fontSize: 17,
                        color: "#1597BB",
                        letterSpacing: -0.5,
                      }}
                    >
                      {product.title}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton
                      onClick={() => {
                        handlefavorite(!isFavorite);
                      }}
                      disableRipple
                      size="small"
                      sx={{ ml: 2 }}
                    >
                      {isFavorite ? (
                        <FavoriteIcon sx={{ fontSize: 35, color: "red" }} />
                      ) : (
                        <FavoriteBorderIcon sx={{ fontSize: 35 }} />
                      )}
                    </IconButton>
                  </Box>
                  {/* rating sec */}
                  <Box
                    my={1}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {[1, 2, 3, 4, 5].map((row, index) => {
                      if (review >= row) {
                        return (
                          <StarIcon key={index} sx={{ color: "#FEC260" }} />
                        );
                      } else {
                        return (
                          <StarBorderIcon key={index} sx={{ color: "#333" }} />
                        );
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
                      {product?.review?.length ?? 0} Rating
                    </Typography>
                  </Box>
                  {/* peice sec */}
                  <Box>
                    <Typography
                      sx={{
                        color: "red",
                        fontSize: 15,
                        fontFamily: "open sans",
                        fontWeight: "800",
                      }}
                    >
                      Rs : {calNewPrice(product.price, product?.offer)}
                    </Typography>
                  </Box>
                  {/* discount sec */}
                  <Box>
                    <Typography
                      sx={{
                        color: "silver",
                        fontSize: 14,
                        fontFamily: "open sans",
                        fontWeight: "700",
                      }}
                    >
                      <s>
                        Rs : {product.price} {product?.offer?.percentage}
                      </s>
                    </Typography>
                  </Box>
                  {/* quantity sec */}
                  <Box
                    mt={{ xs: 2, sm: 5 }}
                    mb={2}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ color: "#2B4865", mr: 3 }}>
                      Quanitity
                    </Typography>
                    <IconButton
                      onClick={() => {
                        setCount((pre) => {
                          return ++pre;
                        });
                      }}
                      disableRipple
                    >
                      <AddIcon
                        sx={{
                          bgcolor: "#1597BB",
                          fontSize: 35,
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
                            return --pre;
                          }
                        });
                      }}
                      disableRipple
                    >
                      <RemoveIcon
                        sx={{
                          bgcolor: "#1597BB",
                          fontSize: 35,
                          ml: 2,
                          color: "#fff",
                        }}
                      />
                    </IconButton>
                  </Box>
                  {/* button sec */}
                  <hr
                    style={{
                      borderTop: "2px dashed #1597BB",
                      bgcolor: "none",
                      width: "100%",
                    }}
                  />
                  {/* add to cart or buy sec */}
                  <Box
                    mt={2}
                    mb={1}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      disabled={existInCart}
                      onClick={addToCart}
                      color="success"
                      variant="contained"
                      disableElevation
                      endIcon={<AddShoppingCartIcon />}
                      sx={{ color: "#1A374D", ml: { xs: 0, sm: 3 } }}
                    >
                      Add to Cart
                    </Button>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button
                      color="info"
                      variant="contained"
                      disableElevation
                      endIcon={<ShoppingCartCheckoutIcon />}
                      sx={{ color: "#fff", mr: { xs: 0, sm: 3 } }}
                    >
                      Buy
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          {/* descrption sec */}
          <Box
            p={2.5}
            my={4}
            component={Paper}
            elevation={1}
            sx={{ bgcolor: "#fff" }}
          >
            {/* title sec */}
            <Typography
              sx={{
                fontFamily: "Open sans",
                fontWeight: "900",
                fontSize: 16,
                color: "#1597BB",
                letterSpacing: -0.5,
                mb: 1,
              }}
            >
              More Details
            </Typography>
            {/* details sec */}
            <Typography
              sx={{
                fontWeight: "600",
                fontFamily: "open sans",
                fontSize: 13,
              }}
            >
              {product.description}
            </Typography>
          </Box>
          {/* review sec */}
          <Box
            p={2.5}
            my={4}
            component={Paper}
            elevation={1}
            sx={{ bgcolor: "#fff" }}
          >
            {/* title sec */}
            <Typography
              sx={{
                fontFamily: "Open sans",
                fontWeight: "900",
                fontSize: 16,
                color: "#1597BB",
                letterSpacing: -0.5,
                mb: 1,
              }}
            >
              Reviews
            </Typography>
            <hr
              style={{
                borderTop: "2px dashed #1597BB",
                bgcolor: "none",
              }}
            />
            {/* customer review form */}
            <Box mt={1.5}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography>Bad</Typography>
                <RadioGroup
                  onChange={(event) => {
                    setStar(event.target.value);
                  }}
                  defaultValue="1"
                  name="radio-buttons-group"
                >
                  <Box
                    ml={3}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {[1, 2, 3, 4, 5].map((item, index) => {
                      return (
                        <FormControlLabel
                          value={item}
                          key={index}
                          control={
                            <Radio sx={{ color: "#1597BB", p: 0, m: 0.5 }} />
                          }
                        />
                      );
                    })}
                  </Box>
                </RadioGroup>
                <Typography>Good</Typography>
              </Box>
              {/* form */}
              <Box py={2} pl={{ xs: 0, sm: 5 }}>
                <Input
                  placeholder="write your review.."
                  size="small"
                  minRows={3}
                  maxRows={5}
                  value={review}
                  set={setReview}
                />
              </Box>
            </Box>
            {/* button */}
            <Box mb={2} sx={{ display: "flex", flexDirection: "row" }}>
              <Box sx={{ flexGrow: { xs: 0, sm: 1 } }} />
              <Button
                onClick={addReview}
                sx={{ width: { xs: "100%", sm: 100 } }}
                color="info"
                variant="contained"
                disableElevation
              >
                SUBMIT
              </Button>
            </Box>
            <hr
              style={{
                borderTop: "2px dashed #1597BB",
                bgcolor: "none",
              }}
            />
            {/* review */}
            {product?.reviews?.map((item, index) => {
              return <Review data={item} key={index} />;
            })}
            {product?.reviews?.length === 0 && (
              <Typography>No reviews</Typography>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default ProductDetails;
