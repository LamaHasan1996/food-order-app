import { restaurants } from "./data";
import { basicTheme } from "../styles/theme";

export const makeTheme = (currentTheme, mode) => {
  console.log(mode, "mode");
  return {
    ...currentTheme,
    elements: {
      ...currentTheme.elements,
      colors: {
        ...currentTheme.elements.colors,
        primary: mode === "light" ? "#ff9752" : "#0a1929",
        black: mode === "light" ? "#000000" : "#fff",
        secondary: mode === "light" ? "#d7f4f4" : "#0a1929",
        white: "#fff",
        gray: mode === "light" ? "#918d8d" : "#fff",
        lightGray: mode === "light" ? "#f2f0f0" : "#fff",
        green: "#2cef2c",
        offWhite: mode === "light" ? "#fff" : "#001e3c",
      },
    },
    palette: {
      ...currentTheme.palette,
      mode: mode,
    },
  };
};

export const changeThemeColor = (key, color) => {
  let theme = localStorage.getItem("currentTheme")
    ? JSON.parse(localStorage.getItem("currentTheme"))
    : basicTheme;
  localStorage?.setItem(
    "currentTheme",
    JSON.stringify({
      ...theme,
      elements: {
        ...theme.elements,
        colors: { ...theme.elements.colors, [key]: color?.hex },
      },
    })
  );
};

export const getDetails = (alias) => {
  return restaurants?.find((item) => item?.alias === alias);
};

export const buyMeal = (meal) => {
  const newEvent = new Event("buy");
  window.dispatchEvent(newEvent);
  let purchases = sessionStorage?.getItem("purchases")
    ? JSON.parse(sessionStorage?.getItem("purchases"))
    : null;
  if (purchases) {
    const index = purchases.data.findIndex(
      (p) => p.title === meal.title && p.restaurant === meal.restaurant
    );
    if (index !== -1) {
      purchases.data[index].num++;
    } else {
      purchases.data.push({ ...meal, num: 1 });
    }
  } else {
    purchases = { data: [{ ...meal, num: 1 }] };
  }
  sessionStorage?.setItem("purchases", JSON.stringify(purchases));
};

export const removeMeal = (meal, setPurchases) => {
  const newEvent = new Event("remove");
  let purchases = sessionStorage?.getItem("purchases")
    ? JSON.parse(sessionStorage?.getItem("purchases"))
    : null;
  if (purchases) {
    const index = purchases.data.findIndex(
      (p) => p.title === meal.title && p.restaurant === meal.restaurant
    );
    if (index !== -1) {
      const num = purchases.data[index].num;
      if (num === 1) {
        purchases.data.splice(index, 1);
      } else {
        purchases.data[index].num--;
      }
      sessionStorage?.setItem("purchases", JSON.stringify(purchases));
    }
    setPurchases(purchases?.data);
  }
  window.dispatchEvent(newEvent);
};

export const confirmOrder = () => {
  const newEvent = new Event("confirm");
  window.dispatchEvent(newEvent);
  sessionStorage?.setItem("confirmed", true);
  setTimeout(() => {
    sessionStorage?.removeItem("confirmed");
  }, 60000);
};
