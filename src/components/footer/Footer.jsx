import { Box, Container, Typography } from "@mui/material";
import useStyles from "../../styles/components/footer/footer";

export default function Footer() {
  const footerClasses = useStyles();
  return (
    <Box className={footerClasses.root}>
      <Container maxWidth="lg">
        <Typography className={footerClasses.coptRights}>
          2023 Copyright. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
}
