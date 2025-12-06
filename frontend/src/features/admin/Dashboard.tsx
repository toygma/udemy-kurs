import {
  Calendar,
  Clock,
  MessageSquare,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";

import moment from "moment";
import StatsCard from "./_components/StatsCard";
import { useGetAnalyticsDataQuery } from "@/store/api/admin-api";

const Dashboard = () => {
  const { data } = useGetAnalyticsDataQuery(null);
  console.log("🚀 ~ Dashboard ~ data:", data);

  return (
    <div className="min-h-screen p-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Admin Kontrol Paneli
          </h1>
          <p className="text-gray-500 mt-2">
            Sistem genel bakışı ve istatistikleri
          </p>
        </div>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={<UserCheck size={32} />}
            title="Toplam Doktor"
            value={data?.stats?.totalDoctors}
            color="border-blue-500"
          />
          <StatsCard
            icon={<Users size={32} />}
            title="Toplam Hasta"
            value={data?.stats?.totalPatients}
            color="border-green-500"
          />
          <StatsCard
            icon={<MessageSquare size={32} />}
            title="Toplam Yorum"
            value={data?.stats?.totalReviews}
            color="border-purple-500"
          />
          <StatsCard
            icon={<Calendar size={32} />}
            title="Toplam Randevu"
            value={data?.stats?.totalAppointments}
            color="border-orange-500"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-800">
                Doktorlara Göre Randevular
              </h2>
            </div>
            <div className="space-y-3">
              {data?.appointmentByDoctor?.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 "
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{item.doctor.name}</p>
                    <p className="text-sm text-gray-500">{item.doctor.speciality}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {item.totalAppointments} randevu
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* YENİ RANDEVULAR */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-orange-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-800">
                Yeni Randevular
              </h2>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {data?.recentThreeAppointments?.length > 0 ? (
                data?.recentThreeAppointments?.map((apt: any) => (
                  <div
                    key={apt._id}
                    className="p-3 bg-orange-50 rounded-lg border border-orange-200 hover:border-orange-300 transition"
                  >
                    <p className="font-semibold text-gray-800 text-sm">
                      {apt.patient?.name}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {apt.doctor?.name}
                    </p>
                    <p className="text-xs text-orange-600 font-medium mt-2">
                      {moment(apt.createdAt).format("L")} • {apt.timeSlot}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  Yaklaşan randevu bulunmuyor.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* TÜM RANDEVULAR */}

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Tüm Randevular
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Doktor
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Hasta
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Tarih
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Saat
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Durum
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.allRecentAppointments?.map((apt: any) => (
                  <tr key={apt._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {apt.doctor?.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {apt.patient?.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {moment(apt?.createdAt).format("L")}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {apt.timeSlot}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          apt.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : apt.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {apt.status === "confirmed"
                          ? "Tamamlandı"
                          : apt.status === "rejected"
                          ? "İptal"
                          : "Bekleniyor"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
