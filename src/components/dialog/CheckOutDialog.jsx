import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import useStyles from "../../styles/components/dialog/dialog";
import { GoLocation } from "react-icons/go";
import { MdOutlineTimer } from "react-icons/md";
import { TbMoneybag } from "react-icons/tb";
import clsx from "clsx";
import { Spinner } from "../index";

export default function CheckOutDialog(props) {
  const [confirm, setConfirm] = useState(false);
  const [spinner, setSpinner] = useState(false);
  let { open, handleClose, finalCost, setDisabled } = props;
  const dialogClasses = useStyles();

  useEffect(() => {
    setConfirm(false);
  }, [open]);

  useEffect(() => {
    const confirm = async () => {
      try {
        setSpinner(true);
        setTimeout(() => {
          setSpinner(false);
          setConfirm(true);
          setDisabled(true);
          setTimeout(() => {
            handleClose();
          }, 2000);
        }, 3000);
      } catch (error) {
        console.error(error);
      }
    };
    const handleConfirm = () => {
      confirm();
    };
    window.addEventListener("confirm", handleConfirm);
    return () => {
      window.removeEventListener("confirm", handleConfirm);
    };
  }, []);

  const confirmOrder = () => {
    const newEvent = new Event("confirm");
    window.dispatchEvent(newEvent);
    sessionStorage?.setItem("confirmed", true);
    setTimeout(() => {
      sessionStorage?.removeItem("confirmed");
    }, 60000);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} className={dialogClasses.title}>
        Once you confirm the order, you will not be able to modify it again.
        Please check the Order again.
        <br />
        <Typography className={clsx(dialogClasses.green, dialogClasses.title)}>
          {confirm ? "* Order Confirmed Successfully." : null}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme?.palette?.grey[500],
          }}
        >
          <AiOutlineCloseCircle />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box display="flex">
          <Box>
            <Typography className={dialogClasses.checkOutLabel}>
              Your Current Location :{" "}
            </Typography>
          </Box>
          <Box>
            <Typography className={dialogClasses.value}>
              <GoLocation className={dialogClasses.checkOutIcon} /> Tartous,
              st.Hananu, Building24
            </Typography>
          </Box>
        </Box>
        <Box display="flex">
          <Box>
            <Typography className={dialogClasses.checkOutLabel}>
              Expected Time :{" "}
            </Typography>
          </Box>
          <Box>
            <Typography className={dialogClasses.value}>
              <MdOutlineTimer className={dialogClasses.checkOutIcon} /> 24 min
            </Typography>
          </Box>
        </Box>
        <Box display="flex">
          <Box>
            <Typography className={dialogClasses.checkOutLabel}>
              Final Cost :{" "}
            </Typography>
          </Box>
          <Box>
            <Typography className={dialogClasses.value}>
              <TbMoneybag className={dialogClasses.checkOutIcon} /> {finalCost}{" "}
              {" SYP"}
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          className={dialogClasses.mt16}
        >
          <Button onClick={(e) => confirmOrder()} className={dialogClasses.btn}>
            Confirm {spinner ? <Spinner /> : null}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
