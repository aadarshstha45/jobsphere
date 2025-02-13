import { forwardRef, RefObject } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./style.css";

interface ResponsiveProps {
  breakpoint: number;
  settings: {
    slidesToShow: number;
    slidesToScroll: number;
    infinite?: boolean;
    dots?: boolean;
  };
}

interface SlickSliderProps {
  children: React.ReactNode;
  slidesToShow?: number;
  slidesToScroll?: number;
  speed?: number;
  dots?: boolean;
  infinite?: boolean;
  showArrows?: boolean;
  autoPlay?: boolean;
  autoPlaySpeed?: number;
  responsive?: ResponsiveProps[];
}

const SlickSlider = forwardRef<Slider, SlickSliderProps>(
  (
    {
      children,
      slidesToShow,
      slidesToScroll,
      speed,
      dots,
      infinite,
      showArrows,
      autoPlay,
      autoPlaySpeed,
      responsive,
    },
    ref
  ) => {
    var settings = {
      dots: dots ?? true,
      infinite: infinite ?? true,
      speed: speed ?? 500,
      slidesToShow: slidesToShow ?? 1,
      slidesToScroll: slidesToScroll ?? 1,
      arrows: showArrows ?? true,
      autoplay: autoPlay ?? true,
      delay: 5000,
      autoplaySpeed: autoPlaySpeed ?? 5000,
      spacing: 10,
      responsive: responsive ?? [],
    };

    return (
      <Slider
        ref={ref as RefObject<Slider>}
        {...settings}
        className="slider-container"
      >
        {children}
      </Slider>
    );
  }
);

export default SlickSlider;
