import { AlertCircle, Calendar, CheckCircle } from "lucide-react";
import StatsCard from "./_components/StatsCard";
import FilterBar from "./_components/FilterSearch";
import { useDoctorPanel } from "./hooks/useDoctorPanel";
import { useState } from "react";
import type { FilterStatus, IAppointment } from "./types/doctorPanelTypes";
import AppointmentRow from "./_components/AppointmentRow";
import { useDebounce } from "use-debounce";

const Dashboard = () => {
  const { appointments, updateAppointmentStatus, deleteAppointmentStatus } =
    useDoctorPanel();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("hepsi");
  const [debouncedSearch] = useDebounce(searchTerm, 500);


  const filteredAppointments = appointments.filter((apt) => {
    const matchesStatus =
      filterStatus === "hepsi" || apt.status === filterStatus;

    const matchesSearch = apt.user.name
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === "bekleniyor").length,
    confirmed: appointments.filter((a) => a.status === "tamamlandı").length,
  };

  return (
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Doktor Panel </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatsCard
            label="Hepsi"
            value={stats.total}
            icon={<Calendar size={32} />}
            variant="total"
          />
          <StatsCard
            label="Bekleniyor"
            value={stats.pending}
            icon={<AlertCircle size={32} />}
            variant="pending"
          />
          <StatsCard
            label="Tamamlandı"
            value={stats.confirmed}
            icon={<CheckCircle size={32} />}
            variant="confirmed"
          />
        </div>

        <FilterBar
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
                <th className="px-6 py-4 text-center">Eylem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-500">
                    <AlertCircle className="mx-auto mb-2" size={48} />
                    No appointments found
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((apt: IAppointment) => (
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
