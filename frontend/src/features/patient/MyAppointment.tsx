// MyAppointments.tsx

import AppointmentCard from "./_components/AppointmentCard";
import EmptyState from "./_components/EmptyState";
import { useLocalAppointments } from "./hooks/useAppointment";
import { mockAppointments } from "./constants/appointmentConstants";
import LayoutContainer from "@/shared/ui/LayoutContainer";

/**
 * Main appointments page (LOCAL VERSION - No Backend)
 * Patient can view, pay for, and cancel appointments
 * Data stored in component state
 */
const MyAppointments = () => {
  // Local appointment management
  const {
    appointments,
    loadingCheckoutId,
    loadingCancelId,
    handleCheckout,
    handleCancel,
  } = useLocalAppointments(mockAppointments);

  return (
    <div className="min-h-screen p-8 ">
      <LayoutContainer>
        {/* Page Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Randevularım
          </h2>
          <p className="text-gray-500 text-lg">
           Yaklaşan tıbbi randevularınızı yönetin
          </p>
        </div>

        {/* Appointments List */}
        <div className="space-y-6">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <AppointmentCard
                key={appointment._id}
                appointment={appointment}
                onPayment={handleCheckout}
                onCancel={handleCancel}
                isPaymentLoading={loadingCheckoutId === appointment._id}
                isCancelLoading={loadingCancelId === appointment._id}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      </LayoutContainer>
    </div>
  );
};

export default MyAppointments;