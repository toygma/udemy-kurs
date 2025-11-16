import { useRef, useState } from "react";
import { Edit2Icon, Upload, X } from "lucide-react";
import toast from "react-hot-toast";

interface UploadImageProps {
  currentImage?: string;
  onImageChange: (base64Image: string) => void;
  maxSize?: number;
  isEdit?: boolean;
  className?: string;
}

const UploadImages = ({
  onImageChange,
  className,
  currentImage,
  isEdit = true,
  maxSize = 4 * 1024 * 1024,
}: UploadImageProps) => {
  const [previewImage, setPreviewImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];

    if (!file.type.startsWith("image/")) {
      toast.error("Lütfen resim dosyası seçiniz.");
      return;
    }

    if (file.size > maxSize) {
      const maxSizeMb = (maxSize / (1024 * 1024)).toFixed(0);
      toast.error(`Görüntü boyutu ${maxSizeMb} MB'den küçük olmalıdır. `);
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2 && typeof reader.result === "string") {
        setPreviewImage(reader.result);
        onImageChange(reader.result);
      }
    };

    reader.onerror = () => {
      toast.error("Resim yükleme işlemi başarısız.");
    };

    reader.readAsDataURL(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemove = () => {
    setPreviewImage("");
    onImageChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const displayImage = previewImage || currentImage;

  return (
    <div className={`relative ${className}`}>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        disabled={!isEdit}
        onChange={(e) => handleFileChange(e.target.files)}
        ref={fileInputRef}
      />

      {/* IMAGE CONTAINER */}
      <div className="relative h-32 w-32 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
        {displayImage ? (
          <>
            <img
              src={displayImage}
              alt="Upload Preview"
              className="w-full h-full object-cover"
            />

            {isEdit && previewImage && (
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-600"
              >
                <X size={16} />
              </button>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <Upload className="w-8 h-8 text-gray-400" />
          </div>
        )}
      </div>

      {isEdit && (
        <button type="button" onClick={handleUploadClick} className="absolute bottom-0 right-0 rounded-lg bg-blue-500 text-white hover:bg-blue-600 p-2 cursor-pointer">
          <Edit2Icon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default UploadImages;
