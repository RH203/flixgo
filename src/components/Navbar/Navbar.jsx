import {useState, useRef, useEffect} from "react";
import propTypes from "prop-types";
import {Link, useNavigate} from "react-router-dom";
import {FaSearch} from "react-icons/fa";
import {MdFavoriteBorder} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import {Buttons} from "../index.js";
import {setDataDetail} from "../../redux/slice/detailSlice.js";
import {CgProfile} from "react-icons/cg";

// Profile Dropdown
const ProfileDropDown = (props) => {
  const [state, setState] = useState(false);
  const [user, setUser] = useState({});
  const profileRef = useRef();

  const navigation = [
    {title: "Dashboard", path: ""},
    {title: "Settings", path: ""},
    {title: "Log out", path: ""},
  ];

  useEffect(() => {
    const handleDropDown = (e) => {
      if (!profileRef.current.contains(e.target)) setState(false);
    };
    document.addEventListener("click", handleDropDown);

    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

  }, []);

  return (
    <div ref={profileRef} className={`relative ${props.class} font-poppins`}>
      {Object.keys(user).length > 0 ? (
        <details className="dropdown dropdown-end">
          <summary className="btn m-1">
            <CgProfile size={25}/>
          </summary>

          <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            {navigation.map((item, index) => (
              <li key={index}>
                <Link to={item.path}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </details>
      ) : (
        <Link to={"/login"} className={"btn w-36"}>
          Sign in
        </Link>
      )}
    </div>
  )
};

ProfileDropDown.propTypes = {
  class: propTypes.string
};

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorite = useSelector((state) => state.cart.total)
  const data = useSelector((state) => state.cart.data)
  const [menuState, setMenuState] = useState(false);

  // Replace  path with your path
  const navigation = [
    {title: "Customers", path: ""},
    {title: "Careers", path: ""},
    {title: "Guides", path: ""},
    {title: "Partners", path: ""},
  ];

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
        <div className="flex-1 flex items-center justify-end ">
          <Link to={"search"} className={"btn"}>
            <FaSearch size={20} className={"text-gray-600"}/>
          </Link>
          <details className="dropdown">
            <summary className="btn m-1 indicator">
              {favorite > 0 && (<span className="indicator-item badge bg-indigo-600 text-white">{favorite}</span>)}

              <MdFavoriteBorder size={25} className={"text-gray-600"}/>
            </summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-56 p-2 shadow">
              {data.map((item) => (
                <li key={item.id} className={"p-2"}>
                  <div onClick={() => {
                    dispatch(setDataDetail(item))
                    navigate(`/detail-movie/${item.id}`)
                  }}>
                    {item.title || item.name}
                  </div>
                </li>
              ))}
              {favorite === 0 && (
                <li>
                  <p>Empty favorites</p>
                </li>
              )}
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
