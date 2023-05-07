import { Link } from "react-router-dom";
import { Arrow } from "../../assets/icons";
import { Card, Carousel } from "../../components";
import useWindowSize, { desktop } from "../../hooks/useWindowSize";
import { fetchDishes } from "../../services";
import "./DishSection.scss";
import { useEffect, useState } from "react";
import { Dish } from "../../models";

const DishSection: React.FC = () => {
  const { width } = useWindowSize();
  const [dishes, setDishes] = useState<Dish[]>([]);
  useEffect(() => {
    fetchDishes()
      .then((res) => {
       if(res) setDishes(res);
      })
      .catch((err) => console.log(err));
  });
  return (
    <section className="dish-container">
      <div className="popular-container">
        <h2>Signature Dish Of:</h2>
      </div>
      {width && width < desktop && <Carousel cards={dishes.slice(0, 10)} />}
      {width && width >= desktop && (
        <div className="desktop-card">
          {dishes.slice(0, 3).map((dish, index) => (
            <Card
              key={dish._id}
              hidePrice={index == 1 ? false : true}
              card={dish}
            />
          ))}
        </div>
      )}
      <Link to={"/restaurants"}>
        <div className="link-to-restaurants">
          <h3>All restaurants</h3>
          <Arrow className="arrow-icon" />
        </div>
      </Link>
    </section>
  );
};

export default DishSection;
