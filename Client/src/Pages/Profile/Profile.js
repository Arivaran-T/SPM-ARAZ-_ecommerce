import {
  Container,
  Grid,
  Paper,
  IconButton,
  ListItemIcon,
} from "@mui/material";
import { Box } from "@mui/system";
import AddressBook from "../AddressBook/AddressBook";
import Options from "./Options";
import { useParams } from "react-router";
import EditAddresss from "../AddressBook/EditAddresss";
import Profile_Details from "./Components/Profile_Details";

import Orders from "../Orders/Orders";

//
import Loyalty from "../Loyalty/Loyalty";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
//
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Security from "./Components/Security";
import OrderManages from "../OrderManage_Admin/OrderManages";
import CategoryTable from "../Category/CategoryTable";
import NewCategory from "../Category/NewCategory";
import PaymentManage from "../Payment_Manage/PaymentManage";

function Profile() {
  const { page } = useParams();
  const navigate = useNavigate();
  //state
  const [state, setState] = useState(false);
  const Floating = () => {
    return (
      <div
        sx={{
          position: "fixed",
          right: "0px",
          top: "45%",
          bgcolor: "#073050",
          zIndex: "100",
        }}
      >
        <Grid item display={{ sm: "none", xs: "block", posision: "absolute" }}>
          <Box
            p={0.5}
            sx={{ bgcolor: "#DFDADA", borderRadius: "5px 0 0 5px" }}
            elevation={4}
          >
            <IconButton onClick={toggleDrawer(true)}>
              <MenuOpenIcon fontSize="small" color="secondary" />
            </IconButton>
          </Box>
        </Grid>
      </div>
    );
  };
  const uriChecker = (text) => {
    const uri = text === "Profile" ? "details" : text.toLowerCase();
    return uri;
  };
  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {[
          "Profile",
          "security",
          "addressbook",
          "order",
          "payment",
          "loyalty",
        ].map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={() => {
              navigate(`/profile/${uriChecker(text)}`);
            }}
          >
            <ListItemIcon>
              <RadioButtonCheckedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };
  return (
    <>
      <Drawer anchor={"left"} open={state} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>

      <Floating />
      <Container maxWidth="lg">
        <Box my={3} minHeight={400}>
          <Grid
            container
            spacing={{ xs: 1, sm: 2 }}
            alignItems="stretch"
            justifyContent={"center"}
          >
            <Grid item xs={3} display={{ sm: "block", xs: "none" }}>
              <Options />
            </Grid>
            <Grid item xs={12} sm={9}>
              <Box>
                {page === "addressbook" && <AddressBook />}
                {page === "editaddress" && <EditAddresss />}
                {page === "details" && <Profile_Details />}
                {page === "order" && <Orders />}
                {page === "order-manage" && <OrderManages />}
                {page === "loyalty" && <Loyalty />}
                {page === "security" && <Security />}
                {page === "payment" && <PaymentManage />}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default Profile;
