import { Button, CardMedia, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";

//icon
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import calNewPrice from "../../Helper/calNewPrice";
import { useEffect, useState } from "react";
import calReview from "../../Helper/calReview";

function Product(props) {
  const review = 4;
  const [star, setStar] = useState(0);
  const product = props.data;

  useEffect(() => {
    setStar(calReview(product?.reviews));
  }, []);

  //url
  const baseURL = "http://localhost:5000/";

  //hook
  const navigate = useNavigate();
  return (
    <>
      <Grid item sx={{ width: { md: 250, xs: 350 } }}>
        <Box
          onClick={() => {
            navigate(`/products/view/${product.id}`);
          }}
          component={Paper}
          elevation={1}
          sx={{
            borderRadius: 1,
            bgcolor: "#fff",
            "&:hover": { transform: "scale(1.01)" },
            transitionDuration: ".3s",
            transitionProperty: "all",
            cursor: "pointer",
          }}
        >
          {/* image sec */}
          <CardMedia
            component="img"
            sx={{
              width: "100%",
              height: 190,
              borderRadius: "5px 5px 0 0 ",
            }}
            image={`${baseURL}products/images/${product?.images[0]}`}
          />
          {/* title sec */}
          <Box p={1}>
            <Typography
              sx={{
                fontFamily: "Open sans",
                fontWeight: "800",
                fontSize: 13,
                color: "#2B4865",
                letterSpacing: -0.5,
              }}
            >
              {product?.title}
            </Typography>
            {/* price sec */}
            <Box>
              <Typography
                sx={{
                  color: "red",
                  fontSize: 12,
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
                if (star >= row) {
                  return <StarIcon key={index} sx={{ color: "#FEC260" }} />;
                } else {
                  return <StarBorderIcon key={index} sx={{ color: "#333" }} />;
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
                ({product?.reviews?.length ?? 0}) Rating
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  );
}

export default Product;
