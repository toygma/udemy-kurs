import { Outlet } from "react-router";
import Header from "./header/Header";
import Footer from "./footer/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen w-full ">
      <div className="flex flex-col">
        <div className="h-12">
          <Header />
        </div>
        <div className="grow min-h-screen mt-20 w-full max-w-7xl mx-auto">
          <Outlet />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
