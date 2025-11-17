import { Filter, Search } from "lucide-react";
import type { FilterStatus } from "../types/doctorPanelTypes";

const FilterBar = ({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
}: {
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  filterStatus: FilterStatus;
  setFilterStatus: (s: FilterStatus) => void;
}) => (
  <div className="bg-white rounded-xl shadow-lg p-6 mb-6 flex flex-col md:flex-row gap-4">
    <div className="flex-1 relative">
      <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
      <input
        type="text"
        placeholder="Ara..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none"
      />
    </div>
    <div className="flex items-center gap-2">
      <Filter size={20} className="text-gray-600" />
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
        className="px-4 py-2 border rounded-lg outline-none"
      >
        <option value="hepsi">Hepsi</option>
        <option value="bekleniyor">Bekleniyor</option>
        <option value="tamamlandı">Tamamlandı</option>
        <option value="iptal">İptal</option>
      </select>
    </div>
  </div>
);

export default FilterBar;