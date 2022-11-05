import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";

function Options() {
  const { token, role, userID } = useSelector((state) => state.loging);

  return (
    <Box
      p={1}
      sx={{ bgcolor: "#FFFFFF", borderRadius: "6px", textAlign: "center" }}
      pb={10}
      // height="67vh"
      component={Paper}
      elevation={2}
    >
      <Grid mb={3} mt={2} container justifyContent="center">
        <Avatar
          variant="rounded"
          alt="UserDP"
          sx={{ width: 56, height: 56, borderRadius: 3 }}
        />
      </Grid>
      <Grid item>
        <Box
          p={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ButtonMenu title="My profile" link={"/profile/details"} />
          <ButtonMenu title="Security" link={"/profile/security"} />
          {role === "buyer" && (
            <>
              <ButtonMenu title="Address Book" link={"/profile/addressbook"} />
              <ButtonMenu title="Your Orders" link={"/profile/order"} />
              <ButtonMenu title="Payments Options" link={"/profile/payment"} />
              <ButtonMenu title="Points" link={"/profile/loyalty"} />
              <ButtonMenu title="Transactions" link={"/profile/transaction"} />
              <ButtonMenu title="Sell on Araz" link={"/stores/new"} />
            </>
          )}
          {role === "admin" && (
            <>
              <ButtonMenu title="Category" link={"/category"} />
              <ButtonMenu title="Stores" link={"/stores"} />
              <ButtonMenu title="Users" link={"/users"} />
            </>
          )}
          {role === "seller" && (
            <>
              <ButtonMenu
                title="Manage Orders"
                link={"/profile/order-manage"}
              />
              <ButtonMenu title="Manage Store" link={"/stores"} />
            </>
          )}
        </Box>
      </Grid>
    </Box>
  );
}

const ButtonMenu = (props) => {
  const navigator = useNavigate();
  return (
    <>
      <Button
        fullWidth
        variant="contained"
        size="large"
        disableElevation
        sx={{
          textTransform: "none",
          fontFamily: "Arial",
          fontWeight: "bold",
          fontSize: "15px",
          bgcolor: "#D8D8D8",
          borderRadius: 3,
        }}
        onClick={() => {
          navigator(props.link);
        }}
        style={{ backgroundColor: "#D8D8D8" }}
      >
        <Typography
          sx={{
            fontWeight: "900",
            fontFamily: "Arial",
            textTransform: "none",
            color: "#1A374D",
          }}
        >
          {props.title}
        </Typography>
      </Button>
      <br />
    </>
  );
};

export default Options;
