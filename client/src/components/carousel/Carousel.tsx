import React from "react";
import "swiper/swiper.min.css";
import "./carousel.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Card } from "../../components";
import useWindowSize from "../../hooks/useWindowSize";
import { Chef, Dish, Restaurant } from "../../models";

export type CardsList = Restaurant[] | Dish[] | Chef[];
const Carousel: React.FC<{ cards: CardsList; weekChef?: boolean }> = ({
  cards,
  weekChef,
}) => {
  const { width } = useWindowSize();

  return (
    <>
      <div className="carousel-container">
        <div>
          <Swiper
            spaceBetween={24}
            slidesPerView={width && width > 650 ? 3 : 1.5}
            autoplay={{ delay: 3000 }}
          >
            {cards &&
              cards.length > 0 &&
              cards.map((cardItem, index) => (
                <SwiperSlide key={`${cardItem.id} ${index}`}>
                  <Card key={cardItem.id} card={cardItem} week={weekChef} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Carousel;
