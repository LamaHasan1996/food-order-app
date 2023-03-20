import useStyles from "../../../styles/components/home/marketing";
import { Container, Grid } from "@mui/material";
import MarketingCard from "../../marketingCard/MarketingCard";
import { marketingData } from "../../../utils/data";

export default function Marketing() {
  const marketingClasses = useStyles();

  return (
    <Container maxWidth="lg" className={marketingClasses.root}>
      <Grid container>
        {marketingData?.map((item) => (
          <Grid item sm={4} xs={12}>
            <MarketingCard
              icon={item?.icon}
              title={item?.title}
              description={item?.description}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
