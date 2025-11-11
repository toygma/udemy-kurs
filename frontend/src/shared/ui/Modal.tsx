import Button from "./Button";

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  paragraph: string;
  loading?: boolean; // yeni prop
}

const Modal = ({
  onConfirm,
  onCancel,
  title,
  paragraph,
  loading = false,
}: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50"></div>

      {/* Modal Content */}
      <div className="bg-white max-w-md w-full mx-4 rounded-xl shadow-lg z-10 p-6 space-y-4">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-gray-500">{paragraph}</p>

        <div className="flex justify-end gap-3 mt-4">
          <Button type="button" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>

          <Button className={`${loading ? "bg-gray-200 border-none cursor-not-allowed":""}`} type="button" onClick={onConfirm} disabled={loading}>
            {loading ? "Deleting..." : "Confirm"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
