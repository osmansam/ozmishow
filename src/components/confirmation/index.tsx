import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { LanguageOptions } from "../../shared/types";
type ConfirmationModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  onConfirm,
  onCancel,
}) => {
  const { language } = useSelector((state: RootState) => state.context);
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg">
        <p>
          {" "}
          {language === LanguageOptions.EN
            ? "Are you sure you want to delete?"
            : "Silmek istediginize emin misiniz?"}
        </p>
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 mr-2 bg-red-500 text-white rounded-md"
            onClick={onConfirm}
          >
            {language === LanguageOptions.EN ? "Confirm" : "Evet"}
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
            onClick={onCancel}
          >
            {language === LanguageOptions.EN ? "Cancel" : "Iptal"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
