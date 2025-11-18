import { useState } from 'react';
import type { DoctorRequest } from './types/adminTypes';
import { MOCK_DOCTOR_REQUESTS } from './constants/adminConstants';

const DoctorRequests = () => {
  const [requests, setRequests] = useState<DoctorRequest[]>(MOCK_DOCTOR_REQUESTS);

  const handleApprove = (id: number) => {
    if (confirm("Doktoru onaylamak istediğinize emin misiniz?")) {
      
      const updatedList = requests.filter((doctor) => doctor.id !== id);
      setRequests(updatedList);
      
      alert("Doktor başarıyla onaylandı ve panele eklendi!");
    }
  };

  const handleReject = (id: number) => {
    if (confirm("Başvuruyu reddetmek istediğinize emin misiniz?")) {
      const updatedList = requests.filter((doctor) => doctor.id !== id);
      setRequests(updatedList);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mt-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Bekleyen Doktor Başvuruları</h2>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          {requests.length} Başvuru
        </span>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-10 text-gray-500 bg-gray-50 rounded border border-dashed">
          Şu an onay bekleyen doktor bulunmuyor.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Doktor Adı</th>
                <th className="px-6 py-3">Uzmanlık</th>
                <th className="px-6 py-3">Başvuru Tarihi</th>
                <th className="px-6 py-3 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((doctor) => (
                <tr key={doctor.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {doctor.fullName}
                    <div className="text-xs text-gray-400 font-normal">{doctor.email}</div>
                  </td>
                  <td className="px-6 py-4">{doctor.specialization}</td>
                  <td className="px-6 py-4">{doctor.requestDate}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleApprove(doctor.id)}
                      className="px-3 py-1.5 text-xs font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
                    >
                      Onayla
                    </button>
                    <button
                      onClick={() => handleReject(doctor.id)}
                      className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 border border-red-200 transition-colors"
                    >
                      Reddet
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DoctorRequests;