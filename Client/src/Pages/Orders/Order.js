import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Paper, TableFooter, Button } from "@mui/material";
import { Box } from "@mui/system";
import Order_Product from "./Order_Product";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DownloadIcon from "@mui/icons-material/Download";
import GeneratePDF from "./GeneratePDF";

function Order(props) {
  const Orderdata = props.data;


  // const Orderdata1 = [
  //   {
  //     product: "Product1",
  //     qty: 3,
  //     status: "Processing",
  //   },
  //   {
  //     product: "Product2",
  //     qty: 4,
  //     status: "Delivered",
  //   },
  //   {
  //     product: "Product3",
  //     qty: 1,
  //     status: "Shipped",
  //   },
  // ];
  return (
    <>
      <Accordion sx={{ bgcolor: "#D8D8D8" }}>
        <AccordionSummary
          sx={{}}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box>
            <Typography
              style={{
                fontFamily: "open sans",
                fontWeight: "800",
                fontSize: 15,
                color: "#1A374D",
              }}
            >
              Order:{Orderdata.id}
            </Typography>

            <Typography
              style={{
                fontFamily: "open sans",
                fontWeight: "900",
                fontSize: 12,
                color: "#8C8C8C",
              }}
            >
              {Orderdata.date} - {Orderdata.time}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: "200" }} aria-label="caption table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="left"
                    style={{
                      fontFamily: "open sans",
                      fontWeight: "800",
                      fontSize: 16,
                      color: "#1A374D",
                    }}
                  >
                    Product Name
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      fontFamily: "open sans",
                      fontWeight: "800",
                      fontSize: 16,
                      color: "#1A374D",
                    }}
                  >
                    Qyt
                  </TableCell>

                  <TableCell
                    style={{
                      fontFamily: "open sans",
                      fontWeight: "800",
                      fontSize: 16,
                      color: "#1A374D",
                    }}
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Orderdata?.products?.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <Order_Product data={row} />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
        <Box
          p={2}
          sx={{
            display: "flex",
            justifyContent: "right",
          }}
        >
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              GeneratePDF(Orderdata, Orderdata.id);
            }}
            sx={{
              textAlign: "center",
              fontFamily: "open sans",
              fontWeight: "700",
              textTransform: "none",
            }}
            endIcon={<DownloadIcon />}
          >
            Print in voice
          </Button>
        </Box>
      </Accordion>
      <br />
    </>
  );
}

export default Order;
