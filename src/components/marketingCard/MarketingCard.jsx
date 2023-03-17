import { Box, Typography } from "@mui/material";
import useStyles from "../../styles/components/marketingCard/marketingCard";
export default function ToDoCard(props) {
  const cardClasses = useStyles();
  let { icon, title, description } = props;

  return (
    <Box className={cardClasses.root}>
      <Box className={cardClasses.icon}>
        <img src={icon} alt="icon" />
      </Box>
      <Typography className={cardClasses.title}>{title}</Typography>
      <Typography className={cardClasses.description}>{description}</Typography>
    </Box>
  );
}
