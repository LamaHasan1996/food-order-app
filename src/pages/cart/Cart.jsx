import { Typography, Box, Button, Container } from "@mui/material";
import { useState, useEffect } from "react";
import useStyles from "../../styles/pages/home/restaurants";
import clsx from "clsx";
import { removeMeal } from "../../utils/globalFunctions";
import { CheckOutDialog } from "../../components";
import { BsCheck2Circle } from "react-icons/bs";

export default function Cart() {
  const [purchases, setPurchases] = useState(
    JSON.parse(sessionStorage.getItem("purchases"))?.data
  );
  const [open, setOpen] = useState(false);
  const [finalCost, setFinalCost] = useState(0);
  const [disabled, setDisabled] = useState(
    sessionStorage?.getItem("confirmed")
  );
  const restaurantsClasses = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (purchases && purchases?.length > 0) {
      const finalCost = purchases.reduce((total, meal) => {
        const cost = meal.cost * meal.num;
        return total + cost;
      }, 0);
      setFinalCost(finalCost);
    }
  }, [purchases]);

  return (
    <Container
      maxWidth="lg"
      className={clsx(restaurantsClasses.root, restaurantsClasses.mb40)}
    >
      <Typography className={restaurantsClasses.title}>Purchases</Typography>
      <Typography className={restaurantsClasses.success}>
        {disabled ? (
          <>
            <BsCheck2Circle className={restaurantsClasses.successIcon} /> Order
            is now on its way to you. Please sit back, relax and enjoy your
            meal. Thank you for choosing Meal Mate.
          </>
        ) : null}
      </Typography>
      {purchases?.length > 0 ? (
        purchases?.map((meal) => (
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
                  {" ( "} {meal?.num}
                  {" )"}
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
                    {meal?.num * meal?.cost}
                    {" SYP"}
                  </Box>
                )}
                <Button
                  className={
                    disabled
                      ? restaurantsClasses.disabledBtn
                      : restaurantsClasses.addBtn
                  }
                  onClick={(e) => removeMeal(meal, setPurchases)}
                  disabled={disabled}
                >
                  -
                </Button>
              </Box>
            </Box>
            {meal?.restaurant && (
              <Box className={restaurantsClasses.mealDescription}>
                {meal?.restaurant}
              </Box>
            )}
          </Box>
        ))
      ) : (
        <Typography>There is No Purchases yet</Typography>
      )}
      {purchases?.length > 0 && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button
            onClick={(e) => setOpen(true)}
            className={
              disabled
                ? restaurantsClasses.disabledBuyBtn
                : restaurantsClasses.buyBtn
            }
            disabled={disabled}
          >
            Submit
          </Button>
        </Box>
      )}
      <CheckOutDialog
        open={open}
        handleClose={handleClose}
        finalCost={finalCost}
        setDisabled={setDisabled}
      />
    </Container>
  );
}
