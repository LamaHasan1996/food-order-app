import { Box, Container, Typography } from "@mui/material";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useStyles from "../../../styles/pages/home/restaurants";
import { getDetails } from "../../../utils/globalFunctions";

export default function RestaurantDetails() {
  const restaurantsClasses = useStyles();
  const [data, setData] = useState(null);
  const { alias } = useParams();

  useEffect(() => {
    if (alias) {
      let details = getDetails(alias);
      if (details) setData(details);
    }
  }, [alias]);

  return (
    <Container
      maxWidth="lg"
      className={clsx(restaurantsClasses.root, restaurantsClasses.mb40)}
    >
      {data ? (
        <>
          {data?.title && (
            <Typography
              className={clsx(
                restaurantsClasses.title,
                restaurantsClasses.center
              )}
            >
              <Box className={restaurantsClasses.circle} /> {data?.title}
            </Typography>
          )}
          {data?.description && (
            <Typography
              className={clsx(
                restaurantsClasses.description,
                restaurantsClasses.mb24
              )}
            >
              {data?.description}
            </Typography>
          )}
          <Typography
            className={clsx(
              restaurantsClasses.description,
              restaurantsClasses.mb24
            )}
          >
            Choose You Happy Meal:
          </Typography>
          {data?.meals?.length
            ? data?.meals?.map((meal) => (
                <Box className={restaurantsClasses.mealBox}>
                  <Box className={restaurantsClasses.mealTitleBox}>
                    {meal?.title && (
                      <Box
                        className={clsx(
                          restaurantsClasses.mealTitle,
                          restaurantsClasses.mb8
                        )}
                      >
                        {meal?.title}
                      </Box>
                    )}
                    {meal?.cost && (
                      <Box className={restaurantsClasses.black}>
                        {meal?.cost}
                        {" SYP"}
                      </Box>
                    )}
                  </Box>
                  {meal?.description && (
                    <Box className={restaurantsClasses.mealDescription}>
                      {meal?.description}
                    </Box>
                  )}
                </Box>
              ))
            : null}
        </>
      ) : (
        <Typography className={restaurantsClasses.noDataText}>
          Sorry! No Data Found
        </Typography>
      )}
    </Container>
  );
}
