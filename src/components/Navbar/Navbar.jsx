import {useState, useRef, useEffect} from "react";
import propTypes from "prop-types";
import {Link} from "react-router-dom";
import {FaSearch} from "react-icons/fa";
import {MdFavoriteBorder} from "react-icons/md";
import {useSelector} from "react-redux";
import {Buttons} from "../index.js";

// Profile Dropdown
const ProfileDropDown = (props) => {
  const [state, setState] = useState(false);
  const profileRef = useRef();

  const navigation = [{title: "Dashboard", path: ""}, {title: "Settings", path: ""}, {title: "Log out", path: ""},];

  useEffect(() => {
    const handleDropDown = (e) => {
      if (!profileRef.current.contains(e.target)) setState(false);
    };
    document.addEventListener("click", handleDropDown);
  }, []);

  return (<div className={`relative ${props.class} font-poppins`}>
    <div className="flex items-center space-x-4">
      <button
        ref={profileRef}
        className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 ring-2 lg:focus:ring-indigo-600"
        onClick={() => setState(!state)}
      >
        <img
          src="https://randomuser.me/api/portraits/men/46.jpg"
          className="w-full h-full rounded-full"
        />
      </button>
      <div className="lg:hidden">
        <span className="block">Micheal John</span>
        <span className="block text-sm text-gray-500">john@gmail.com</span>
      </div>
    </div>
    <ul
      className={`bg-primary top-12 right-0 mt-5 space-y-5 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${state ? "" : "lg:hidden"}`}
    >
      {navigation.map((item, idx) => (<li key={idx}>
        <a
          key={idx}
          className="block text-gray-600 lg:hover:bg-gray-50 lg:p-2.5"
          href={item.path}
        >
          {item.title}
        </a>
      </li>))}
    </ul>
  </div>);
};

ProfileDropDown.propTypes = {
  class: propTypes.string
};

const Navbar = () => {
  const favorite = useSelector((state) => state.cart.total)
  const data = useSelector((state) => state.cart.data)
  const [menuState, setMenuState] = useState(false);

  // Replace  path with your path
  const navigation = [{title: "Customers", path: ""}, {title: "Careers", path: ""}, {
    title: "Guides",
    path: ""
  }, {title: "Partners", path: ""},];

  return (<nav className="bg-primary border-b shadow-md font-poppins">
    <div className="flex items-center space-x-8 py-3 px-4 max-w-screen-xl mx-auto md:px-8">
      <div className="flex-none lg:flex-initial">
        <Link href="/">
          <p className="text-indigo-400 text-2xl font-semibold">FlixGo</p>
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-between">
        <div
          className={`bg-primary absolute z-20 w-full top-16 left-0 p-4 border-b lg:static lg:block lg:border-none ${menuState ? "" : "hidden"}`}
        >
          <ul className="mt-12 space-y-5 lg:flex lg:space-x-6 lg:space-y-0 lg:mt-0">
            {navigation.map((item, idx) => (<li key={idx} className="text-gray-600 hover:text-gray-900">
              <a href={item.path}>{item.title}</a>
            </li>))}
          </ul>
          <ProfileDropDown class="mt-5 pt-5 border-t lg:hidden"/>
        </div>
        <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-6">
          <Link to={"search"}>
            <FaSearch size={20} className={"text-gray-600"}/>
          </Link>
          <details className="dropdown">
            <summary className="btn m-1 indicator">
              {favorite > 0 && (<span className="indicator-item badge bg-indigo-600 text-white">{favorite}</span>)}
              <MdFavoriteBorder size={25} className={"text-gray-600"}/>
            </summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              {data.map((item) => (
                <li key={item.id} className={"p-2"}>{item.title}</li>
              ))}
              <li>
                <Buttons
                  title={"See more"}
                  link={"favorite"}
                  style={"bg-white hover:bg-white border-0 text-blue-600"}
                />
              </li>
            </ul>
          </details>

          <ProfileDropDown class="hidden lg:block"/>
          <button
            className="outline-none text-gray-400 block lg:hidden"
            onClick={() => setMenuState(!menuState)}
          >
            {menuState ? (<svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>) : (<svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>)}
          </button>
        </div>
      </div>
    </div>
  </nav>);
};

export default Navbar;
