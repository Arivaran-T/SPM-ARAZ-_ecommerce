import { Box, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import ButtonA from "../../Components/ButtonA";

import Input from "../../Components/Input";
import Label from "../../Components/Label";

export default function Report() {
  return (
    <Box>
      <Container maxWidth="sm">
        <Typography
          sx={{
            my: 2,
            fontFamily: "open sans",
            fontWeight: "900",
            color: "#1597BB",
            letterSpacing: -0.6,
            fontSize: 20,
          }}
        >
          Make your Complaint
        </Typography>
        <Box
        mb={5}
          mt={2}
          elevation={1}
          sx={{ bgcolor: "#fff" }}
          p={2}
          component={Paper}
        >
          <Label title="E-mail address" />
          <Input autoFocus={true} size="small" />
          <Label title="Contact number" />
          <Input size="small" />
          <Label title="Complaint" />
          <Input size="small" multiline={true} minRows={4} maxRows={5} />
          <ButtonA fullWidth={true} title="Submit" />
        </Box>
      </Container>
    </Box>
  );
}
