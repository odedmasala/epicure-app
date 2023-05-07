import React from "react";
import "./hero.scss";
import { Search } from "../../assets/icons";
import InputSearch from "../inputSearch/InputSearch";
const Hero: React.FC = () => {
  return (
    <>
      <div className="hero-container">
        <div className="search-container">
          <div className="Hero-title">
            <h1>Epicure works with the top chef restaurants in Tel Aviv</h1>
          </div>
          <InputSearch />
        </div>
      </div>
    </>
  );
};

export default Hero;
