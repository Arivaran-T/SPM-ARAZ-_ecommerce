import { Paper, MenuItem, Button, Select, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import Label from "../../Components/Label";
import Input from "../../Components/Input";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { Container } from "@mui/system";
import { useParams } from "react-router";
import axios from "axios";

function NewCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState(false);

  //Check that is it update or create
  if (id !== "createC") {
    useEffect(() => {
      axios
        .get("http://localhost:5000/category/" + id)
        .then((res) => {
          if (res) {
            setname(res.data.category.name);
            setDetails(res.data.category.details);
          }
        })
        .catch(() => {});
    }, []);
  }

  const submitHandler = () => {
    if (!name.trim()) {
      toast("Invalid Name", { type: "error" });
      return setError(true);
    }
    if (!details.trim()) {
      toast("Invalid details ", { type: "error" });
      return setError(true);
    }

    const data = {
      name: name,
      details: details,
    };

    if (id == "createC") {
      axios
        .post(`http://localhost:5000/category`, data)
        .then((res) => {
          setTimeout(() => {
            toast("Category created", { type: "success" });
          }, 1000);

          setTimeout(() => {
            navigate("/category");
          }, 1500);
        })

        .catch(() => {
          toast("Error in creating Category", { type: "error" });
        });
    } else {
      axios
        .put(`http://localhost:5000/category/` + id, data)
        .then((res) => {
          setTimeout(() => {
            toast("Category updated", { type: "success" });
          }, 1000);

          setTimeout(() => {
            navigate("/category");
          }, 1500);
        })

        .catch(() => {
          toast("Error in updating Category", { type: "error" });
        });
    }
  };

  return (
    <>
      <Box>
        <ToastContainer />
        <Container maxWidth="md">
          <Box component={Paper} sx={{ bgcolor: "#fff" }} p={3} my={2.5}>
            <Typography
              sx={{
                textAlign: "center",
                fontFamily: "open sans",
                fontWeight: "1000",
                color: "#2B4865",
                letterSpacing: -0.9,
                fontSize: 20,
                my: 1.5,
              }}
            >
              Add New Category
            </Typography>
            <Box p={1} mt={2} sx={{ display: "flex", flexDirection: "column" }}>
              {" "}
              <Label for="name" title="Category Name" />
              <Input
                type="text"
                id="name"
                size="small"
                autoFocus={true}
                value={name}
                set={setname}
              />
              {/* address */}
              <Label for="details" title="Category Details" />
              <Input
                id="details"
                multiple={true}
                minRows={3}
                maxRows={4}
                type="text"
                size="small"
                value={details}
                set={setDetails}
              />
              <br />
              <Button
                variant="contained"
                size="small"
                onClick={submitHandler}
                sx={{
                  fontFamily: "open sans",
                  fontWeight: "700",
                  textTransform: "none",
                  letterSpacing: 1.5,
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default NewCategory;
