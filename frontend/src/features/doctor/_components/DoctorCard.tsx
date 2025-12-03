import type { Doctor, IDoctorCardProps } from "../types/doctorTypes";
import { Link } from "react-router";
import { Circle, User } from "lucide-react";
import { generateSlugify } from "@/shared/utils/helper";

const DoctorCard = ({ filteredDoctors }: IDoctorCardProps) => {
  return (
    <main className="flex-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDoctors?.data?.map((doctor: Doctor) => (
          <Link
            to={`/detay/doktor/${generateSlugify(doctor.name)}/${doctor._id}`}
            className="group"
          >
            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg overflow-hidden h-full flex flex-col">
              <div className="relative">
                  <img
                    src={doctor.image.url}
                    alt={doctor.name}
                    title={doctor.name}
                    loading="lazy"
                    className="w-full h-52 object-cover"
                  />
                <div
                  className={`absolute top-4 right-4  px-3  py-1 rounded-full text-xs font-semibold flex items-center gap-2 ${
                    doctor.available
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  <Circle
                    className={`w-2 h-2 ${
                      doctor.available ? "fill-green-500" : "fill-red-500"
                    }`}
                  />
                  {doctor.available ? "Müsait" : "Meşgul"}
                </div>
              </div>
              <div className="p-4 sm:p-5 flex-1 flex flex-col">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 truncate">
                  {doctor?.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {doctor.speciality}
                </p>
                <div
                  className={`w-full mt-auto text-center py-3 px-4 rounded-lg font-semibold text-sm sm:text-base ${
                    doctor.available
                      ? "bg-linear-to-r from-blue-500 to-indigo-600 text-white group-hover:from-blue-600 group-hover:to-indigo-700"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {doctor.available ? "Randevu alın" : "Müsait değil"}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* NO DOCTOR FOUND */}
      {filteredDoctors?.count === 0 && (
        <div className="text-center text-gray-500 mt-20 py-10">
          <User className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-medium">Doktor Bulunamadı.</p>
          <p className="text-sm">Başka bir uzmanlık alanı seçiniz.</p>
        </div>
      )}
    </main>
  );
};

export default DoctorCard;
