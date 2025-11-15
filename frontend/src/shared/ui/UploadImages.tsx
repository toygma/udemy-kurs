
import { useRef, useState } from "react";
import { Edit2Icon, X, Upload } from "lucide-react";
import toast from "react-hot-toast";

interface UploadImageProps {
  currentImage?: string;
  onImageChange: (base64Image: string) => void;
  maxSize?: number; 
  isEdit?: boolean;
  className?: string;
  shape?: "circle" | "square" | "rounded";
  size?: "sm" | "md" | "lg";
}

const UploadImage = ({
  currentImage = "",
  onImageChange,
  maxSize = 4 * 1024 * 1024,
  isEdit = true,
  className = "",
  shape = "rounded",
  size = "md",
}: UploadImageProps) => {
  const [previewImage, setPreviewImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Size classes
  const sizeClasses = {
    sm: "w-20 h-20",
    md: "w-32 h-32",
    lg: "w-48 h-48",
  };

  // Shape classes
  const shapeClasses = {
    circle: "rounded-full",
    square: "rounded-none",
    rounded: "rounded-2xl",
  };

  /**
   * Handle file selection and validation
   */
  const handleFileChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(0);
      toast.error(`Image size must be less than ${maxSizeMB}MB`);
      return;
    }

    // Read file as base64
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2 && typeof reader.result === "string") {
        setPreviewImage(reader.result);
        onImageChange(reader.result);
      }
    };

    reader.onerror = () => {
      toast.error("Failed to read image file");
    };

    reader.readAsDataURL(file);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /**
   * Remove preview and clear image
   */
  const handleRemoveImage = () => {
    setPreviewImage("");
    onImageChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /**
   * Trigger file input click
   */
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Display image (preview or current)
  const displayImage = previewImage || currentImage;

  return (
    <div className={`relative ${className}`}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e.target.files)}
        className="hidden"
        disabled={!isEdit}
      />

      {/* Image container */}
      <div
        className={`relative ${sizeClasses[size]} ${shapeClasses[shape]} overflow-hidden border-4 border-white shadow-lg`}
      >
        {displayImage ? (
          <>
            {/* Image */}
            <img
              src={displayImage}
              alt="Upload preview"
              className="w-full h-full object-cover"
            />

            {/* Remove button (only in edit mode) */}
            {isEdit && previewImage && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-md"
                title="Remove image"
              >
                <X size={16} />
              </button>
            )}
          </>
        ) : (
          // Placeholder when no image
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <Upload className="w-8 h-8 text-gray-400" />
          </div>
        )}
      </div>

      {/* Edit/Upload button (only in edit mode) */}
      {isEdit && (
        <button
          type="button"
          onClick={handleUploadClick}
          className="absolute bottom-0 right-0 rounded-lg bg-blue-500 text-white hover:bg-blue-600 p-2 cursor-pointer shadow-md transition-colors"
          title="Upload image"
        >
          <Edit2Icon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default UploadImage;