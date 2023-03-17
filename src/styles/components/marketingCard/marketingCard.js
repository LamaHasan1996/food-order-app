import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "& *": {
      fontFamily: `${theme?.elements?.fontFamily?.en}!important`,
      textAlign: "center",
    },
  },
  icon: {
    height: 90,
    width: 90,
    "& img": {
      maxWidth: "100%",
    },
  },
  title: {
    fontSize: `${theme?.elements?.fontSize.md}px!important`,
    fontWeight: `${theme?.elements?.fontWeight.bold}!important`,
    color: theme?.elements?.colors?.black,
    height: 50,
  },
  description: {
    color: theme?.elements?.colors?.gray,
  },
}));
export default useStyles;
