import {
  Slider,
  Marketing,
  Service,
  About,
  Restaurants,
  Location,
} from "../../components";
export default function Home() {
  return (
    <>
      <Slider />
      <Location />
      <Marketing />
      <Service />
      <Restaurants />
      <About />
    </>
  );
}
