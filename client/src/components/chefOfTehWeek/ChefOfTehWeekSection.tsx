import { useEffect, useState } from "react";
import { Arrow } from "../../assets/icons";
import { Card, Carousel } from "../../components";
import { getChefs, fetchRestaurantByChefId } from "../../services";
import "./chefOfTehWeek.scss";
import { Chef, Restaurant } from "../../models";
const ChefOfTehWeekSection: React.FC = () => {
  const [chef, setChef] = useState<Chef>();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  useEffect(() => {
    getChefs()
      .then((chefs) => {
        if(chefs) setChef(chefs.find((chef) => chef.weekChef === true));
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    if (chef) {
      fetchRestaurantByChefId(chef._id)
        .then((restaurants) => {
          if (restaurants) setRestaurants(restaurants);
        })
        .catch((error) => console.log(error));
    }
  }, [chef]);
  return (
    <section className="chef-container">
      {chef && (
        <div key={chef._id}>
          <div className="chef-detail">
            <div className="chef-title">
              <h2>Chef of the week:</h2>
            </div>
            <div className="chef-box">
              <Card week={true} card={chef} />
              <div className="chef-description">
                <p>{chef.description}</p>
              </div>
            </div>
            <div className="chef-week-title">
              <h2 className="mobile-title">Chef of the week:</h2>
              <h1 className="desktop-title">{`${chef.fName}'s Restaurants`}</h1>
            </div>
          </div>
          <div className="desktop-cards">
            {restaurants.map((rest) => (
              <Card week={true} key={rest._id} card={rest} />
            ))}
          </div>
          <div className="carousel">
            {<Carousel cards={restaurants} weekChef={true} />}
          </div>
          <div className="link-to-restaurants">
            <h3>All restaurants</h3>
            <Arrow className="arrow-icon" />
          </div>
        </div>
      )}
    </section>
  );
};

export default ChefOfTehWeekSection;
