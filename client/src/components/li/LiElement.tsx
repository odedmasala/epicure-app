import { ArrowDown } from "../../assets/icons";
import "./liElement.scss";
const LiElement: React.FC<{ title: string }> = ({ title }) => {
  return (
    <li className="range-option">
      <p>{title}</p>
      <div className="arrow-down">
        <ArrowDown />
      </div>
    </li>
  );
};

export default LiElement;
