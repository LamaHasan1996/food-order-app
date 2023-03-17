import { CssBaseline, Paper } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";
import { Suspense, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Footer, Header } from "./components";
import Routing from "./Routing";
import { basicTheme } from "./styles/theme";
import { makeTheme } from "./utils/globalFunctions";

function App() {
  const materialLightTheme = makeTheme(createTheme(basicTheme),localStorage.getItem("theme") === "dark"?"dark":"light");
  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");
  const [customTheme, setCustomTheme] = useState(
    localStorage.getItem("currentTheme")
      ? createTheme(JSON.parse(localStorage.getItem("currentTheme")))
      : materialLightTheme
  );

  useEffect(() => {
    const handleChangeTheme = () => {
      let newTheme = localStorage.getItem("theme");
      if (!newTheme || newTheme === "light"){
        setCustomTheme(makeTheme(materialLightTheme,"dark"));
        setDark(true);}
      else{
        setCustomTheme(makeTheme(materialLightTheme,"light"));
        setDark(false);}
    };

    window.addEventListener("theme", handleChangeTheme);
    return () => {
      window.removeEventListener("theme", handleChangeTheme);
    };
  }, []);

  useEffect(() => {
    const handleChangeCurrentTheme = () => {
      let newTheme = JSON.parse(localStorage.getItem("currentTheme"));
      if (newTheme) setCustomTheme(createTheme(newTheme));
    };
    window.addEventListener("changeCurrentTheme", handleChangeCurrentTheme);
    return () => {
      window.removeEventListener(
        "changeCurrentTheme",
        handleChangeCurrentTheme
      );
    };
  }, []);

  return (
    <ThemeProvider
      theme={customTheme}
    >
      <CssBaseline />
      <Paper
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          boxShadow: "none",
          backgroundColor: dark ? "#0a1929" : "#fff",
        }}
      >
        <Suspense fallback={<h5>Loading...</h5>}>
          <Header />
          <BrowserRouter>
            <Routing />
          </BrowserRouter>
          <Footer />
        </Suspense>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
