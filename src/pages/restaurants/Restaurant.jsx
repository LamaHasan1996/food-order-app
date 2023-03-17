import { restaurants } from "../../utils/data";
import {Card} from "../../components";
import { Container, Grid } from "@mui/material";
import useStyles from "../../styles/pages/home/restaurants";
import clsx from "clsx";

export default function Restaurant() {
  const restaurantsClasses = useStyles();
  return (
    <Container
      maxWidth="lg"
      className={clsx(restaurantsClasses.root, restaurantsClasses.mb40)}
    >
      <Grid container spacing={2}>
        {restaurants?.map((item) => (
          <Grid item sm={4} xs={12}>
            <Card item={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
