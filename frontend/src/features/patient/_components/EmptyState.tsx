// _components/EmptyState.tsx

import { Calendar } from "lucide-react";


const EmptyState = () => {
  return (
    <div className="text-center py-16 bg-white rounded-2xl shadow-md">
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
          <Calendar className="w-12 h-12 text-gray-400" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Randevu Bulunamadı
      </h3>
      <p className="text-gray-500 mb-1">
        Henüz planlanmış bir randevunuz yok.
      </p>
      <p className="text-gray-400 text-sm">
      Başlamak için ilk randevunuzu alın
      </p>
    </div>
  );
};

export default EmptyState;