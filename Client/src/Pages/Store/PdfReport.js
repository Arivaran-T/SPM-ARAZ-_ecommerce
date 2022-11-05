import jsPDF from "jspdf";
import "jspdf-autotable";

import formateDate from "../../Helper/formatDate";

const generatePDF = (data) => {
  const doc = new jsPDF();
  const tableColumn = [
    "Product ID",
    "Product Name",
    "Sold Count",
    "Total Sold Amount",
  ];
  const tableRows = [];

  data.forEach((row) => {
    const data = [row?.productID, row?.productName, row?.count, row?.total];
    tableRows.push(data);
  });

  doc.autoTable(tableColumn, tableRows, { startY: 20 });

  let date = formateDate(new Date());

  doc.text(`Products sold Insight (${date})`, 14, 15);
  doc.save(`product_insight_${date}.pdf`);
};

export default generatePDF;
