import { Search } from "../../assets/icons";
import "./inputSearch.scss";
const InputSearch: React.FC<{ mobileNav?: boolean }> = ({ mobileNav }) => {
  return (
    <>
      <div
        className={
          mobileNav ? "input-container input-nav-container" : "input-container"
        }
      >
        <Search className="search-button" />
        <input
          placeholder="Search for restaurant cuisine, chef"
          type="text"
        ></input>
      </div>
    </>
  );
};

export default InputSearch;
