import React, { useEffect, useState, FC } from "react";
import { CheckCircle, AlertCircle, X } from "lucide-react";

export type NotificationType = "success" | "error";

interface ToastNotificationProps {
  message: string;
  type: NotificationType;
  duration?: number;
  onClose: () => void;
}

const ToastNotification: FC<ToastNotificationProps> = ({
  message,
  type,
  duration = 5000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`fixed bottom-4 right-4 flex items-center p-4 rounded-lg shadow-lg transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      } ${
        type === "success"
          ? "bg-green-50 border border-green-200"
          : "bg-red-50 border border-red-200"
      }`}
      role="alert"
    >
      {type === "success" ? (
        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
      ) : (
        <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
      )}
      <span className={type === "success" ? "text-green-800" : "text-red-800"}>
        {message}
      </span>
      <button
        className="ml-4 text-gray-400 hover:text-gray-600"
        onClick={handleClose}
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default ToastNotification;
