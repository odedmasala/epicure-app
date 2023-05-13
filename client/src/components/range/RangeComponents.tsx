import React, { useEffect, useState } from "react";
import { ClickButton, DisplayStars } from "../../components";
import "./rangeComponents.scss";
import CheckButton from "../buttons/checkButton/CheckButton";
import Slider from "react-slider";
import { Shekel } from "../../assets/icons";


export const PriceComponent: React.FC <{values:[number, number],setValues:(newValues: [number, number])=>void}>= ({setValues,values}) => {
  

  return (
    <div className="range-container">
      <div className="slider-range">
        <div className="slider-title">
          <p>Price Range Selected</p>
          <div className="range-price">
            <div className="icon"> <Shekel stroke="black"/> </div> <p>12 -</p> <div className="icon"> <Shekel stroke="black"/></div> <p>357</p> 
            </div>
        </div>
        <div className="slider-container">
          <Slider
            thumbClassName="thumb-style" trackClassName="track-style" className={`slider ${values[0] > 12 && 'left-thumb'}  ${values[1] < 357 && 'right-thumb'}`} value={values} onChange={setValues} min={12} minDistance={50} max={357}
            renderThumb={(props, state) => (
              <div {...props}>
                <div>
                  <span className="text-thumb"> <div className="shekel-icon"> <Shekel stroke="black"/> </div> {state.valueNow} </span>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};
export const DistanceComponent: React.FC = () => {
  return <div className="range-container"></div>;
};

interface RatingProps {
  changeRate: (rateArr: number[]) => void;
  rateArr: number[];
}
export const RatingComponent: React.FC<RatingProps> = ({
  rateArr,
  changeRate,
}) => {
  const addRate = (chosenRate: number) => {
    if (!rateArr.includes(chosenRate)) {
      changeRate([...rateArr, chosenRate]);
    }
  };
  const onClickRate = (rate: number) => () =>
    rateArr.includes(rate) ? removeRate(rate) : addRate(rate);
  const removeRate = (chosenRate: number) => {
    const index = rateArr.indexOf(chosenRate);
    if (index != -1) changeRate(rateArr.filter((item, i) => i != index));
  };
  return (
    <>
      <div className="range-container">
        <div className="rating-container">
          <p className="rating-title">Rating</p>
          <div className="check-star-range" onClick={onClickRate(1)}>
            <div> <CheckButton checked={rateArr.includes(1)} /> </div>
            <div className="star-list"> <DisplayStars rate={1} /> </div>
          </div>
          <div className="check-star-range" onClick={onClickRate(2)}>
            <div> <CheckButton checked={rateArr.includes(2)} /> </div>
            <div className="star-list"> <DisplayStars rate={2} /> </div>
          </div>
          <div className="check-star-range" onClick={onClickRate(3)}>
            <div> <CheckButton checked={rateArr.includes(3)} /> </div>
            <div className="star-list"> <DisplayStars rate={3} /> </div>
          </div>
          <div className="check-star-range" onClick={onClickRate(4)}>
            <div> <CheckButton checked={rateArr.includes(4)} /> </div>
            <div className="star-list"> <DisplayStars rate={4} /> </div>
          </div>
          <div className="check-star-range" onClick={onClickRate(5)}>
            <div> <CheckButton checked={rateArr.includes(5)} /> </div>
            <div className="star-list"> <DisplayStars rate={5} /> </div>
          </div>
          <ClickButton width="112px" height="30px">
            <div onClick={() => changeRate([])} className="clear-btn"> clear </div>
          </ClickButton>
        </div>
      </div>
    </>
  );
};
