
// src/components/RequestModal.tsx
import React from 'react';

interface RequestModalProps {
  isOpen: boolean;
  requestNo: string | null;
  onClose: () => void;
}

const RequestModal: React.FC<RequestModalProps> = ({ isOpen, requestNo, onClose }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  const handleBackgroundClick = () => {
    onClose(); // Close the modal when clicking on the background
  };
  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation(); // Prevent the click event from bubbling up to the background
  };
  return (
    <div onClick={handleBackgroundClick} className=" inset-0 flex items-center justify-center bg-cyan-400 bg-opacity-50 h-screen w-screen fontMedium ">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3" onClick={handleModalClick}>
        <h2 className="text-xl font-semibold mb-4 "> درخواست شما ثبت شد</h2>
        <p className="text-lg">شماره درخواست شما: <strong>{requestNo}</strong></p>
        <div className="mt-6 flex justify-end">
          <button
            className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
            onClick={onClose}
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestModal;