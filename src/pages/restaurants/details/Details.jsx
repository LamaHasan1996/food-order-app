import { Box, Button, Container, Typography } from "@mui/material";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useStyles from "../../../styles/components/home/restaurants";
import { restaurants } from "../../../utils/data";

export default function RestaurantDetails() {
  const restaurantsClasses = useStyles();
  const [data, setData] = useState(null);
  const [buy, setBuy] = useState(sessionStorage.getItem("user") ? true : false);
  const { alias } = useParams();

  const getDetails = (alias) => {
    return restaurants?.find((item) => item?.alias === alias);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = getDetails(alias);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setData(response);
      } catch (error) {
        console.error(error);
      }
    };

    if (alias) fetchData();
  }, [alias]);

  useEffect(() => {
    const handleAllowBuy = () => {
      let user = sessionStorage.getItem("user");
      console.log(user, "user");
      if (user) setBuy(true);
      else setBuy(false);
    };
    window.addEventListener("login", handleAllowBuy);
    return () => {
      window.removeEventListener("login", handleAllowBuy);
    };
  }, []);

  const buyMeal = (meal) => {
    const newEvent = new Event("buy");
    let purchases = sessionStorage?.getItem("purchases")
      ? JSON.parse(sessionStorage?.getItem("purchases"))
      : null;
    if (purchases) {
      const index = purchases.data.findIndex(
        (p) => p.title === meal.title && p.restaurant === meal.restaurant
      );
      if (index !== -1) {
        purchases.data[index].num++;
      } else {
        purchases.data.push({ ...meal, num: 1 });
      }
    } else {
      purchases = { data: [{ ...meal, num: 1 }] };
    }
    sessionStorage?.setItem("purchases", JSON.stringify(purchases));
    window.dispatchEvent(newEvent);
  };
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
            {!buy && "Log In and "} Choose You Happy Meal:
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
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      className={restaurantsClasses.addBtnBox}
                    >
                      {meal?.cost && (
                        <Box className={restaurantsClasses.black}>
                          {meal?.cost}
                          {" SYP"}
                        </Box>
                      )}
                      {buy && (
                        <Button
                          className={restaurantsClasses.addBtn}
                          onClick={(e) => buyMeal(meal)}
                        >
                          +
                        </Button>
                      )}
                    </Box>
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
          Loading...
        </Typography>
      )}
    </Container>
  );
}
