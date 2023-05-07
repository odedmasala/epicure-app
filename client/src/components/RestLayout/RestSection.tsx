import { useEffect, useState } from "react";
import { Arrow } from "../../assets/icons";
import { Card, Carousel } from "../../components";
import { fetchAllRestaurants } from "../../services";
import "./RestSection.scss";
import useWindowSize, { desktop } from "../../hooks/useWindowSize";
import { Link } from "react-router-dom";
import { Restaurant } from "../../models";
const RestSection: React.FC = () => {
  const { width, height } = useWindowSize();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    fetchAllRestaurants()
      .then((res) => {
        if(res)setRestaurants(res);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <section className="restaurants-container">
      <div className="popular-container">
        <h2>popular restaurant in epicure:</h2>
      </div>
      {width && width < desktop && <Carousel cards={restaurants} />}
      {width && width >= desktop && (
        <div className="desktop-card">
          {restaurants.slice(0, 3).map((rest) => (
            <Card key={rest._id} week={false} card={rest} />
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

export default RestSection;
