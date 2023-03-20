import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme?.elements?.colors.offWhite,
    "& *": {
      fontFamily: `${theme?.elements?.fontFamily?.en}!important`,
    },
  },
  label: {
    color: `${theme?.elements?.colors?.black}!important`,
    fontSize: `${theme?.elements?.fontSize.md - 2}px!important`,
    "& .MuiInputLabel-asterisk": {
      color: "red",
    },
  },
  checkOutLabel: {
    color: `${theme?.elements?.colors?.black}!important`,
    fontSize: `${theme?.elements?.fontSize.md - 2}px!important`,
    fontWeight: `${theme?.elements?.fontWeight?.bold}!important`,
    marginRight: "16px!important",
    marginBottom: "16px!important",
    width: 175,
  },
  value: {
    color: `${theme?.elements?.colors?.black}!important`,
    fontSize: `${theme?.elements?.fontSize.md}px!important`,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  title: {
    color: `${theme?.elements?.colors?.black}!important`,
    fontSize: `${theme?.elements?.fontSize.md}px!important`,
  },
  input: {
    width: "100%",
    "& .MuiInputBase-root .MuiInputBase-input": {
      height: 11,
    },
    "& .MuiInputBase-root .MuiInputBase-input:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px white inset",
    },
    "& .MuiInputBase-root .MuiOutlinedInput-notchedOutline": {
      borderColor: `${theme?.elements?.colors?.primary}!important`,
    },
  },
  btn: {
    border: `1px solid ${theme?.elements?.colors?.primary}!important`,
    padding: "8px 10px!important",
    borderRadius: "6px!important",
    cursor: "pointer!important",
    fontSize: `${theme?.elements?.fontSize?.md - 2}px!important`,
    color: `${theme?.elements?.colors?.primary}!important`,
    backgroundColor: `${theme?.elements?.colors.white}!important`,
  },
  error: {
    color: "red",
    fontSize: `${theme?.elements?.fontSize?.sm}px!important`,
  },
  green: {
    color: "green!important",
  },
  red: {
    color: "red!important",
  },
  checkOutIcon: {
    color: `${theme?.elements?.colors?.primary}!important`,
    fontSize: `${theme?.elements?.fontSize?.md + 2}px!important`,
    marginRight: 12,
  },
  mt16: {
    marginTop: "16px!important",
  },
}));
export default useStyles;
