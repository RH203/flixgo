import { Link } from "react-router-dom";

const Buttons = ({ title, style, link }) => {
  return (
    <Link className={` cursor-pointer ${style}`} to={link}>
      {title}
    </Link>
  );
};

export default Buttons;
