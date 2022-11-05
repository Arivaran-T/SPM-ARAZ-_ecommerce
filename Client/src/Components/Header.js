import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Tooltip,
  Badge,
  SwipeableDrawer,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Typography,
} from "@mui/material";
//logo
import logo from "../Assets/logo.png";
import title from "../Assets/title.png";

//icons
import StorefrontIcon from "@mui/icons-material/Storefront";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuIcon from "@mui/icons-material/Menu";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";

import { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Store/auth";

function Header() {
  //state
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { token, role, userID } = useSelector((state) => state.loging);
  // const [auth, setAuth] = useState(token);

  const Menu = (
    <>
      {role === "seller" && (
        <ListItemButton
          onClick={() => {
            navigate("/store");
            setMenuOpen(false);
          }}
        >
          <ListItemIcon>
            <StorefrontIcon sx={{ color: "#1597BB" }} />
          </ListItemIcon>
          <ListItemText primary="Your Store" />
        </ListItemButton>
      )}
      {role === "buyer" && (
        <>
          <ListItemButton
            onClick={() => {
              setMenuOpen(false);
              navigate("/cart");
            }}
          >
            <ListItemIcon>
              <ShoppingCartIcon sx={{ color: "#1597BB" }} />
            </ListItemIcon>
            <ListItemText primary="Your cart" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              setMenuOpen(false);
              navigate("/Favorites");
            }}
          >
            <ListItemIcon>
              <FavoriteIcon sx={{ color: "#1597BB" }} />
            </ListItemIcon>
            <ListItemText primary="Your Wishlist" />
          </ListItemButton>
        </>
      )}
      {userID && (
        <>
          <ListItemButton
            onClick={() => {
              navigate("/profile/details");
              setMenuOpen(false);
            }}
          >
            <ListItemIcon>
              <PersonIcon sx={{ color: "#1597BB" }} />
            </ListItemIcon>
            <ListItemText primary="Your Account" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              setMenuOpen(false);
              dispatch(logout());
              navigate("/login", { replace: true });
            }}
          >
            <ListItemIcon>
              <LogoutIcon sx={{ color: "#1597BB" }} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </>
      )}
      {!userID && (
        <>
          <ListItemButton
            onClick={() => {
              setMenuOpen(false);
              navigate("/login");
            }}
          >
            <ListItemIcon>
              <LoginIcon sx={{ color: "#1597BB" }} />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              setMenuOpen(false);
              navigate("/signup");
            }}
          >
            <ListItemIcon>
              <HowToRegIcon sx={{ color: "#1597BB" }} />
            </ListItemIcon>
            <ListItemText primary="Register" />
          </ListItemButton>
        </>
      )}
    </>
  );
  return (
    <>
      <AppBar elevation={0} position="sticky">
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
              justifyContent: "end",
            }}
          >
            <Button disableRipple href="/">
              <img src={logo} style={{ width: 30 }} />
              <Box pl={2} />
              <img src={title} style={{ height: 35 }} />
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {role === "seller" && (
              <>
                <Tooltip title="Your Store">
                  <IconButton
                    href="/store"
                    sx={{
                      bgcolor: "#1597BB",
                      "&:hover": { bgcolor: "#FEC260" },
                      mr: 2,
                    }}
                  >
                    <StorefrontIcon sx={{ color: "#fff" }} />
                  </IconButton>
                </Tooltip>
              </>
            )}
            {role === "buyer" && (
              <>
                <Tooltip title="Your Cart">
                  <IconButton
                    onClick={() => {
                      navigate("/cart");
                    }}
                    sx={{
                      bgcolor: "#1597BB",
                      "&:hover": { bgcolor: "#FEC260" },
                      mr: 2,
                    }}
                  >
                    <Badge showZero color="error" badgeContent={1}>
                      <ShoppingCartIcon sx={{ color: "#fff" }} />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Your Wishlist">
                  <IconButton
                    sx={{
                      bgcolor: "#1597BB",
                      "&:hover": { bgcolor: "#FEC260" },
                      mr: 2,
                    }}
                  >
                    <Badge showZero color="error" badgeContent={0}>
                      <FavoriteIcon
                        sx={{ color: "#fff" }}
                        onClick={() => {
                          navigate("/Favorites");
                        }}
                      />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </>
            )}

            {userID && (
              <Tooltip title="Your Account">
                <IconButton
                  onClick={() => {
                    navigate("/profile/details");
                  }}
                  sx={{
                    bgcolor: "#1597BB",
                    "&:hover": { bgcolor: "#FEC260" },
                    mr: 2,
                  }}
                >
                  <PersonIcon sx={{ color: "#fff" }} />
                </IconButton>
              </Tooltip>
            )}
            {userID && (
              <Tooltip title="Logout">
                <IconButton
                  sx={{
                    bgcolor: "#1597BB",
                    "&:hover": { bgcolor: "#FEC260" },
                    mr: 2,
                  }}
                  onClick={() => {
                    // setAuth(null);
                    dispatch(logout());
                    window.location.reload();
                    navigate("/login", { replace: true });
                  }}
                >
                  <LogoutIcon sx={{ color: "#fff" }} />
                </IconButton>
              </Tooltip>
            )}
            {!userID && (
              <>
                <Tooltip title="Login">
                  <Button onClick={() => navigate("/login", { replace: true })}>
                    <Typography sx={{ color: "#ffff" }}>Login</Typography>
                  </Button>
                </Tooltip>
                <Tooltip title="Register">
                  <Button
                    onClick={() => navigate("/signup", { replace: true })}
                  >
                    <Typography sx={{ color: "#ffff" }}>Register</Typography>
                  </Button>
                </Tooltip>
              </>
            )}
          </Box>

          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconButton
              onClick={() => {
                setMenuOpen(true);
              }}
            >
              <MenuIcon sx={{ color: "#fff" }} />
            </IconButton>
            <SwipeableDrawer
              anchor={"top"}
              open={menuOpen}
              onClose={() => {
                setMenuOpen(false);
              }}
              onOpen={() => {
                setMenuOpen(true);
              }}
            >
              {Menu}
            </SwipeableDrawer>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
