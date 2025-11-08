import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="bg-linear-to-b from-gray-900 via-gray-900 to-black text-gray-300">
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Bültenimize Abone ol.
              </h3>
              <p className="text-gray-400 text-sm">
                En son güncellemeleri ve haberleri e-posta kutunuza alın.
              </p>
            </div>
            <div className="w-full sm:w-auto flex gap-2">
              <input
                type="email"
                placeholder="E-postanızı girin"
                className="flex-1 sm:flex-none px-4 py-3 rounded-lg bg-gray-800 border boder-gray-700 text-white placeholder-gray-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 whitespace-nowrap">
                Abone Ol <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ANA FOOTER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* ŞİRKET BİLGİLERİ */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-white mb-4">MERN-Health</h2>
            <p className="text-gray-400 text-sm mb-6">
              Hastaları en iyi doktorlarla buluşturan güvenilir sağlık randevu
              platformumuz.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
          {/* HIZLI LİNKLER */}
          <div>
            <h4 className="text-white font-semibold mb-6">Hızlı Linkler</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to={"/"}
                  className="text-gray-4400 hover:text-white transition"
                >
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link
                  to={"/doktorlar"}
                  className="text-gray-4400 hover:text-white transition"
                >
                  Doktorlar
                </Link>
              </li>
              <li>
                <Link
                  to={"/hakkımızda"}
                  className="text-gray-4400 hover:text-white transition"
                >
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link
                  to={"/ozellikler"}
                  className="text-gray-4400 hover:text-white transition"
                >
                  Özellikler
                </Link>
              </li>
            </ul>
          </div>
          {/* Hizmetler */}
          <div>
            <h4 className="text-white font-semibold mb-6">Hizmetler</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to={"/"}
                  className="text-gray-4400 hover:text-white transition"
                >
                  Randevu Al.
                </Link>
              </li>
              <li>
                <Link
                  to={"/"}
                  className="text-gray-4400 hover:text-white transition"
                >
                  Online Görüşme
                </Link>
              </li>
              <li>
                <Link
                  to={"/"}
                  className="text-gray-4400 hover:text-white transition"
                >
                  Sağlık Kaydı
                </Link>
              </li>
              <li>
                <Link
                  to={"/"}
                  className="text-gray-4400 hover:text-white transition"
                >
                  Genel Kontrol
                </Link>
              </li>
            </ul>
          </div>
          {/* Hukuki */}
          <div>
            <h4 className="text-white font-semibold mb-6">Hukuki</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to={"/"}
                  className="text-gray-4400 hover:text-white transition"
                >
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link
                  to={"/"}
                  className="text-gray-4400 hover:text-white transition"
                >
                  Kullanım Şartları
                </Link>
              </li>
              <li>
                <Link
                  to={"/"}
                  className="text-gray-4400 hover:text-white transition"
                >
                  Çerez Politikası
                </Link>
              </li>
              <li>
                <Link
                  to={"/"}
                  className="text-gray-4400 hover:text-white transition"
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </div>
          {/* İletişim */}
          <div className="">
            <h4 className="text-white font-semibold mb-6">İletişim</h4>
            <div className="space-y-4">
              <a
                href="tel:+90544548454"
                className="flex items-start gap-3 text-gray-400 group transition "
              >
                <Phone className="w-5 h-5  group-hover:text-blue-500 " />
                <span className="text-sm group-hover:text-white">
                  +90 544 548 45 454
                </span>
              </a>
              <a
                href="mailto:info@mernhealt.com"
                className="flex items-start gap-3 text-gray-400 group transition "
              >
                <Mail className="w-5 h-5  group-hover:text-blue-500 " />
                <span className="text-sm group-hover:text-white">
                  info@mernhealt.com
                </span>
              </a>
              <div className="flex item-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-blue-500" />
                <span className="text-sm">İstanbul, Türkiye</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ALT KISIM */}
      <div className="border-t border-gray-800 pt-8 p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © 2025 MERN-Health. Tüm Hakları Saklıdır.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link to="/sitemap" className="hover:text-white transition">
              Site Haritası
            </Link>
             <Link to="/sitemap" className="hover:text-white transition">
              Güvenlik
            </Link>
             <Link to="/sitemap" className="hover:text-white transition">
              Erişilebilirlik.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
