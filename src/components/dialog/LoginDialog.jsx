import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { useState, useEffect } from "react";
import {
  AiOutlineCloseCircle,
  AiOutlineEyeInvisible,
  AiOutlineEye,
} from "react-icons/ai";
import * as Yup from "yup";
import useStyles from "../../styles/components/dialog/dialog";
import { CustomTextField, Spinner } from "../index";
import { users } from "../../utils/data";

export default function LoginDialog(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [response, setResponse] = useState(false);
  let { open, handleClose } = props;
  const dialogClasses = useStyles();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  let initialValues = {
    email: "",
    password: "",
  };
  let validationSchema = Yup.object({
    email: Yup.string().required("required").email("Invalid Email Format"),
    password: Yup.string().required("required"),
  });

  useEffect(() => {
    setResponse(false);
  }, [open]);

  useEffect(() => {
    if (response) {
      setSpinner(false);
    }
    if (response?.success) {
      setTimeout(() => {
        sessionStorage?.setItem("user", response?.email);
        const newEvent = new Event("login");
        window.dispatchEvent(newEvent);
        handleClose();
      }, 1000);
    }
  }, [response]);

  const onSubmit = (values) => {
    setSpinner(true);
    const myPromise = new Promise((resolve) => {
      setTimeout(() => {
        const user = users.find(
          (u) => u.email === values?.email && u.password === values?.password
        );

        if (user) {
          resolve({ success: true, email: values?.email });
        } else {
          resolve({ success: false });
        }
      }, 3000);
    });
    myPromise
      .then((response) => {
        setResponse(response);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setSpinner(false);
      });
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} className={dialogClasses.title}>
        Enter Your Information:
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
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {(formik) => (
            <Box className={dialogClasses.root}>
              <Typography
                className={
                  response?.success ? dialogClasses.green : dialogClasses.red
                }
              >
                {response?.success
                  ? "* Log in Successfully"
                  : response?.success === false
                  ? "* Check Your Email and Password and Log in again"
                  : null}
              </Typography>
              <Box mb={2} mt={2}>
                <InputLabel
                  htmlFor="email"
                  required
                  className={dialogClasses.label}
                >
                  Email
                </InputLabel>
                <CustomTextField
                  name="email"
                  type="email"
                  id="email"
                  variant="outlined"
                  className={dialogClasses.input}
                  onChange={(e) =>
                    formik?.setFieldValue("email", e?.target?.value)
                  }
                />
                {formik?.touched?.email && formik?.errors?.email ? (
                  <span className={dialogClasses.error}>
                    {formik?.errors?.email}
                  </span>
                ) : null}
              </Box>
              <Box mb={2} mt={2}>
                <InputLabel
                  htmlFor="password"
                  required
                  className={dialogClasses.label}
                >
                  Password
                </InputLabel>
                <CustomTextField
                  name="password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  variant="outlined"
                  className={dialogClasses.input}
                  onChange={(e) =>
                    formik?.setFieldValue("password", e?.target?.value)
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? (
                            <AiOutlineEyeInvisible />
                          ) : (
                            <AiOutlineEye />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {formik?.touched?.password && formik?.errors?.password ? (
                  <span className={dialogClasses.error}>
                    {formik?.errors?.password}
                  </span>
                ) : null}
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Button
                  onClick={(e) => formik?.submitForm()}
                  className={dialogClasses.btn}
                >
                  Submit{spinner ? <Spinner /> : null}
                </Button>
              </Box>
            </Box>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
