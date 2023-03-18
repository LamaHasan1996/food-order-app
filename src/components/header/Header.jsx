import { Box, Button, Container, Link, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { BiSun } from "react-icons/bi";
import { FiMoon, FiSettings } from "react-icons/fi";
import useStyles from "../../styles/components/header/header";
import { changeThemeColor } from "../../utils/globalFunctions";
import { ColorDialog, LoginDialog, Spinner } from "../index";
import { BsCart3 } from "react-icons/bs";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [icon, setIcon] = useState(
    localStorage.getItem("theme") === "dark" ? "sun" : "moon"
  );
  const [logOut, setLogOut] = useState(
    sessionStorage.getItem("user") ? true : false
  );
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [buy, setBuy] = useState(
    JSON.parse(sessionStorage.getItem("purchases"))?.data?.length ? true : false
  );
  const [primaryColor, setPrimaryColor] = useState(
    localStorage.getItem("currentTheme")
      ? JSON.parse(localStorage.getItem("currentTheme"))?.elements?.colors
          ?.primary
      : "#ff9752"
  );
  const [secondaryColor, setSecondaryColor] = useState(
    localStorage.getItem("currentTheme")
      ? JSON.parse(localStorage.getItem("currentTheme"))?.elements?.colors
          ?.secondary
      : "#d7f4f4"
  );
  const newTheme = new Event("changeCurrentTheme");
  const headerClasses = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseLoginDialog = () => {
    setOpenLoginDialog(false);
  };

  const changePrimaryColor = (color) => {
    setPrimaryColor(color?.hex);
    changeThemeColor("primary", color);
    window.dispatchEvent(newTheme);
  };

  const changeSecondaryColor = (color) => {
    setSecondaryColor(color?.hex);
    changeThemeColor("secondary", color);
    window.dispatchEvent(newTheme);
  };

  useEffect(() => {
    const handleLogin = () => {
      let user = sessionStorage.getItem("user");
      if (user) setLogOut(true);
    };
    window.addEventListener("login", handleLogin);
    return () => {
      window.removeEventListener("login", handleLogin);
    };
  }, []);

  useEffect(() => {
    const handleBuy = () => {
      setBuy(true);
    };
    const handleRemove = () => {
      let purchases = JSON.parse(sessionStorage?.getItem("purchases"));
      if (!purchases || purchases?.data?.length === 0) setBuy(false);
    };
    window.addEventListener("buy", handleBuy);
    window.addEventListener("remove", handleRemove);

    return () => {
      window.removeEventListener("buy", handleBuy);
      window.removeEventListener("remove", handleRemove);
    };
  }, []);

  return (
    <Box className={headerClasses.root}>
      <Container maxWidth="lg">
        <Link href="/home">
          <Typography className={headerClasses.brand}>Meal Mate</Typography>
        </Link>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography>Share us Your Food Journey!</Typography>
          <Button
            className={headerClasses.btn}
            onClick={(e) => {
              if (logOut) {
                setSpinner(true);
                setTimeout(() => {
                  sessionStorage?.removeItem("user");
                  sessionStorage?.removeItem("purchases");
                  let newEvent = new Event("login");
                  window.dispatchEvent(newEvent);
                  setLogOut(false);
                  setSpinner(false);
                }, 3000);
              } else {
                setOpenLoginDialog(true);
              }
            }}
          >
            {logOut ? "Log Out" : "Log in"}
            {spinner ? <Spinner white={true} /> : null}
          </Button>
          {logOut ? (
            <Button
              href={"/cart"}
              className={buy ? headerClasses.redFlag : null}
            >
              <BsCart3 className={headerClasses.icon} />
            </Button>
          ) : null}
          <Button
            onClick={(e) => {
              let newEvent = new Event("theme");
              window.dispatchEvent(newEvent);
              let currentTheme = localStorage?.getItem("theme");
              if (!currentTheme || currentTheme === "light") {
                setIcon("sun");
                localStorage?.setItem("theme", "dark");
              } else if (currentTheme === "dark") {
                setIcon("moon");
                localStorage?.setItem("theme", "light");
              }
            }}
          >
            {icon === "sun" ? (
              <BiSun className={headerClasses.icon} />
            ) : (
              <FiMoon className={headerClasses.icon} />
            )}
          </Button>
          <Button onClick={(e) => setOpen(true)}>
            <FiSettings className={headerClasses.icon} />
          </Button>
        </Box>
      </Container>
      <ColorDialog
        open={open}
        handleClose={handleClose}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        changePrimaryColor={changePrimaryColor}
        changeSecondaryColor={changeSecondaryColor}
      />
      <LoginDialog
        open={openLoginDialog}
        handleClose={handleCloseLoginDialog}
      />
    </Box>
  );
}
