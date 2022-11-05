import { Typography, Button } from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router";
import TableCell from "@mui/material/TableCell";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Category(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const navigator = useNavigate();
  const OnClickDeleteHandler = () => {
    axios
      .delete(`http://localhost:5000/category/` + props.data.id)
      .then((res) => {
        if (res) {
          setTimeout(() => {
            toast("Succesfully delete category", { type: "success" });
          }, 1500);

          window.location.reload();
        }
      })
      .catch(() => {
        toast("Unable to delete", { type: "success" });
      });
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {" Are you going to delete ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={OnClickDeleteHandler} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <TableCell component="th" scope="row">
        <ToastContainer />
        <Typography
          variant="body"
          sx={{ color: "#2B4865", fontSize: 15, fontFamily: "open sans" }}
        >
          {props.data.name}
        </Typography>
      </TableCell>

      <TableCell
        align="justify"
        sx={{ color: "#2B4865", fontSize: 15, fontFamily: "open sans" }}
      >
        {props.data.details}
      </TableCell>
      <TableCell
        align="justify"
        sx={{ color: "#2B4865", fontSize: 15, fontFamily: "open sans" }}
      >
        {props.data.createdDate}
      </TableCell>

      <TableCell align="justify">
        {" "}
        <Button
          variant="contained"
          size="small"
          sx={{
            fontFamily: "open sans",
            fontWeight: "700",
            textTransform: "none",
          }}
          onClick={() => {
            navigator("/newCategory/" + props.data.id);
          }}
        >
          Edit
        </Button>
      </TableCell>
      <TableCell align="justify">
        {" "}
        <Button
          variant="contained"
          size="small"
          sx={{
            fontFamily: "open sans",
            fontWeight: "700",
            textTransform: "none",
          }}
          onClick={() => {
            // OnClickDeleteHandler();
            handleClickOpen();
          }}
        >
          Delete
        </Button>
      </TableCell>
    </>
  );
}

export default Category;
