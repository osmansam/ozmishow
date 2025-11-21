import React, { useEffect, useState } from "react";
import { setLanguage } from "../../../features/context/contextSlice";
import {
  deleteTwoPicture,
  getPageTwoPictures,
  updatePageAndLanguage,
} from "../../../features/twoPicture/twoPictureSlice";
import ConfirmationModal from "../../../hooks/confirmation";
import { LanguageOptions, PageOptionsType } from "../../../shared/types";
import { useAppDispatch } from "../../../store";

interface PageConfigurationButtonsProps {
  index: number;
  moveItem: (index: number, direction: "up" | "down") => void;
  disableMoveUp: boolean;
  disableMoveDown: boolean;
  id: string;
  pageOptions: Array<PageOptionsType>;
  language: string;
  onDeleteSuccess?: () => void;
}

export const PageConfigurationButtons: React.FC<
  PageConfigurationButtonsProps
> = ({
  index,
  moveItem,
  disableMoveUp,
  disableMoveDown,
  id,
  pageOptions,
  language,
  onDeleteSuccess,
}) => {
  const dispatch = useAppDispatch();

  const [changePage, setChangePage] = useState(false);
  // Safe initialization - use first page or empty string
  const [updatePage, setUpdatePage] = useState(
    pageOptions.length > 0 ? pageOptions[0].pageNameEN : ""
  );
  const [updateLanguage, setUpdateLanguage] = useState(language);

  const handleConfirmDelete = async () => {
    await dispatch(deleteTwoPicture(id));
    // Call the callback instead of reloading the page
    if (onDeleteSuccess) {
      onDeleteSuccess();
    }
  };

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleCancelDelete = () => {
    setShowConfirmationModal(false);
  };

  // Fix: Add language to dependency array and check for undefined/empty
  useEffect(() => {
    if (language === undefined || language === "") {
      dispatch(setLanguage("EN"));
    }
  }, [dispatch, language]);

  return (
    <div className="border-t border-gray-200 py-4">
      {showConfirmationModal && (
        <ConfirmationModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      
      <div className="flex items-center justify-between gap-3 px-2">
        {/* Left side - Movement controls */}
        <div className="flex items-center gap-2">
          <button
            className={`
              px-3 py-1.5 text-sm font-normal border rounded
              ${disableMoveUp 
                ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50' 
                : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
              }
            `}
            disabled={disableMoveUp}
            onClick={() => moveItem(index, "up")}
          >
            ↑
          </button>
          <button
            className={`
              px-3 py-1.5 text-sm font-normal border rounded
              ${disableMoveDown 
                ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50' 
                : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
              }
            `}
            disabled={disableMoveDown}
            onClick={() => moveItem(index, "down")}
          >
            ↓
          </button>
        </div>

        {/* Right side - Action buttons */}
        <div className="flex items-center gap-2">
          {!changePage && (
            <button
              className="px-3 py-1.5 text-sm font-normal text-gray-700 border border-gray-300 rounded hover:border-gray-400 hover:bg-gray-50"
              onClick={() => setChangePage(true)}
            >
              Edit
            </button>
          )}
          <button
            className="px-3 py-1.5 text-sm font-normal text-red-600 border border-red-200 rounded hover:border-red-300 hover:bg-red-50"
            onClick={() => setShowConfirmationModal(true)}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Edit form */}
      {changePage && (
        <div className="mt-4 pt-4 border-t border-gray-200 px-2">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1.5">
                  Page
                </label>
                <select
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-white"
                  onChange={(e) => setUpdatePage(e.target.value)}
                  value={updatePage}
                >
                  <option value="">Select a page</option>
                  {pageOptions.map((page, index) => (
                    <option key={index} value={page.pageNameEN}>
                      {page.pageNameEN}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1.5">
                  Language
                </label>
                <select
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-white"
                  onChange={(e) => setUpdateLanguage(e.target.value)}
                  value={updateLanguage}
                >
                  {Object.entries(LanguageOptions).map(([value, label]) => (
                    <option
                      key={value}
                      value={LanguageOptions[label as keyof typeof LanguageOptions]}
                    >
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1.5 text-sm font-normal text-gray-700 border border-gray-300 rounded hover:border-gray-400 hover:bg-gray-50"
                onClick={() => setChangePage(false)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1.5 text-sm font-normal text-white bg-blue-600 rounded hover:bg-blue-700"
                onClick={async () => {
                  await dispatch(
                    updatePageAndLanguage({
                      id,
                      page: updatePage,
                      language: updateLanguage,
                    })
                  );
                  dispatch(getPageTwoPictures(updatePage));
                  setChangePage(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
