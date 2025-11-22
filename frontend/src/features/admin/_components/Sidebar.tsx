import { Link, useLocation } from "react-router";
import {
  Home,
  UserPlus,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  Check,
  Edit2,
} from "lucide-react";
import { useState } from "react";
import { User } from "@/core/images";

const data = [
  {
    id: 1,
    title: "Ana Sayfa",
    path: "/admin/panel",
    icon: <Home size={20} />,
  },
  {
    id: 2,
    title: "Doktor Ekle",
    path: "/admin/panel/doktor-ekle",
    icon: <UserPlus size={20} />,
  },
  {
    id: 3,
    title: "Doktor Onayla",
    path: "/admin/panel/doktor-onayla",
    icon: <Check size={20} />,
  },
  {
    id: 4,
    title: "Kullanıcı Düzenle",
    path: "/admin/panel/kullanici-ayarlari",
    icon: <Edit2 size={20} />,
  },
];

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = () => {};

  return (
    <div
      className={`bg-linear-to-b from-slate-50 to-white border-r border-slate-200 h-full flex flex-col transition-all duration-300 shadow-sm ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white/50 backdrop-blur-sm">
        {isOpen && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <h1 className="text-xl font-bold bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Admin Panel
            </h1>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2 hover:bg-slate-100 rounded-lg transition-all duration-200 cursor-pointer group ${
            !isOpen && "mx-auto"
          }`}
        >
          {isOpen ? (
            <X
              size={20}
              className="text-slate-600 group-hover:text-slate-900"
            />
          ) : (
            <Menu
              size={20}
              className="text-slate-600 group-hover:text-slate-900"
            />
          )}
        </button>
      </div>

      {/* Menü */}
      <nav className="px-3 space-y-1 flex-1 py-4 overflow-y-auto">
        {data.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div key={item.id} title={!isOpen ? item.title : ""}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                  isActive
                    ? "bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-200"
                    : "text-slate-700 hover:bg-slate-100"
                } ${!isOpen && "justify-center"}`}
              >
                <span
                  className={`transition-transform duration-200 ${
                    isActive ? "scale-110" : "group-hover:scale-110"
                  }`}
                >
                  {item.icon}
                </span>
                {isOpen && (
                  <span
                    className={`font-medium ${isActive ? "font-semibold" : ""}`}
                  >
                    {item.title}
                  </span>
                )}
                {isActive && isOpen && (
                  <div className="absolute right-3 w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                )}
              </Link>
            </div>
          );
        })}
      </nav>

      {/* Profil ve Logout */}
      <div className="p-4 border-t border-slate-200 bg-white/50 backdrop-blur-sm space-y-3">
        {/* Profil */}
        <div
          className={`flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 transition-all duration-200 ${
            !isOpen && "justify-center"
          }`}
        >
          <div className="relative">
            <img
              src={User}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-200"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          </div>
          {isOpen && (
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">Admin</p>
              <p className="text-xs text-slate-500">Çevrimiçi</p>
            </div>
          )}
        </div>

        {/* Butonlar */}
        <div className={`space-y-2 ${!isOpen && "flex flex-col items-center"}`}>
          <Link
            to={"/"}
            className={`flex items-center gap-2 px-4 py-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium cursor-pointer group ${
              !isOpen && "justify-center w-full"
            }`}
            title={!isOpen ? "Ana Sayfa" : ""}
          >
            <LayoutDashboard
              size={18}
              className="group-hover:scale-110 transition-transform"
            />
            {isOpen && "Ana Sayfa"}
          </Link>

          <button
            onClick={handleLogout}
            className={`flex items-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 font-medium cursor-pointer group w-full ${
              !isOpen && "justify-center"
            }`}
            title={!isOpen ? "Çıkış Yap" : ""}
          >
            <LogOut
              size={18}
              className="group-hover:scale-110 transition-transform"
            />
            {isOpen && "Çıkış Yap"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;