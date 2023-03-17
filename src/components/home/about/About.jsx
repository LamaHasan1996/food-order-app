import { Container, Grid, Box } from "@mui/material";
import useStyles from "../../../styles/pages/home/about";

export default function About() {
  const aboutClasses = useStyles();

  return (
    <Box className={aboutClasses.root}>
      <Container maxWidth="lg">
        <Grid container className={aboutClasses.contentContainer}>
          <Grid item sm={6} xs={12} className={aboutClasses.title}>
            About Meal Mate
          </Grid>
          <Grid item sm={6} xs={12} className={aboutClasses.description}>
            Meal Mate is simply the easiest way to order food for delivery or
            takeout. Whatever you're in the mood for, wherever you're in the
            mood for it, you've got it. No menus, no phone calls, no repeating
            yourself. Meal Mate is a part of the Grubhub Inc. portfolio of
            brands
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
