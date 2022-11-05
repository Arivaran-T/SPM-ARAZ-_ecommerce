import { MenuItem, Button, Select, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import Label from "../../../Components/Label";
import Input from "../../../Components/Input";
import { DATA } from "../../../Store/Province";
import { useSelector, useDispatch } from "react-redux";
import { addAddress } from "../../../Store/OrderStore";
import { ToastContainer, toast } from "react-toastify";

function ShippingAddress_Form(props) {
  // const { token, role, userID } = useSelector((state) => state.loging);

  const dispatch = useDispatch();
  // const { addAddress } = useSelector((state) => state.order);
  const [Name, setName] = useState();
  const [Contactnumber, setContactnumber] = useState();
  const [Addresses, setAddresses] = useState();
  const [Pro, setPro] = useState();
  const [dis, setdis] = useState([]);

  const [nameError, setNameError] = useState(false);
  const [ContactnumberError, setContactnumberError] = useState(false);
  const [AddressesError, setAddressesError] = useState(false);

  const [district, setDistricts] = useState([]);
  const onsubmitSave = () => {
    setNameError(false);
    setContactnumberError(false);
    setAddressesError(false);

    // setdisError(false);
    if (!Name.trim()) {
      toast("Fill all field", { type: "error" });
      return setNameError(true);
    }
    if (!Contactnumber.trim()) {
      toast("Invalid Contactnumber ", { type: "error" });
      return setContactnumberError(true);
    }
    if (!(Contactnumber.length == 10)) {
      toast("Contactnumber should be 10 digit ", { type: "error" });
      return setContactnumberError(true);
    }
    if (!Addresses.trim()) {
      toast("Invalid Address", { type: "error" });
      return setAddressesError(true);
    }

    const data = {
      name: Name,
      province: Pro,
      district: dis,
      address: Addresses,
      contactNumber: Contactnumber,
    };

    console.log(data);
    console.log(addAddress);
    // dispatch(romoveAddress());
    console.log(addAddress);
    dispatch(addAddress({ address: data }));

    console.log(addAddress);

    props.next();
  };
  // const [districts, setDistricts] = useState([]);
  return (
    <>
      <ToastContainer />
      <Box sx={{ width: "100%" }}>
        <Box p={1} mt={2} sx={{ display: "flex", flexDirection: "column" }}>
          {" "}
          <Label for="full_name" title="Full Name" />
          <Input
            onFocus={() => {
              setNameError(false);
            }}
            error={nameError}
            type="text"
            id="Full_Name"
            size="small"
            autoFocus={true}
            value={Name}
            set={setName}
          />
          <Label for="contact_number" title="Contact Number" />
          <Input
            onFocus={() => {
              setContactnumberError(false);
            }}
            error={ContactnumberError}
            type="text"
            id="contact_number"
            size="small"
            autoFocus={true}
            value={Contactnumber}
            set={setContactnumber}
          />
          {/* province */}
          <Label for="province" title="Province" />
          <Select
            sx={{ mb: 1, color: "#1597BB", fontWeight: "500" }}
            onChange={(event) => {
              // setdisError(false);
              setPro(() => {
                let data = DATA.filter((item, index) => {
                  return item.province === event.target.value;
                });
                return data[0].province;
              });
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
            // error={disError}
            sx={{ mb: 1, color: "#1597BB", fontWeight: "500" }}
            fullWidth
            required
            size="small"
            color="info"
            id="district"
            onChange={(event) => {
              // setdisError(false);
              setdis(() => {
                let data = district.filter((item, index) => {
                  if (item === event.target.value) {
                    return item;
                  }
                });

                return data[0];
              });
            }}
          >
            {district.map((row, index) => {
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
            onFocus={() => {
              setAddressesError(false);
            }}
            error={AddressesError}
            id="address"
            multiple={true}
            minRows={3}
            maxRows={4}
            type="text"
            size="small"
            value={Addresses}
            set={setAddresses}
          />
          <br />
          {/* <Button
            variant="contained"
            size="small"
            onClick={() => {}}
            sx={{
              fontFamily: "open sans",
              fontWeight: "700",
              textTransform: "none",
              letterSpacing: 1.5,
            }}
          >
            ADD
          </Button> */}
          <Box ml={1} pl={1}>
            {" "}
            <Button
              variant="contained"
              sx={{
                fontWeight: "700",
                fontFamily: "open sans",
                textTransform: "none",
              }}
              onClick={onsubmitSave}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ShippingAddress_Form;
