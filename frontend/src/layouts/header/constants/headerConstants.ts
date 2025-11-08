import type { headerData } from "../types/headerTypes";

export const menuData: headerData[] = [
  {
    id: 1,
    title: "Hakkımızda",
    href: "/hakkımızda",
    dropdown: [
      { name: "Departmanlar", link: "/departmanlar" },
      { name: "Fiyatlar", link: "/fiyatlar" },
      { name: "Kariyer", link: "/kariyer" },
      { name: "SSS", link: "/siksorulansorular" },
      { name: "Randevular", link: "/randevular" },
      { name: "Çalışma saatleri", link: "/calismasaatleri" },
      { name: "Departmanlar", link: "/departmanlar" },
    ],
  },
  {
    id: 2,
    title: "Doktorlar",
    href: "/doktorlar",
  },
  {
    id: 3,
    title: "Servisler",
    href: "/services",
    dropdown: [
      {
        name: "Tüm Servisler",
        link: "/servisler",
      },
      {
        name: "Servis Detayları",
        link: "/servis-detaylari",
      },
    ],
  },
];
