import { Outlet } from "react-router"
import Header from "./header/Header"

const DoctorLayout = () => {
  return (
    <div className="min-h-screen w-full ">
      <div className="flex flex-col">
        <div className="h-12">
          <Header />
        </div>
        <div className="grow mt-32 min-h-screen  w-full max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DoctorLayout