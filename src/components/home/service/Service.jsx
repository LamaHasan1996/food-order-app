import { Container, Grid, Typography, Box } from "@mui/material";
import useStyles from "../../../styles/pages/home/service";

export default function Service() {
  const serviceClasses = useStyles();

  return (
    <Container maxWidth="lg" className={serviceClasses.root}>
      <Grid container className={serviceClasses.contentContainer}>
        <Grid item md={6} sm={12} xs={12} className={serviceClasses.center}>
          <Box className={serviceClasses.imgContainer}>
            <img src="images/cards/friends.png" alt="food" />
          </Box>
        </Grid>
        <Grid
          item
          md={6}
          sm={12}
          xs={12}
          className={serviceClasses.centeredData}
        >
          <Typography className={serviceClasses.title}>
            Restaurants near you, delivered fast
          </Typography>
          <Typography className={serviceClasses.description}>
            Meal Mate is simply the easiest way to order food for delivery or
            takeout. Whatever you're in the mood for, wherever you're in the
            mood for it, you've got it. No menus, no phone calls, no repeating
            yourself. Just simple neighborhood food delivery. Meal Mate is a
            part of the Grubhub Inc. portfolio of brands. For more information
            on Grubhub, Inc., please visit about.grubhub.com.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
