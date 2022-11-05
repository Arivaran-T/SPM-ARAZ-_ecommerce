import React from "react";
import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";

export default function AboutUs() {
  return (
    <>
      <Box sx={{ position: "relative" }}>
        <img
          style={{ width: "100%", height: "400px", resize: "cover" }}
          src={
            "https://fscl01.fonpit.de/userfiles/7715851/image/NextPit-Developer-Mode-w1400h788.jpg"
          }
        />
        <Box
          sx={{ position: "absolute", top: 250, left: 0, right: 0, flex: 1 }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontSize: { sm: 40, xs: 20 },
              textAlign: "center",
            }}
          >
            Delivering happiness on the go
          </Typography>
          <Typography
            sx={{
              color: "#fff",
              fontSize: { sm: 30, xs: 15 },
              textAlign: "center",
            }}
          >
            Happy Shopping
          </Typography>
        </Box>
        {/* body */}
        <Container maxWidth="lg" m={0} p={0}>
          <Box sx={{ flexDirection: "row", justifyContent: "center", flex: 1 }}>
            <img
              style={{ width: "100%" }}
              src="https://laz-img-cdn.alicdn.com/images/ims-web/TB1K3i9dBLoK1RjSZFuXXXn0XXa.jpg_2200x2200q75.jpg_.webp"
            />
          </Box>
          <Box sx={{ flexDirection: "row", justifyContent: "center", flex: 1 }}>
            <img
              style={{ width: "100%" }}
              src="https://laz-img-cdn.alicdn.com/images/ims-web/TB18SO.dCzqK1RjSZFpXXakSXXa.jpg_2200x2200q75.jpg_.webp"
            />
          </Box>
          <Box sx={{ flexDirection: "row", justifyContent: "center", flex: 1 }}>
            <img
              style={{ width: "100%" }}
              src="https://laz-img-cdn.alicdn.com/images/ims-web/TB1AEL.dOrpK1RjSZFhXXXSdXXa.jpg_2200x2200q75.jpg_.webp"
            />
          </Box>
          <Box sx={{ flexDirection: "row", justifyContent: "center", flex: 1 }}>
            <img
              style={{ width: "100%" }}
              src="https://laz-img-cdn.alicdn.com/images/ims-web/TB1T5YBdyLaK1RjSZFxXXamPFXa.jpg_2200x2200q75.jpg_.webp"
            />
          </Box>
          <Box sx={{ flexDirection: "row", justifyContent: "center", flex: 1 }}>
            <img
              style={{ width: "100%" }}
              src="https://laz-img-cdn.alicdn.com/images/ims-web/TB1T5YBdyLaK1RjSZFxXXamPFXa.jpg_2200x2200q75.jpg_.webp"
            />
          </Box>
          <Box sx={{ flexDirection: "row", justifyContent: "center", flex: 1 }}>
            <img
              style={{ width: "100%" }}
              src="https://laz-img-cdn.alicdn.com/images/ims-web/TB17wbidyrpK1RjSZFhXXXSdXXa.jpg_2200x2200q75.jpg_.webp"
            />
          </Box>
        </Container>
      </Box>
    </>
  );
}
