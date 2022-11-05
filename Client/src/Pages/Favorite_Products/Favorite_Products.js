import { Grid } from "@mui/material";
import { Typography, Container, Pagination } from "@mui/material";
// box in matrial ui
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import Favorite_Product from "./Favorite_Product";
import { useSelector } from "react-redux";

function Favorite_Products() {
  const { userID, role } = useSelector((state) => state.loging);
  const [favorite, setfavorite] = useState([]);
  const [isLoaded, setLoded] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:5000/User/favorite/" + userID)
      .then((res) => {
        setfavorite(res.data.productList);
        setLoded(true);
      })
      .catch((er) => {
        setLoded(true);
      });
  }, []);
  return (
    <>
      <Box>
        <Container maxWidth="lg">
          {/* title */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontFamily: "open sans",
                fontWeight: "1000",
                color: "#2B4865",
                letterSpacing: -0.9,
                fontSize: 20,
                my: 1.5,
              }}
            >
              Your Whishlist
            </Typography>
          </Box>
          <Grid
            mt={2}
            mb={7}
            container
            spacing={2}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {favorite.map((row, index) => {
              return <Favorite_Product index={index} data={row} />;
            })}
            {isLoaded && favorite.length <= 0 && (
              <Box sx={{ flex: 1, justifyContent: "center" }}>
                <Typography sx={{ textAlign: "center", color: "#555" }}>
                  No favorites found
                </Typography>
              </Box>
            )}
            {!isLoaded && (
              <Box sx={{ flex: 1, justifyContent: "center" }}>
                <Typography sx={{ textAlign: "center", color: "#555" }}>
                  Loading ..
                </Typography>
              </Box>
            )}
            {/* {dataempty && <Typography>no Favorite found </Typography>} */}
          </Grid>
        </Container>
      </Box>
      {/* pagination */}
      <Box
        my={3}
        sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
      >
        <Pagination shape="rounded" count={1} color="primary" />
      </Box>
    </>
  );
}

export default Favorite_Products;
