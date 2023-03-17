import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from "@mui/material";
import clsx from "clsx";
import useStyles from "../../styles/components/card/card";

export default function ToDoCard(props) {
  const cardClasses = useStyles();
  let { title, description, id, image, link, open } = props?.item;

  return (
    <Link href={link} className={cardClasses.link}>
      <Card className={cardClasses.card} key={id}>
        <Typography
          component="span"
          className={clsx(cardClasses.flag, cardClasses.statusFlag)}
        >
          {"online"}
        </Typography>
        <Typography
          component="span"
          className={clsx(cardClasses.flag, cardClasses.openFlag)}
        >
          {"open from "}
          {open}
        </Typography>
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt="Restaurant"
        />
        <CardContent>
          <Box display="flex" justifyContent={"space-between"}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className={cardClasses.title}
            >
              {title}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            className={cardClasses.description}
          >
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
