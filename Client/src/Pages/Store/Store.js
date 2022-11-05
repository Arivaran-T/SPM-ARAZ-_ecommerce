import {
  Autocomplete,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

//icon
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";

import { useEffect, useState } from "react";
import Product from "./Product";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import generatePDF from "./PdfReport";

function Store() {
  const { token, role, userID } = useSelector((state) => state.loging);

  // delet
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [storeID, setStoreID] = useState("");
  const [isLoading, setLoading] = useState(false);

  //pagination handler
  const handleChange = (event, value) => {
    setPage(value);
  };

  const baseURL = "http://localhost:5000/";

  useEffect(() => {
    getProducts();

    axios
      .get(`${baseURL}products/store/${userID}/count`)
      .then((res) => {
        setCount(Math.ceil(res.data / 8));
      })
      .catch((er) => {});
  }, [page]);

  //get product
  const getProducts = () => {
    axios
      .get(`${baseURL}products/stores/${userID}?page=${page}`)
      .then((res) => {
        setProducts(res.data?.productList);
      })
      .catch((er) => {});
  };

  //search
  const search = (title) => {
    if (!title.trim()) {
      return getProducts();
    }
    axios
      .get(`${baseURL}products/store/${userID}/search/${title.trim()}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((er) => {});
  };

  //generate report
  const generateReport = () => {
    setLoading(true);

    axios
      .get(`${baseURL}stores/report/${userID}`)
      .then((res) => {
        generatePDF(res.data);
        setLoading(false);
      })
      .catch((er) => {
        setLoading(false);
      });
  };

  return (
    <>
      <Box>
        <Container maxWidth="lg">
          {/* title */}
          <Box
            py={1}
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
              Your Store
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <LoadingButton
              loading={isLoading}
              load
              onClick={generateReport}
              variant="contained"
              disableElevation
              color="secondary"
              endIcon={<DownloadIcon sx={{ color: "#fff" }} />}
              sx={{
                textTransform: "none",
                color: "#1597BB",
              }}
            >
              <Typography
                sx={{ color: "#fff", fontWeight: 500, fontFamily: "open sans" }}
              >
                Generate Report
              </Typography>
            </LoadingButton>
            <Button
              href="/products/new"
              sx={{
                textTransform: "none",
                color: "#1597BB",
                p: 0,
                display: { sm: "none", xs: "block" },
              }}
            >
              + Add Product
            </Button>
          </Box>
          {/* search bar */}
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
              <Grid
                item
                xs={0}
                sm={2}
                sx={{ display: { xs: "none", sm: "block" } }}
              ></Grid>
              {/* search field */}
              <Grid item sm={7} xs={12}>
                <Box
                  sx={{ display: "flex", flexDirection: "row" }}
                  px={1}
                  py={0}
                  m={0}
                >
                  <TextField
                    onChange={(event) => {
                      setTitle(event.target.value);
                      search(event.target.value);
                    }}
                    color="status"
                    fullWidth
                    placeholder="search..."
                    size="small"
                    InputProps={{
                      style: { color: "#fff" },
                    }}
                  />
                  <IconButton
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
              <Grid item xs={3} sx={{ display: { xs: "none", sm: "block" } }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Box sx={{ flexGrow: 1 }} />
                  <Button
                    href="/products/new"
                    sx={{
                      color: "#fff",
                      textTransform: "none",
                      color: "#D8D8D8",
                      mr: 2,
                    }}
                  >
                    + Add Product
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
          {/* end of search */}
          {/* products */}
          <Grid
            container
            justifyContent={"space-evenly"}
            alignItems="stretch"
            rowSpacing={2}
            columnSpacing={1}
            sx={{ my: 3 }}
          >
            {products?.map((row, index) => {
              return <Product data={row} key={index} />;
            })}
          </Grid>
          <Box
            my={3}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Pagination
              shape="rounded"
              count={count}
              color="primary"
              onChange={handleChange}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Store;
