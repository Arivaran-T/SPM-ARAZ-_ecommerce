import { Box, Grid, IconButton, Link, Typography } from "@mui/material";
//logo
import logo from "../Assets/logo.png";
import title from "../Assets/title.png";

//icon
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

const ArazLink = [
  { title: "Login", link: "/login" },
  { title: "Register", link: "/signup" },
  { title: "Account", link: "/profile/details" },
  { title: "Report", link: "/report" },
  { title: "About Us", link: "/about-us" },
];

const ShoppingLink = [
  { title: "Store", link: "/store" },
  { title: "Cart", link: "/cart" },
  { title: "Address Book", link: "/profile/addressbook" },
  { title: "Payment Book", link: "/profile/payment" },
  { title: "Loyalty Points", link: "/profile/loyalty" },
  { title: "Track Order", link: "/profile/order" },
];

function Footer() {
  return (
    <>
      <Box p={4} bgcolor={"#406882"}>
        <Grid
          container
          columnGap={1}
          rowGap={{ xs: 2, sm: 4 }}
          justifyContent={{ xs: "left", sm: "center" }}
          alignItems={"start"}
        >
          {/* sec 1 */}
          <Grid item xs={10} sm={4} md={2}>
            <Box>
              <Typography
                sx={{
                  color: "#fff",
                  fontFamily: "Open Sans",
                  fontWeight: "900",
                  letterSpacing: 3,
                  fontSize: 20,
                }}
              >
                ARAZ
              </Typography>
            </Box>
            <Box pl={1.5}>
              {ArazLink.map((row, index) => {
                return (
                  <Box key={index}>
                    <Link
                      sx={{
                        fontFamily: "open sans",
                        fontWeight: "400",
                        color: "#fff",
                        fontSize: 15,
                      }}
                      href={row.link}
                      underline="none"
                    >
                      {row.title}
                    </Link>
                  </Box>
                );
              })}
            </Box>
          </Grid>
          {/* sec 2 */}
          <Grid item xs={10} sm={4} md={2}>
            <Box>
              <Typography
                sx={{
                  color: "#fff",
                  fontFamily: "Open Sans",
                  fontWeight: "900",
                  letterSpacing: 3,
                  fontSize: 20,
                }}
              >
                SHOPPING
              </Typography>
            </Box>
            <Box pl={1.5}>
              {ShoppingLink.map((row, index) => {
                return (
                  <Box key={index}>
                    <Link
                      sx={{
                        fontFamily: "open sans",
                        fontWeight: "400",
                        color: "#fff",
                        fontSize: 15,
                      }}
                      href={row.link}
                      underline="none"
                    >
                      {row.title}
                    </Link>
                  </Box>
                );
              })}
            </Box>
          </Grid>
          {/* sec 3 */}
          <Grid item xs={10} sm={4} md={3}>
            <Box>
              <Typography
                sx={{
                  color: "#fff",
                  fontFamily: "Open Sans",
                  fontWeight: "900",
                  letterSpacing: 3,
                  fontSize: 20,
                }}
              >
                FOLLOW ON
              </Typography>
            </Box>
            <Box pl={1.5} sx={{ display: "flex", flexDirection: "row" }}>
              <IconButton href="">
                <InstagramIcon size="large" sx={{ color: "#FEC260" }} />
              </IconButton>
              <IconButton href="">
                <FacebookIcon size="large" sx={{ color: "#FEC260" }} />
              </IconButton>
              <IconButton href="">
                <YouTubeIcon size="large" sx={{ color: "#FEC260" }} />
              </IconButton>
              <IconButton href="">
                <TwitterIcon size="large" sx={{ color: "#FEC260" }} />
              </IconButton>
            </Box>
          </Grid>
          {/* sec 4 */}
          <Grid item xs={10} sm={4} md={2} sx={{ mt: { xs: 2, sm: 0 } }}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <img src={logo} style={{ width: 30 }} />
              <Box pl={2} />
              <img src={title} style={{ height: 35 }} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Footer;
