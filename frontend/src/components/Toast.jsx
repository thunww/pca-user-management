import React, { useEffect } from "react";

const Toast = ({ toast, onHide }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(onHide, 3000);
    return () => clearTimeout(timer);
  }, [toast, onHide]);

  if (!toast) return null;

  const colors = {
    success: "bg-green-800 border-green-600 text-green-100",
    error: "bg-red-900 border-red-600 text-red-100",
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-lg border text-sm shadow-lg ${colors[toast.type]}`}
    >
      {toast.message}
    </div>
  );
};

export default Toast;
