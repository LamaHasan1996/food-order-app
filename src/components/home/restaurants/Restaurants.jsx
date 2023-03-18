import { Box, Container, Grid, Link, Typography } from "@mui/material";
import Card from "../../card/Card";
import useStyles from "../../../styles/pages/home/restaurants";
import { restaurants } from "../../../utils/data";
import { useState, useEffect } from "react";

export default function Restaurants() {
  const [data, setData] = useState([]);
  const restaurantsClasses = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = restaurants;
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setData(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="lg" className={restaurantsClasses.root}>
      <Typography className={restaurantsClasses.title}>
        Order Your Meal Now!
      </Typography>
      <Grid container spacing={2}>
        {data?.length ? (
          data?.slice(0, 3).map((item) => (
            <Grid item sm={4} xs={12}>
              <Card item={item} />
            </Grid>
          ))
        ) : (
          <Typography className={restaurantsClasses.noDataText}>
            Loading...
          </Typography>
        )}
      </Grid>
      <Box className={restaurantsClasses.btnBox}>
        <Link href={"/restaurants"} className={restaurantsClasses.btn}>
          Show All
        </Link>
      </Box>
    </Container>
  );
}
