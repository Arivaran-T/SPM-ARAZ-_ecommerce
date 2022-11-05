import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import ButtonA from "../../Components/ButtonA";
import Input from "../../Components/Input";
import Label from "../../Components/Label";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

//province data
import { DATA } from "../../Store/Province";

//icon
import DeleteIcon from "@mui/icons-material/Delete";
import { setRole } from "../../Store/auth";
import { useNavigate } from "react-router";
import { useEffect } from "react";

function RegisterStore() {
  const dispatch = useDispatch();

  const { token, role, userID } = useSelector((state) => state.loging);
  //state
  const [districts, setDistricts] = useState([]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [bank, setBank] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [storeID, setStoreID] = useState("");

  //url
  const baseURL = "http://localhost:5000/";

  const navigate = useNavigate();

  useEffect(() => {
    if (role === "seller") {
      getStoreDate();
    }
  }, []);

  //get store data
  const getStoreDate = () => {
    axios
      .get(`${baseURL}stores/user/${userID}`)
      .then((res) => {
        let store = res.data;
        setStoreID(store.id);
        setAccountNo(store.accountNumber);
        setAddress(store.address.address);
        setBank(store.bankName);
        setContact(store.contactNo);
        setDistrict(store.address.district);
        setName(store.storeName);
        setProvince(store.address.province);
        setDistricts(() => {
          let data = DATA.filter((item, index) => {
            return item.province === store.address.province;
          });
          return data[0].districts;
        });
      })
      .catch((er) => {});
  };

  //submit
  const submithandler = () => {
    if (!name.trim())
      return toast("All fields are required", { type: "error" });
    if (contact.length < 9 && contact.length > 10)
      return toast("Valid contact number required", { type: "error" });
    if (province === null)
      return toast("Valid province required", { type: "error" });
    if (district === null)
      return toast("Valid district required", { type: "error" });
    if (address === null)
      return toast("Valid address required", { type: "error" });
    if (bank === null)
      return toast("Valid bank name required", { type: "error" });
    if (accountNo === null || accountNo.length < 6)
      return toast("Valid account number required", { type: "error" });

    const data = {
      storeName: name,
      contactNo: contact,
      address: { province: province, district: district, address: address },
      bankName: bank,
      accountNumber: accountNo,
      userID: userID,
    };

    axios
      .post(`${baseURL}stores`, data)
      .then((res) => {
        toast("Store created", { type: "info" });
        setTimeout(() => {
          dispatch(setRole({ role: "seller" }));
          navigate("/");
        }, 1000);
      })
      .catch((er) => {
        toast("Unable to create store", { type: "error" });
      });
  };

  //delete store
  const deleteStore = () => {
    axios
      .delete(`${baseURL}stores/${storeID}`)
      .then((res) => {
        toast("Store deleted", { type: "info" });
        setTimeout(() => {
          dispatch(setRole({ role: "buyer" }));
          navigate("/");
        }, 1000);
      })
      .catch((er) => {
        toast("Unable to delete store", { type: "error" });
      });
  };

  return (
    <>
      <ToastContainer />
      <Box>
        <Container maxWidth="sm">
          {/* title */}
          <Typography
            sx={{
              fontFamily: "open sans",
              fontWeight: "1000",
              color: "#2B4865",
              letterSpacing: -0.9,
              fontSize: 18,
              my: 1.5,
            }}
          >
            {role === "seller" ? "Manage Store" : "Register Store"}
          </Typography>
          <Box component={Paper} sx={{ bgcolor: "#fff" }} p={3} my={2.5}>
            {/* store name */}
            <Label title="Store Name" for="store_name" />
            <Input
              value={name}
              set={setName}
              id="store_name"
              autoFocus={role === "buyer"}
              size="small"
              type="text"
            />
            {/* contact number */}
            <Label title="Contact Number" for="contact_number" />
            <Input
              value={contact}
              set={setContact}
              id="contact_number"
              size="small"
              placeholder="07xxxxxxxx"
              type="number"
            />
            {/* province */}
            <Label for="province" title="Province" />
            <Select
              value={province}
              sx={{ mb: 1, color: "#1597BB", fontWeight: "500" }}
              onChange={(event) => {
                setProvince(event.target.value);
                setDistricts(() => {
                  let data = DATA.filter((item, index) => {
                    return item.province === event.target.value;
                  });
                  return data[0].districts;
                });
              }}
              fullWidth
              required
              size="small"
              color="info"
              id="province"
            >
              {DATA.map((row, index) => {
                return (
                  <MenuItem
                    key={index}
                    sx={{
                      fontFamily: "open sans",
                      fontSize: 15,
                      color: "#333",
                    }}
                    value={row.province}
                  >
                    {row.province}
                  </MenuItem>
                );
              })}
            </Select>
            {/* district */}
            <Label for="district" title="District" />
            <Select
              value={district}
              sx={{ mb: 1, color: "#1597BB", fontWeight: "500" }}
              fullWidth
              required
              size="small"
              color="info"
              id="district"
              onChange={(event) => setDistrict(event.target.value)}
            >
              {districts.map((row, index) => {
                return (
                  <MenuItem
                    key={index}
                    sx={{
                      fontFamily: "open sans",
                      fontSize: 15,
                      color: "#333",
                    }}
                    value={row}
                  >
                    {row}
                  </MenuItem>
                );
              })}
            </Select>
            {/* address */}
            <Label for="address" title="Address" />
            <Input
              value={address}
              set={setAddress}
              id="address"
              multiple={true}
              minRows={3}
              maxRows={4}
              type="text"
              size="small"
            />
            {/* bank name */}
            <Label for="bank_name" title="Bank Name" />
            <Input
              value={bank}
              set={setBank}
              id="bank_name"
              type="text"
              size="small"
            />
            {/* account number */}
            <Label for="account_number" title="Account Number" />
            <Input
              value={accountNo}
              set={setAccountNo}
              id="account_number"
              type="number"
              size="small"
            />
            {/* save button */}
            <Box mt={2} />
            <ButtonA
              disabled={role === "seller"}
              fullWidth={true}
              title="SAVE"
              handler={submithandler}
            />
            <Box mt={2} />
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Box sx={{ flexGrow: 1 }} />
              {role === "seller" && (
                <Button
                  onClick={deleteStore}
                  variant="outlined"
                  sx={{
                    fontFamily: "open sans",
                    fontWeight: "700",
                    textTransform: "none",
                  }}
                  color="error"
                  endIcon={<DeleteIcon />}
                >
                  DELETE
                </Button>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default RegisterStore;
