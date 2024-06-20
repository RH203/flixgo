import { Footer, Navbar } from "../components";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main className="w-10/12 mx-auto my-20 font-poppins">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
