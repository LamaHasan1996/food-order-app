import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { AiOutlineCloseCircle } from "react-icons/ai";
import ColorPicker from "../colorPicker/ColorPicker";

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme?.palette?.grey[500],
          }}
        >
          <AiOutlineCloseCircle />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function SettingsDialog(props) {
  let {
    open,
    handleClose,
    primaryColor,
    secondaryColor,
    changePrimaryColor,
    changeSecondaryColor,
  } = props;

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Choose Your Colors:
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Box>
          <Typography gutterBottom>Choose Primary Color:</Typography>
          <ColorPicker
            color={primaryColor}
            alpha={50}
            onChange={changePrimaryColor}
            placement="bottomLeft"
          />
        </Box>
        <Box marginTop={"16px"}>
          {" "}
          <Typography gutterBottom>Choose Secondary Color:</Typography>
          <ColorPicker
            color={secondaryColor}
            alpha={50}
            onChange={changeSecondaryColor}
            placement="bottomLeft"
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
}
