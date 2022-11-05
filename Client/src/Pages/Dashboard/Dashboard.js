import {
  Box,
  IconButton,
  Grid,
  TextField,
  Pagination,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import Category from "./Category";

//icon
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "@mui/icons-material/Search";

//react
import { useEffect, useRef, useState } from "react";
import Product from "./Product";
import axios from "axios";

function Dashboard() {
  //state
  const [products, setproducts] = useState([]);
  const [count, setCount] = useState(0);
  const [category, setCategory] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [selectcategory, setSelectedCategory] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoaded, setLoded] = useState(false);

  //hook
  const some = useRef();

  //base url
  const baseURL = "http://localhost:5000/";

  //useEffect
  useEffect(() => {
    getAllProducts();
    getProductCount();
    getAllCategories();
  }, [page, selectcategory]);

  //get all product
  const getAllProducts = () => {
    setLoded(false);
    let url =
      category !== null
        ? `${baseURL}products/?page=${page}&category=${category}`
        : `${baseURL}products/?page=${page}`;
    axios
      .get(url)
      .then((res) => {
        setproducts(res.data.productList);
        setLoded(true);
      })
      .catch((er) => {
        setLoded(true);
      });
  };

  //get product count
  const getProductCount = () => {
    setLoded(false);
    let url = category
      ? `${baseURL}products/count?category=${category}`
      : `${baseURL}products/count`;

    axios
      .get(url)
      .then((res) => {
        setCount(Math.ceil(res.data / 8));
        setLoded(true);
      })
      .catch((er) => {
        setLoded(true);
      });
  };

  //get all categories
  const getAllCategories = () => {
    axios
      .get(`${baseURL}category`)
      .then((res) => {
        setCategoryList(res.data?.categoryList);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  //taken from net
  function sideScroll(direction, speed, distance, step) {
    let scrollAmount = 0;
    var slideTimer = setInterval(function () {
      if (direction == "left") {
        some.current.scrollLeft += step;
      } else {
        some.current.scrollLeft -= step;
      }
      scrollAmount += 1;
      if (scrollAmount >= distance) {
        window.clearInterval(slideTimer);
      }
    }, speed);
  }

  //pagination handler
  const handleChange = (event, value) => {
    setPage(value);
  };

  //search
  const search = (val) => {
    setLoded(false);
    if (!val.trim()) {
      getAllProducts();
    } else {
      axios
        .get(`${baseURL}products/?title=${val.trim()}`)
        .then((res) => {
          setproducts(res.data.productList);
          setLoded(true);
        })
        .catch((er) => {
          setLoded(true);
        });
    }
  };

  return (
    <>
      <Box>
        <Container maxWidth="lg">
          {/* category sec */}
          <Box
            p={0}
            mt={1}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              onClick={() => {
                sideScroll("right", 25, categoryList.length, 8);
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>

            <Box
              ref={some}
              p={0.4}
              sx={{
                display: "flex",
                flexDirection: "row",
                overflow: "hidden",
              }}
            >
              <Box id="some" sx={{ display: "flex", flexDirection: "row" }}>
                {categoryList.map((item, index) => {
                  return (
                    <Category
                      key={index}
                      id={index}
                      data={item}
                      clicked={selectcategory}
                      onSelect={(index) => {
                        setSelectedCategory((pre) => {
                          let val = pre === index ? null : index;

                          return val;
                        });
                        setCategory((pre) => {
                          let val = pre === categoryList[index]?.name ? null : categoryList[index]?.name;
                          return val;
                        });
                      }}
                    />
                  );
                })}
              </Box>
            </Box>
            <IconButton
              onClick={() => {
                sideScroll("left", 25, categoryList.length, 8);
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
          {/*search sec  */}
          <Box
            sx={{
              bgcolor: "#406882",
              display: "flex",
              flexDirection: "row",
              borderRadius: 1,
            }}
            py={1}
            my={1}
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
                    onChange={(val) => {
                      search(val.target.value);
                    }}
                    color="status"
                    placeholder="search..."
                    size="small"
                    fullWidth
                    InputProps={{
                      style: {
                        color: "#fff",
                        letterSpacing: 0.5,
                        fontWeight: "normal",
                        textTransform: "capitalize",
                      },
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
            </Grid>
          </Box>

          {/* products sec */}
          <Grid
            container
            columnSpacing={2}
            rowSpacing={2}
            justifyContent="space-evenly"
            alignItems={"center"}
            sx={{ my: 2 }}
          >
            {products?.map((row, index) => {
              return <Product data={row} key={index} />;
            })}
          </Grid>
          {isLoaded && products.length <= 0 && (
            <Box sx={{ flex: 1, justifyContent: "center" }}>
              <Typography sx={{ textAlign: "center", color: "#555" }}>
                No products
              </Typography>
            </Box>
          )}
          {!isLoaded && (
            <Box sx={{ flex: 1, justifyContent: "center" }}>
              <Typography sx={{ textAlign: "center", color: "#555" }}>
                Loading ..
              </Typography>
            </Box>
          )}
          {/* pagination sec */}
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

export default Dashboard;
