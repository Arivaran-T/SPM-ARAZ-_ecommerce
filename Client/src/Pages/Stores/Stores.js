import {
  Autocomplete,
  Box,
  Grid,
  Typography,
  IconButton,
  TextField,
  Pagination,
} from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";

import { useEffect, useState } from "react";

//icons
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import Store from "./Store";

import { ToastContainer, toast } from "react-toastify";

function Stores() {
  //state
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [options, setOptions] = useState([]);
  const [page, setPage] = useState(1);

  const [stores, setStores] = useState([]);
  const [title, setTitle] = useState("");

  //url
  const baseURL = "http://localhost:5000/";

  //get stores
  useEffect(() => {
    getAllStore();
    axios
      .get(`${baseURL}stores/count`)
      .then((res) => {
        setCount(res.data);
      })
      .catch((er) => {});
  }, [page]);

  const loading = open && options.length === 0;

  //get all store
  const getAllStore = () => {
    axios
      .get(`${baseURL}stores?page=${page}`)
      .then((res) => {
        setStores(res.data.storeList);
      })
      .catch((er) => {
        toast("unable to fetch data", { type: "error" });
      });
  };

  //search
  const search = (title) => {
    if (!title.trim()) {
      return getAllStore();
    }
    axios
      .get(`${baseURL}stores/search?title=${title.trim()}`)
      .then((res) => {
        setStores(res.data);
      })
      .catch((er) => {});
  };

  //pagination handler
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <ToastContainer />
      <Box>
        <Container maxWidth="lg">
          {/* title */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontFamily: "open sans",
                fontWeight: "1000",
                color: "#2B4865",
                letterSpacing: -0.9,
                fontSize: 20,
                my: 1.5,
              }}
            >
              Stores
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
          </Box>
          {/*  */}
          <Box
            sx={{
              bgcolor: "#406882",
              display: "flex",
              flexDirection: "row",
              borderRadius: 1,
            }}
            py={1}
            mb={2}
          >
            <Grid container justifyContent={"center"} alignItems="center">
              {/* search field */}
              <Grid item sm={7} xs={12}>
                <Box
                  sx={{ display: "flex", flexDirection: "row" }}
                  px={1}
                  py={0}
                  m={0}
                >
                  <TextField
                    value={title}
                    onChange={(event) => {
                      setTitle(event.target.value);
                      search(event.target.value);
                    }}
                    color="status"
                    // {...params}
                    fullWidth
                    placeholder="search..."
                    size="small"
                    InputProps={{
                      style: { color: "#fff" },
                    }}
                  />
                  <IconButton
                    onClick={search}
                    sx={{
                      bgcolor: "#FEC260",
                      borderRadius: 0.5,
                      ml: 0.3,
                      "&:hover": {
                        bgcolor: "#1597BB",
                      },
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </Box>
          {/* stores sec */}
          <Grid
            container
            justifyContent={"center"}
            alignItems="center"
            rowSpacing={3}
            columnSpacing={5}
            sx={{ my: 3 }}
          >
            {stores?.map((row, index) => {
              return <Store data={row} key={index} />;
            })}
            {stores?.length <= 0 && (
              <Typography sx={{ color: "#333", ml: 5 }}>No store</Typography>
            )}
          </Grid>
          <Box
            my={2.5}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Pagination
              shape="rounded"
              count={Math.ceil(count / 6)}
              color="primary"
              onChange={handleChange}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Stores;
