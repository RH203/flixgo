import propTypes from "prop-types";
import { Link } from "react-router-dom";

const Buttons = ({ title, style, link }) => {
  return (
    <Link className={` cursor-pointer ${style}`} to={link}>
      {title}
    </Link>
  );
};

Buttons.propTypes = {
  title: propTypes.string,
  style: propTypes.string,
  link: propTypes.string
};

export default Buttons;
