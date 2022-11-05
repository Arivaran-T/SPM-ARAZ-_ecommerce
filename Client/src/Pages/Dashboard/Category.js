import { Box, Typography } from "@mui/material";

function Category(props) {
  return (
    <>
      <Box
        onClick={() => {
          props.onSelect(props.id);
        }}
        sx={{
          bgcolor: props.id === props.clicked ? "#406882" : "#FEC260",
          cursor: "pointer",
          height: { xs: 45, md: 55 },
          minWidth: { xs: 45, md: 55 },
          // overflow: "hidden",
          textOverflow: "ellipsis",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        p={{ xs: 0.5, md: 2 }}
        m={{ xs: 0.5, md: 1 }}
      >
        <Typography
          sx={{
            fontFamily: "open sans",
            fontSize: { xs: 10, md: 13 },
            fontWeight: 500,
            textAlign: "center",
            color: props.id === props.clicked ? "#fff" : "#333",
            cursor:"pointer"
          }}
        >
          {props?.data?.name}
        </Typography>
      </Box>
    </>
  );
}

export default Category;
