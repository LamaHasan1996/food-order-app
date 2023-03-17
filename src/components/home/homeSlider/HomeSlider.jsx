import { Box } from "@mui/material";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { homeSliderData } from "../../../utils/data";
import useStyles from "../../../styles/components/slider/slider";
import Slider from "react-slick";

export default function HomeSlider() {
  const sliderClasses = useStyles();

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return ( <Box className={sliderClasses.sliderContainer}>
    {" "}
    <Slider {...settings}>
      {homeSliderData?.map((item) => (
        <img src={item?.src} alt={item?.alt} />
      ))}
    </Slider>
  </Box>);
}
