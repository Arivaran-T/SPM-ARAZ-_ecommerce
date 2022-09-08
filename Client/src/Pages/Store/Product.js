import { Button, CardMedia, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";

//icon
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";

function Product(props) {
  const review = 4;
  const product = props.data;

  return (
    <>
      <Grid item sx={{ width: { md: 250, xs: 350 } }}>
        <Box
          component={Paper}
          elevation={1}
          sx={{
            borderRadius: 1,
            bgcolor: "#fff",
            "&:hover": { transform: "scale(1.03)" },
            transitionDuration: ".3s",
            transitionProperty: "all",
          }}
        >
          {/* image sec */}
          <CardMedia
            component="img"
            sx={{
              width: "100%",
              height: 230,
              overflow: "scroll",
              borderRadius: "5px 5px 0 0 ",
            }}
            image={
              "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?cs=srgb&dl=pexels-designecologist-1779487.jpg&fm=jpg"
            }
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
              Computer with 2TB hard disk and 256 SSD, 11th generation..
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
                Rs : 200,000.00
              </Typography>
            </Box>
            {/* discount sec */}
            <Box>
              <Typography
                sx={{
                  color: "silver",
                  fontSize: 12,
                  fontFamily: "open sans",
                  fontWeight: "700",
                }}
              >
                <s>Rs : 200,000.00 -15%</s>
              </Typography>
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
                102 Rating
              </Typography>
            </Box>
            {/* divider */}
            <hr
              style={{
                borderTop: "2px dashed #333",
                bgcolor: "none",
                margin: "5px 0",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Button
                href={`/products/view/${props.id}`}
                sx={{ color: "#1597BB", textTransform: "none", fontSize: 13 }}
              >
                VIEW
              </Button>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                href={`/products/${props.id}`}
                sx={{ color: "#1A374D", textTransform: "none", fontSize: 13 }}
              >
                EDIT
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  );
}

export default Product;
