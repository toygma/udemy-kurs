import { formatDate } from "@/shared/utils/helper";
import { useDoctorRequest } from "./hooks/useDoctorRequest";
import type { Doctor } from "./types/admin.types";
import Modal from "@/shared/ui/Modal";

const DoctorRequestTable = () => {
  const {
    handleConfirm,
    request,
    openModal,
    closeModal,
    selectedDoctor,
    modalAction,
    isApproving,
    isRejected,
  } = useDoctorRequest();

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mt-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Bekleyen Doktor Başvuruları
        </h2>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          {request?.count || 0} Başvuru
        </span>
      </div>

      {request?.count === 0 ? (
        <div className="text-center py-10 text-gray-500 bg-gray-50 rounded border border-dashed">
          Şu an onay bekleyen doktor bulunmuyor.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left uppercase bg-gray-50">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Doktor Adı</th>
                <th className="px-6 py-3">Uzmanlık</th>
                <th className="px-6 py-3">Başvuru Tarihi</th>
                <th className="px-6 py-3 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {request?.data?.map((doctor: Doctor) => (
                <tr
                  key={doctor._id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {doctor.name}
                    <div className="text-xs text-gray-400 font-normal">
                      {doctor.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">{doctor.speciality}</td>
                  <td className="px-6 py-4">{formatDate(doctor.createdAt)}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => openModal(doctor, "approve")}
                      className="px-3 py-1.5 text-xs font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
                    >
                      Onayla
                    </button>
                    <button
                      onClick={() => openModal(doctor, "reject")}
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
      {selectedDoctor && modalAction && (
        <Modal
          title={
            modalAction === "approve"
              ? `${selectedDoctor.name} adlı doktoru onaylamak istiyor musunuz?`
              : `${selectedDoctor.name} adlı doktoru reddetmek istiyor musunuz?`
          }
          paragraph={
            modalAction === "approve"
              ? "Onaylandığında doktor hesabı aktif olacak"
              : "Reddedildiğinde başvuru sahibi bilgilendirilecektir"
          }
          onCancel={closeModal}
          onConfirm={handleConfirm}
          loading={isApproving || isRejected}
        />
      )}
    </div>
  );
};

export default DoctorRequestTable;
