import jsPDF from "jspdf";
import "jspdf-autotable";

const GeneratePDF = (data, id) => {
  const product = data.products;
  const doc = new jsPDF();
  const tableColumn = [
    "Products",
    "Qty",
    "OrderStatus",
    "TotalPayment",
    "District",
    "Province",
    "Address",
    "Date",
    "Time",
  ];
  const tableRows = [];
  const tableRows1 = [];
  const tableRows2 = [];
  const tableRows3 = [];

  product.forEach((row) => {
    const insightData1 = [row.productID];
    tableRows1.push(insightData1);
    const insightData2 = [row.count];
    tableRows2.push(insightData2);
    const insightData3 = [row.orderStatus];
    tableRows3.push(insightData3);
  });

  const insightData = [
    tableRows1,
    tableRows2,
    tableRows3,
    data.total,
    data.address.district,
    data.address.province,
    data.address.address,
    data.date,
    data.time,
  ];
  tableRows.push(insightData);

  doc.autoTable(tableColumn, tableRows, { startY: 20 });

  doc.text("User Order Report", 14, 15);
  doc.save(`insight_${id}.pdf`);
};

export default GeneratePDF;
