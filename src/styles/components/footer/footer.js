import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme?.elements?.colors?.primary,
    height: 95,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: theme?.elements?.colors.white,
    borderTop: "1px solid #fff",
    "& *": {
      fontFamily: `${theme?.elements?.fontFamily?.en}!important`,
    },
  },
  coptRights: {
    fontSize: `${theme?.elements?.fontSize?.sm}px!important`,
  },
}));
export default useStyles;
