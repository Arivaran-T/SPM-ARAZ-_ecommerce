import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
//component
import Label from "../../Components/Label";
import Input from "../../Components/Input";

//react
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//icons
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import ButtonA from "../../Components/ButtonA";
import Ack from "../../Components/Ack";

import { useSelector, useDispatch } from "react-redux";

function Product() {
  //product id
  const { id } = useParams();

  const { token, role, userID } = useSelector((state) => state.loging);

  //state
  const [isLoading, setIsloading] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  //data
  const [product, setProduct] = useState();
  const [imageArray, setImageArray] = useState([]);
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [storeID, setStoreID] = useState("");

  const [nameError, setNameError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [priceError, setPriceError] = useState(false);

  const baseURL = "http://localhost:5000/";

  useEffect(() => {
    if (id) {
      setIsloading(true);
      axios
        .get(`${baseURL}products/${id}`)
        .then((res) => {
          const product = res.data.product;
          setName(product.title);
          setPrice(product.price);
          setDescription(product.description);
          setCategory(product.category);
          setIsloading(false);
          setProduct(res.data.product);
        })
        .catch((er) => {
          setIsloading(false);
        });
    }
    getAllCategories();
    getStoreID();
  }, []);

  //get store id
  const getStoreID = () => {
    axios
      .get(`${baseURL}stores/user/${userID}`)
      .then((res) => {
        setStoreID(res.data.id);
      })
      .catch((er) => {});
  };

  //get all categories
  const getAllCategories = () => {
    axios
      .get(`${baseURL}category`)
      .then((res) => {
        let array = res.data?.categoryList?.map((item) => item.name);
        setCategories(array);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  //drag image handler
  const imageHandler = (file, index) => {
    setImages((pre) => {
      let array = [...pre];
      array[index] = file;
      return array;
    });
    setImageArray((pre) => {
      let array = [...pre];
      array[index] = URL.createObjectURL(file);
      return array;
    });
  };

  //add new product handler
  const submitHandler = () => {
    const product = new FormData();

    //
    setNameError(false);
    setCategoryError(false);
    setDescriptionError(false);
    setPriceError(false);

    if (!name.trim()) {
      toast("Invalid title", { type: "error" });
      return setNameError(true);
    }
    if (!category.trim()) {
      toast("Invalid category", { type: "error" });
      return setCategoryError(true);
    }
    if (!description.trim() || description.length < 50) {
      toast("Invalid description", { type: "error" });
      return setDescriptionError(true);
    }
    if (!price) {
      toast("Invalid price", { type: "error" });
      return setPriceError(true);
    }
    if (!id && images.length < 1) {
      return toast("Select atleast one image", { type: "error" });
    }

    images.forEach((element, index) => {
      product.append("images", images[index]);
    });
    product.append("storeID", storeID);
    product.append("title", name);
    product.append("description", description);
    product.append("price", price);
    product.append("category", category);

    setIsloading(true);

    if (id) {
      axios
        .put(`${baseURL}products/${id}`, product)
        .then((res) => {
          toast("Product updated successfully", { type: "info" });
          setIsloading(false);
          setTimeout(() => {
            navigate("/store");
          }, 2000);
        })
        .catch((er) => {
          console.log(er);
          setIsloading(false);
        });
    } else {
      axios
        .post(`${baseURL}products`, product)
        .then((res) => {
          toast("Product added successfully", { type: "info" });
          setIsloading(false);
          setTimeout(() => {
            navigate("/store");
          }, 2000);
        })
        .catch((er) => {
          console.log(er);
          setIsloading(false);
        });
    }
  };

  //handle delete
  const handleDelete = () => {
    axios
      .delete(`${baseURL}products/${id}`)
      .then((res) => {
        navigate("/store");
      })
      .catch((er) => {
        toast("Unable to delete", { type: "error" });
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
      <ToastContainer />
      {
        <Box id="1">
          <Container maxWidth="sm">
            <Box
              component={Paper}
              elevation={1}
              p={3}
              my={2.5}
              sx={{ bgcolor: "#fff" }}
            >
              <Typography
                sx={{
                  fontFamily: "open sans",
                  fontWeight: "900",
                  color: "#1597BB",
                  letterSpacing: -0.6,
                  fontSize: 20,
                }}
              >
                {id ? "Edit Product" : "Add New Product"}
              </Typography>
              <Box mt={2} sx={{ display: "flex", flexDirection: "column" }}>
                {/* product name */}
                <Label for="product_name" title="Product Name" />
                <Input
                  onFocus={() => {
                    setNameError(false);
                  }}
                  error={nameError}
                  type="text"
                  id="product_name"
                  size="small"
                  autoFocus={true}
                  value={name}
                  set={setName}
                />
                {/* product category */}
                <Label for="product_category" title="Product Category" />
                <Select
                  error={categoryError}
                  sx={{ mb: 1, color: "#1597BB" }}
                  fullWidth
                  required
                  size="small"
                  color="info"
                  id="product_category"
                  value={category}
                  onChange={(event) => {
                    setCategory(event.target.value);
                    setCategoryError(false);
                  }}
                  set={setCategory}
                >
                  {categories.map((row, index) => {
                    return (
                      <MenuItem
                        key={index}
                        sx={{
                          fontFamily: "open sans",
                          fontSize: 15,
                          color: "#333",
                          fontWeight: 600,
                        }}
                        value={row}
                      >
                        {row}
                      </MenuItem>
                    );
                  })}
                </Select>
                {/* product description */}
                <Label for="product_description" title="Product Description" />
                <Input
                  error={descriptionError}
                  onFocus={() => {
                    setDescriptionError(false);
                  }}
                  size="small"
                  id="product_description"
                  minRows={5}
                  maxRows={10}
                  value={description}
                  set={setDescription}
                />
                {/* product price */}
                <Label for="product_pice" title="Product Price (Rs)" />
                <Input
                  value={price}
                  set={setPrice}
                  size="small"
                  id="product_pice"
                  type="number"
                  error={priceError}
                  onFocus={() => {
                    setPriceError(false);
                  }}
                />
                {/* product images */}
                <Label for="product_image" title="Product Images" />
                <Grid
                  container
                  columnSpacing={0.5}
                  rowSpacing={0.5}
                  sx={{ mb: 2 }}
                  justifyContent="space-around"
                >
                  {[0, 1, 2, 3, 4, 5].map((row, index) => {
                    return (
                      <Grid item key={index}>
                        <Tooltip title="Select image">
                          <label htmlFor={`file_${index}`}>
                            <Box
                              p={0.5}
                              key={index}
                              sx={{
                                bgcolor: "#D8D8D8",
                                borderRadius: 1,
                                cursor: "pointer",
                              }}
                            >
                              {imageArray[index] || product?.images[index] ? (
                                <img
                                  style={{ width: 70, height: 70, margin: 1 }}
                                  src={
                                    imageArray[index] ||
                                    `${baseURL}products/images/${product?.images[index]}`
                                  }
                                />
                              ) : (
                                <AddToPhotosIcon
                                  sx={{
                                    color: "#406882",
                                    width: 72,
                                    height: 72,
                                  }}
                                />
                              )}
                            </Box>
                          </label>
                        </Tooltip>
                        <input
                          type={"file"}
                          hidden={true}
                          id={`file_${index}`}
                          accept="image/*"
                          onChange={(event) => {
                            imageHandler(event.target.files[0], index);
                          }}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
                {/* button */}
                <ButtonA
                  disabled={isLoading}
                  handler={submitHandler}
                  title={"SAVE"}
                />
                {/* bottom section */}
                {id && (
                  <Box mt={1} sx={{ display: "flex", flexDirection: "row" }}>
                    <Button
                      onClick={() => {
                        setOpen(true);
                      }}
                      sx={{ textTransform: "none" }}
                      color="error"
                    >
                      Delete
                    </Button>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button
                      sx={{ textTransform: "none" }}
                      href={`/products/${id}/offers`}
                      color="info"
                    >
                      Manage Offer
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
          </Container>
        </Box>
      }
    </>
  );
}

export default Product;
