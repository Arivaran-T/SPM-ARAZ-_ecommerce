import { BrowserRouter as Router } from "react-router-dom";
import Page from "./Pages/Page";

//mui
import { ThemeProvider, createTheme } from "@mui/material/styles";

//components
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  //theme data
  let theme1 = createTheme({
    typography: {
      mode: "light",
      primary: {
        main: "#073050",
      },
    },
    palette: {
      mode: "light",

      primary: {
        main: "#1A374D",
        button: "#2B4865",
      },
      status: {
        main: "#ddd",
      },
      background: {
        default: "#1A374D",
        paper: "#fff",
        button: "#2B4865",
      },
      divider: "#2B4865",
      secondary: {
        main: "#406882",
      },
      text: {
        primary: "#2B4865",
        secondary: "#fff",
      },
      success: {
        main: "#FEC260",
      },
      info: {
        main: "#1597BB",
      },
      error: {
        main: "#FF0000",
      },
    },
  });

  return (
    <ThemeProvider theme={theme1}>
      <Router>
        <Header />
        <Page />
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
