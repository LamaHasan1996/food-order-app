import { Box, Container, Grid, Link, Typography } from "@mui/material";
import Card from "../../card/Card";
import useStyles from "../../../styles/pages/home/restaurants";
import { restaurants } from "../../../utils/data";

export default function Restaurants() {
  const restaurantsClasses = useStyles();

  return (
    <Container maxWidth="lg" className={restaurantsClasses.root}>
      <Typography className={restaurantsClasses.title}>
        Order Your Meal Now!
      </Typography>
      <Grid container spacing={2}>
        {restaurants?.slice(0, 3).map((item) => (
          <Grid item sm={4} xs={12}>
            <Card item={item} />
          </Grid>
        ))}
      </Grid>
      <Box className={restaurantsClasses.btnBox}>
        <Link href={"/restaurants"} className={restaurantsClasses.btn}>
          Show All
        </Link>
      </Box>
    </Container>
  );
}
