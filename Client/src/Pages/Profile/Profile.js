import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import ButtonA from "../../Components/ButtonA";
import AddressBook from "../AddressBook/AddressBook";
import Options from "./Options";

function Profile() {
  return (
    <>
      <Container maxWidth="lg">
        <Box py={3}>
          <Box>
            <Grid
              container
              spacing={{ xs: 1, sm: 2 }}
              alignContent="center"
              justifyContent={"center"}
            >
              <Grid item xs={4} display={{ sm: "block", xs: "none" }}>
                <Options />
              </Grid>
              <Grid item xs={12} sm={8}>
                <AddressBook />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Profile;
