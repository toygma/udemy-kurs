import type { UserProfile } from "../types/profileTypes";

export const userData:UserProfile = {
  _id: "1",
  name: "Ahmet Yılmaz",
  email: "ahmet.yilmaz@example.com",
  phone: "+90 422 123 45 67",
  gender: "Erkek",
  address: {
    street: "Atatürk Caddesi No:12",
    city: "İstanbul",
    zipCode: "34000",
    country: "Türkiye",
  },
};
