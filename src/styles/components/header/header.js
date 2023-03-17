import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme?.elements?.colors?.primary,
    height: 95,
    color: theme?.elements?.colors.white,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #fff",
    "& .MuiButton-root": {
      "& :hover": {
        background: "none",
      },
    },
    "& *": {
      fontFamily: `${theme?.elements?.fontFamily?.en}!important`,
    },
    "& .MuiContainer-root": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      [theme.breakpoints.down(450)]: {
        display: "block",
      },
    },
  },
  brand: {
    fontSize: `${theme?.elements?.fontSize?.xl + 8}px!important`,
    color: `${theme?.elements?.colors.white}!important`,
  },
  icon: {
    border: `1px solid ${theme?.elements?.colors.white}`,
    fontSize: `${theme?.elements?.fontSize?.xl + 10}px!important`,
    padding: 8,
    borderRadius: 6,
    color: `${theme?.elements?.colors.white}!important`,
  },
}));
export default useStyles;
