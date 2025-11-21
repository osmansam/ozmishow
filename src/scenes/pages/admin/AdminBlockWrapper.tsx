import React from "react";
import { PageOptionsType } from "../../../shared/types";
import { PageConfigurationButtons } from "./PageConfigurationButtons";

interface AdminBlockWrapperProps {
  children: React.ReactNode;
  index: number;
  moveItem: (index: number, direction: "up" | "down") => void;
  disableMoveUp: boolean;
  disableMoveDown: boolean;
  id: string;
  pageOptions: Array<PageOptionsType>;
  language: string;
  showWrapper?: boolean;
  onDeleteSuccess?: () => void;
}

/**
 * Reusable wrapper for admin blocks
 * Provides consistent styling and admin controls
 */
export const AdminBlockWrapper: React.FC<AdminBlockWrapperProps> = ({
  children,
  index,
  moveItem,
  disableMoveUp,
  disableMoveDown,
  id,
  pageOptions,
  language,
  showWrapper = true,
  onDeleteSuccess,
}) => {
  const wrapperClass = showWrapper
    ? "border-2 border-dashed border-blue-300 p-2 relative my-4 mx-4 rounded-lg hover:border-blue-500 transition-colors"
    : "";

  return (
    <div className={wrapperClass}>
      {children}
      <PageConfigurationButtons
        index={index}
        moveItem={moveItem}
        disableMoveUp={disableMoveUp}
        disableMoveDown={disableMoveDown}
        id={id}
        pageOptions={pageOptions}
        language={language}
        onDeleteSuccess={onDeleteSuccess}
      />
    </div>
  );
};
