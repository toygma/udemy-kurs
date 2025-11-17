import LayoutContainer from "@/shared/ui/LayoutContainer";
import AppointmentCard from "./_components/AppointmentCard";
import { useAppointments } from "./hooks/useAppointment";
import EmptyState from "./_components/EmptyState";

const MyAppointments = () => {
  const { appointments, handleCancel, handleCheckout } = useAppointments();
  return (
    <div className="min-h-screen">
      <LayoutContainer>
        {/* HEADER */}

        <div className="space-y-6">
          {appointments.length > 0 ? (
            <>
              <div className="mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">
                  Randevularım
                </h2>
                <p className="text-gray-500 text-lg">
                  Yaklaşan randevularınızı yönetin.
                </p>
              </div>
              {appointments.map((apt) => (
                <AppointmentCard
                  key={apt._id}
                  appointment={apt}
                  onCancel={handleCancel}
                  onPayment={handleCheckout}
                />
              ))}
            </>
          ) : (
            <EmptyState />
          )}
        </div>
      </LayoutContainer>
    </div>
  );
};

export default MyAppointments;
