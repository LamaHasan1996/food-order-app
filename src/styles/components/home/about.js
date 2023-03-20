import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "40px",
    backgroundColor: theme?.elements?.colors?.secondary,
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
    fontSize: `${theme?.elements?.fontSize?.xl + 6}px`,
    fontWeight: theme?.elements?.fontWeight?.bold,
    color: theme?.elements?.colors?.black,
  },
  description: {
    fontSize: `${theme?.elements?.fontSize?.md - 2}px`,
    color: theme?.elements?.colors?.black,
  },
}));
export default useStyles;
