import Sidebar from "@/features/admin/_components/Sidebar"
import { Outlet } from "react-router"

const AdminLayout = () => {
  return (
    <div className="min-h-screen w-full ">
      <div className="flex gap-4">
        <div className="">
          <Sidebar/>
        </div>
        <div className="flex-1 min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout