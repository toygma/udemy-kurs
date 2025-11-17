import { Outlet } from "react-router";
import Header from "./header/Header";

const DoctorLayout = () => {
  return (
  <div className="min-h-screen w-full ">
      <div className="flex flex-col">
        <div className="h-12">
          <Header />
        </div>
        <div className="grow min-h-screen mt-20 w-full max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DoctorLayout;
