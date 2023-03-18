import { restaurants } from "../../utils/data";
import {Card} from "../../components";
import { Container, Grid ,Typography} from "@mui/material";
import useStyles from "../../styles/pages/home/restaurants";
import clsx from "clsx";
import {useState,useEffect} from "react";

export default function Restaurant() {
  const restaurantsClasses = useStyles();
  const [data,setData]=useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = restaurants;
        await new Promise(resolve => setTimeout(resolve, 3000)); 
        setData(response);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <Container
      maxWidth="lg"
      className={clsx(restaurantsClasses.root, restaurantsClasses.mb40)}
    >
      <Grid container spacing={2}>
        {data?.length?data?.map((item) => (
          <Grid item sm={4} xs={12}>
            <Card item={item} />
          </Grid>
        )):  <Typography className={restaurantsClasses.noDataText}>
        Loading...
      </Typography>}
      </Grid>
    </Container>
  );
}
