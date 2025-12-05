import { useState } from "react";
import { useDoctorPanel } from "./hooks/useDoctorPanel";
import type { FilterStatus, IAppointment } from "./types/doctorPanelTypes";
import { useDebounce } from "use-debounce";
import StatsCard from "./_components/StatsCard";
import { Calendar } from "lucide-react";
import FilterSearch from "./_components/FilterSearch";
import AppointmentRow from "./_components/AppointmentRow";
import Loading from "../Loading";

const Dashboard = () => {
  const {
    appointments,
    deleteAppointmentStatus,
    updateAppointmentStatus,
    isLoading,
  } = useDoctorPanel();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("hepsi");

  const [debounceSearch] = useDebounce(searchTerm, 500);

  if (isLoading) {
    return <Loading />;
  }

  const filteredAppointments = appointments.filter((apt:IAppointment) => {
    const matchesStatus =
    filterStatus === "hepsi" || apt.status === filterStatus;

    const matchesSearch = apt.patient?.name
      .toLowerCase()
      .includes(debounceSearch.toLowerCase());

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: appointments.length,
    pending: appointments.filter((a:IAppointment) => a.status === "pending").length,
    confirmed: appointments.filter((a:IAppointment) => a.status === "confirmed").length,
    cancel: appointments.filter((a:IAppointment) => a.status === "cancelled").length,
  };

  const getEmptyMessage = () => {
    if (
      appointments.length === 0 &&
      searchTerm === "" &&
      filterStatus !== "hepsi"
    ) {
      return "Henüz Randevu yok";
    }

    if (searchTerm !== "" || filterStatus !== "hepsi") {
      return "seçilen filtreye göre bir arama bulunamadı.";
    }

    return "Henüz Randevu yok";
  };

  const emptyMessage = getEmptyMessage();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Doktor Panel</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatsCard
          label="Hepsi"
          value={stats.total}
          icon={<Calendar size={32} />}
          variant="pending"
        />
        <StatsCard
          label="Bekleniyor"
          value={stats.pending}
          icon={<Calendar size={32} />}
          variant="total"
        />
        <StatsCard
          label="Tamamlandı"
          value={stats.confirmed}
          icon={<Calendar size={32} />}
          variant="confirmed"
        />
        <StatsCard
          label="İptal"
          value={stats.cancel}
          icon={<Calendar size={32} />}
          variant="cancel"
        />
      </div>

      <FilterSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-linear-to-r from-blue-600 to-indigo-600 text-white">
            <tr>
              <th className="px-6 py-4 text-left">Hasta</th>
              <th className="px-6 py-4 text-left">Tarih</th>
              <th className="px-6 py-4 text-left">Durum</th>
              <th className="px-6 py-4 text-center w-70">Eylem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAppointments.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-gray-500">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              filteredAppointments?.map((apt: IAppointment) => (
                <AppointmentRow
                  key={apt._id}
                  appointment={apt}
                  onUpdate={updateAppointmentStatus}
                  onDelete={deleteAppointmentStatus}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
