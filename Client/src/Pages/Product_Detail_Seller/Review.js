import { Box, Button, TextField, Typography } from "@mui/material";

//icon
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import EditIcon from "@mui/icons-material/Edit";
// component
import Input from "../../Components/Input";

import formatDate from "../../Helper/formatDate";
import { useState } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";

function Review(props) {
  const review = props.data;

  //state
  const [reply, setReply] = useState("");

  //url
  const baseURL = "http://localhost:5000/";

  //reply handler
  const replyHandler = () => {
    //validate
    if (!reply.trim()) {
      return;
    }

    const data = { ...review, sellerReply: reply };
    axios
      .post(`${baseURL}products/${props.id}/reviews/reply`, data)
      .then((res) => {
        toast("Reply added", { type: "info" });
      })
      .catch((er) => {
        toast("Unable to add reply", { type: "error" });
      });
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Box>
          <Typography
            sx={{
              color: "#1597BB",
              fontFamily: "open sans",
              fontSize: 15,
              fontWeight: "700",
            }}
          >
            {review.userName}
          </Typography>
          <Typography
            sx={{
              color: "#aaa",
              fontFamily: "open sans",
              fontSize: 12,
              fontWeight: "700",
            }}
          >
            {formatDate(review.date)}
          </Typography>
        </Box>
        <Box ml={2}>
          {[1, 2, 3, 4, 5].map((row, index) => {
            if (review.star >= row) {
              return (
                <StarIcon
                  key={index}
                  sx={{ color: "#FEC260", height: 16, width: 16 }}
                />
              );
            } else {
              return (
                <StarBorderIcon
                  key={index}
                  sx={{ color: "#333", height: 16, width: 16 }}
                />
              );
            }
          })}
        </Box>
      </Box>
      <Box>
        <Typography
          sx={{ fontWeight: "600", fontFamily: "open sans", fontSize: 13 }}
        >
          {review.review}
        </Typography>
      </Box>
      {/* reply sec */}
      {review.sellerReply === null ? (
        props.storeID === props.product && (
          <Box my={1} mb={2} pl={{ xs: 0, sm: 8 }}>
            <Input maxRows={4} minRows={3} value={reply} set={setReply} />
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                onClick={replyHandler}
                sx={{
                  width: { xs: "100%", sm: 10 },
                  my: 1,
                }}
                variant="contained"
                disableElevation
                color="info"
              >
                Reply
              </Button>
            </Box>
          </Box>
        )
      ) : (
        // seller reply
        <Box my={1} mb={2} pl={{ xs: 0, sm: 8 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                bgcolor: "#D8D8D8",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                py: 0.2,
                px: 0.6,
                borderRadius: 0.6,
              }}
            >
              <Typography
                sx={{
                  color: "#333",
                  fontFamily: "open sans",
                  fontSize: 13,
                  fontWeight: "700",
                }}
              >
                Seller
              </Typography>
              <EditIcon sx={{ color: "#333", width: 15, heigh: 15, ml: 1 }} />
            </Box>
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: "600", fontFamily: "open sans", fontSize: 13 }}
            >
              {review.sellerReply}
            </Typography>
          </Box>
        </Box>
      )}
      <hr
        style={{
          borderTop: "2px dashed #1597BB",
          bgcolor: "none",
        }}
      />
    </>
  );
}

export default Review;
