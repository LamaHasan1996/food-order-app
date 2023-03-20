import { Container, Typography } from "@mui/material";
import useStyles from "../../../styles/components/home/location";
import { MapWithMarkers } from "../../../components";

export default function Location() {
  const locationClasses = useStyles();
  return (
    <Container maxWidth="lg" className={locationClasses.root}>
      <Typography className={locationClasses.title}>Your Location</Typography>
      <MapWithMarkers />
    </Container>
  );
}
