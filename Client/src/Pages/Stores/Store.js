import { CardMedia, Grid, Box, Typography, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

import Ack from "../../Components/Ack";

//image
import storeRoof from "../../Assets/roof.png";
import { toast, ToastContainer } from "react-toastify";

const Text = (props) => {
  return (
    <Typography
      sx={{
        fontFamily: "Open sans",
        fontWeight: "600",
        fontSize: 13,
        color: "#1597BB",
        letterSpacing: -0.5,
      }}
    >
      {props.value}
    </Typography>
  );
};

function Store(props) {
  //url
  const baseURL = "http://localhost:5000/";
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setCount(Math.floor(Math.random() * 10));
    axios
      .get(`${baseURL}products/stores/${props.data.id}?count=${true}`)
      .then((res) => {
        setCount(res.data.msg);
      })
      .catch((er) => {});
  }, []);
  console.log(props.data.id);

  //delete store
  const handleDelete = () => {
    axios
      .delete(`${baseURL}stores/${props.data.id}`)
      .then((res) => {
        toast("Store deleted", { type: "info" });
        setOpen(false);
      })
      .catch((er) => {
        toast("Unable to delete", { type: "error" });
        setOpen(false);
      });
  };

  //disapprove
  const disapprove = () => {
    axios
      .put(`${baseURL}stores/status/${props.data.id}/${!props.data?.approval}`)
      .then((res) => {
        toast("Status updated for " + props.data.storeName, {
          type: "info",
        });
      })
      .catch((er) => {
        toast("Unable to update", {
          type: "error",
        });
      });
  };

  return (
    <>
      <Ack
        open={open}
        handleClose={() => setOpen(false)}
        title={"Alert"}
        msg={"Do you want to delete ?"}
        handleYes={handleDelete}
      />
      <Grid item sm={6} md={4}>
        <Box sx={{ bgcolor: "#fff", borderRadius: "10px 10px 0 0 " }}>
          <CardMedia
            component="img"
            sx={{
              width: "100%",
              borderRadius: "10px 10px 0 0",
            }}
            image={storeRoof}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "left",
            }}
            p={1}
          >
            {/* title sec */}
            <Typography
              sx={{
                fontFamily: "Open sans",
                fontWeight: "900",
                fontSize: 17,
                color: "#1597BB",
                letterSpacing: -0.5,
              }}
            >
              {props.data.storeName}
            </Typography>
            {/* divider */}
            <hr
              style={{
                borderTop: "2px dashed #1597BB",
                bgcolor: "none",
                width: "100%",
              }}
            />
            {/* address sec */}
            {/* user name */}
            {/* <Text value="User Name" /> */}
            {/* province */}
            <Text value={props.data.address.province} />
            {/* District */}
            <Text value={props.data.address.district} />
            {/* town */}
            <Text value={props.data.address.address} />
            {/* mobile no */}
            <Text value={props.data.address.contactNumber} />
            {/* divider */}
            <hr
              style={{
                borderTop: "2px dashed #1597BB",
                bgcolor: "none",
                width: "100%",
              }}
            />
            {/* tottal product */}
            <Text value={`Total Products : ${count}`} />
            {/* divider */}
            <hr
              style={{
                borderTop: "2px dashed #1597BB",
                bgcolor: "none",
                width: "100%",
              }}
            />
            {/* button sec */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Button color="error" onClick={() => setOpen(true)}>
                Delete
              </Button>
              <Box sx={{ flexGrow: 1 }} />
              <Button onClick={disapprove}>
                {props.data?.approval ? "Disapprove" : "Approve"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  );
}

export default Store;
