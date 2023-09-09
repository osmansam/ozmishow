import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import { editExplanationBar } from "../features/twoPicture/twoPictureSlice";

interface StyleType {
  color: string;
  fontWeight: string;
  backgroundColor: string;
  padding: string;
  fontSize: string;
  fontFamily: string;
  hover: string;
  effectAll: boolean;
}
interface ContentData {
  content: string[];
  style: StyleType;
}
interface ContentModalProps {
  isOpen: boolean;
  content: ContentData;
  onClose: () => void;
  twoPictureId: string;
  explanationId: string;
}

const ContentModal: React.FC<ContentModalProps> = ({
  isOpen,
  content,
  onClose,
  twoPictureId,
  explanationId,
}) => {
  const dispatch = useAppDispatch();
  const [editedContent, setEditedContent] = useState<ContentData>(content);

  // Update the editedContent when the content prop changes
  useEffect(() => {
    setEditedContent(content);
  }, [content]);

  const handleSave = async () => {
    // Update the content
    const container = [
      {
        paragraphs: {
          content: editedContent.content,
          style: editedContent.style,
        },
      },
    ];
    await dispatch(
      editExplanationBar({
        twoPictureId,
        explanationBarId: explanationId,
        container,
      })
    );

    // Close the modal
    onClose();
    window.location.reload();
  };

  return isOpen ? (
    <div className="fixed inset-0 flex justify-center  items-center bg-gray-500 bg-opacity-75 z-40 ">
      <div className="bg-white p-4 rounded-lg z-50">
        <h2 className="text-lg font-semibold mb-4">Edit Content</h2>
        <div className="overflow-y-auto max-h-80">
          {editedContent.content.map((paragraph, index) => (
            <textarea
              key={index}
              rows={5}
              value={paragraph}
              onChange={(e) => {
                const updatedContent = [...editedContent.content];
                updatedContent[index] = e.target.value;
                setEditedContent({
                  content: updatedContent,
                  style: editedContent.style,
                });
              }}
              className="w-full border rounded p-2 mb-2"
              style={{ resize: "vertical" }} // Allow vertical resizing
            ></textarea>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-600 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ContentModal;
