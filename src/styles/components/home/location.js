import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 40,
    marginBottom: 40,
    "& *": {
      fontFamily: `${theme?.elements?.fontFamily?.en}!important`,
    },
    "& .input": {
      fontSize: theme.direction == "rtl" ? "16px!important" : "14px!important",
      borderRadius: "10px",
      background: "#FFFFFF",
      height: "41px",
      width: "100%",
      marginBottom: "40px",
      "& .MuiInputBase-root": {
        "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: theme?.elements?.colors?.gray,
        },
        "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            borderColor: theme?.elements?.colors?.primary,
          },
      },
      "& .MuiInputBase-root .MuiInputBase-input:-webkit-autofill": {
        WebkitBoxShadow: "0 0 0 1000px white inset",
        padding: "11px",
      },
      "&:focus": {
        "& .MuiOutlinedInput-notchedOutline": {
          border: `0.5px solid ${theme?.elements?.colors?.primary}!important`,
        },
      },
    },
  },
  title: {
    fontSize: `${theme?.elements?.fontSize?.xl + 6}px!important`,
    fontWeight: `${theme?.elements?.fontWeight?.bold}!important`,
    color: `${theme?.elements?.colors?.black}!important`,
    marginBottom: "24px!important",
  },
}));
export default useStyles;
