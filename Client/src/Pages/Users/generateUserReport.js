import jsPDF from "jspdf";
import "jspdf-autotable";

const generateUserReport = (users) => {
  const doc = new jsPDF();

  // colums
  const tableColumn = ["No", "UserID", "Name", "Email", "UserRole"];
  // array
  const tableRows = [];
  let x = 1;

  users.forEach((user) => {
    const userData = [x++, user.id, user.name, user.email, user.userType];
    // push data
    tableRows.push(userData);
  });

  doc.autoTable(tableColumn, tableRows, { startY: 30, theme: "grid" });
  const date = Date().split(" ");

  const dateStr = date[3] + "-" + date[1] + "-" + date[2];

  doc.setFontSize(20);
  doc.text("All Araz User List", 80, 15);
  doc.setFontSize(10);
  doc.text("\n\n TOTAL USERS : " + users.length, 13, 15);

  doc.save(`ArazReport_${dateStr}.pdf`);
};

export default generateUserReport;
