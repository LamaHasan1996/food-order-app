import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "40px",
    flex: "1 1 auto",
    "& *": {
      fontFamily: `${theme?.elements?.fontFamily?.en}!important`,
    },
  },
  contentContainer: {
    padding: "24px 0px",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: `${theme?.elements?.fontSize?.xl + 6}px!important`,
    fontWeight: `${theme?.elements?.fontWeight?.bold}!important`,
    color: `${theme?.elements?.colors?.black}!important`,
    marginBottom: "24px!important",
  },
  description: {
    fontSize: `${theme?.elements?.fontSize?.md - 2}px!important`,
    color: theme?.elements?.colors?.black,
  },
  btn: {
    border: `1px solid ${theme?.elements?.colors?.primary}`,
    padding: "8px 24px",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: theme?.elements?.fontSize?.md,
    color: `${theme?.elements?.colors?.primary}!important`,
    backgroundColor: theme?.elements?.colors.white,
  },
  btnBox: {
    justifyContent: "end",
    display: "flex",
    marginTop: 16,
    "& .MuiLink-root:hover": {
      backgroundColor: theme?.elements?.colors?.primary,
      color: `${theme?.elements?.colors.white}!important`,
    },
  },
  mb40: {
    marginBottom: 40,
  },
  mb24: {
    marginBottom: 24,
  },
  mb8: {
    marginBottom: 8,
  },
  noDataText: {
    fontSize: theme?.elements?.fontSize?.xl,
    textAlign: "center",
    color: theme?.elements?.colors?.black,
  },
  mealBox: {
    borderTop: `1px solid ${theme?.elements?.colors?.lightGray}`,
    marginTop: 8,
    marginBottom: 8,
    padding: "8px 24px",
    "&:hover": {
      cursor: "pointer",
      boxShadow: "0 2px 16px 0 rgb(0 0 0 / 8%)",
    },
  },
  mealTitleBox: {
    display: "flex",
    justifyContent: "space-between",
    width: "90%",
    [theme.breakpoints.down(600)]: {
      display: "block",
    },
  },
  mealTitle: {
    fontSize: theme?.elements?.fontSize?.md,
    color: theme?.elements?.colors?.black,
  },
  mealDescription: {
    fontSize: theme?.elements?.fontSize?.md - 2,
    color: theme?.elements?.colors?.gray,
  },
  circle: {
    backgroundColor: theme?.elements?.colors?.green,
    height: 15,
    width: 15,
    borderRadius: 16,
    marginRight: 8,
  },
  center: {
    display: "flex",
    alignItems: "center",
  },
  black: {
    color: theme?.elements?.colors?.black,
  },
}));
export default useStyles;
