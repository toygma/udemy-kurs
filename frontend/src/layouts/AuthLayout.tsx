import { Login } from "@/core/images";
import { Outlet, useLocation } from "react-router";

const AuthLayout = () => {
  const location = useLocation();
  const signUp = location.pathname;
  const startWith = signUp.startsWith("/doktor/kayit");

  return (
    <div className="bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden min-h-screen">
      {/* Statik Arka Plan */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full opacity-10"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-400 rounded-full opacity-10"></div>
      </div>
      
      <div className="flex flex-col lg:flex-row items-center justify-between p-8 gap-4">
        {/* Sol Taraf - Form */}
        <div className="w-full z-10">
          <div
            className={
              startWith
                ? "mt-20"
                : "bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
            }
          >
            <Outlet />
          </div>
        </div>

        {/* Sağ Taraf - Görsel */}
        {!startWith && (
          <div className="w-full">
            <div className="relative max-w-2xl mx-auto">
              {/* Dekoratif Bloklar */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-linear-to-br from-blue-400 to-indigo-500 rounded-2xl rotate-12 opacity-20" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-linear-to-br from-purple-400 to-pink-500 rounded-3xl -rotate-12 opacity-20" />

              {/* İçerik Kartı */}
              <div className="relative bg-white/90 rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-200">
                {/* Başlık */}
                <div className="relative mb-12">
                  <span className="text-blue-600 font-semibold text-sm tracking-wider uppercase mb-2 block">
                    Sağlığınız Bizim Önceliğimiz
                  </span>

                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight mb-4">
                    Kendinizi ve Ailenizi
                    <br />
                    <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      Koruyun
                    </span>
                  </h2>

                  <p className="text-gray-600 text-lg">
                    Sağlığınızı kolay online randevu sistemi ile takip edin
                  </p>

                  <div className="absolute -top-4 -right-4 text-blue-500 text-2xl">
                    ✦
                  </div>
                  <div className="absolute top-8 -left-8 text-indigo-400 text-xl">
                    ✦
                  </div>
                </div>

                {/* Resim Konteyneri */}
                <div className=" mb-8">
                  <div className="relative bg-linear-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl overflow-hidden shadow-xl aspect-square max-w-md mx-auto">
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />

                    <img
                      src={Login}
                      alt="Sağlık Görseli"
                      className="w-full h-full object-cover opacity-80"
                      loading="lazy"
                    />

                    {/* Kart 1 */}
                    <div className="absolute top-6 left-4 bg-white rounded-2xl px-5 py-3 shadow-lg border border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-linear-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xl">✓</span>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium">
                            Toplam Doz
                          </p>
                          <p className="text-lg font-bold text-gray-800">
                            2.7M+
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Kart 2 */}
                    <div className="absolute bottom-6 right-6 bg-white rounded-2xl px-5 py-3 shadow-lg border border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-linear-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xl">✓</span>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium">
                            İyileşme Oranı
                          </p>
                          <p className="text-lg font-bold text-gray-800">98%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rozetler */}
                <div className="flex flex-wrap gap-3 justify-center">
                  <div className="bg-blue-50 border border-blue-200 rounded-full px-4 py-2 text-sm text-blue-700 font-medium">
                    🔒 Güvenli Platform
                  </div>
                  <div className="bg-indigo-50 border border-indigo-200 rounded-full px-4 py-2 text-sm text-indigo-700 font-medium">
                    ⚡ Hızlı Randevu
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-full px-4 py-2 text-sm text-purple-700 font-medium">
                    👨‍⚕️ Uzman Kadro
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
