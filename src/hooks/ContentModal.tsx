import React, { useState, useEffect } from "react";

interface ContentModalProps {
  isOpen: boolean;
  content: string[];
  onClose: () => void;
  onSave: (paragraphs: string[]) => void;
}

const ContentModal: React.FC<ContentModalProps> = ({
  isOpen,
  content,
  onClose,
  onSave,
}) => {
  const [editedContent, setEditedContent] = useState<string[]>(content);

  // Update the editedContent when the content prop changes
  useEffect(() => {
    setEditedContent(content);
  }, [content]);

  const handleSave = () => {
    // Call the onSave callback with the edited content
    onSave(editedContent);

    // Close the modal
    onClose();
  };

  return isOpen ? (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Edit Content</h2>
        <div className="overflow-y-auto max-h-80">
          {editedContent.map((paragraph, index) => (
            <textarea
              key={index}
              rows={5}
              value={paragraph}
              onChange={(e) => {
                const updatedContent = [...editedContent];
                updatedContent[index] = e.target.value;
                setEditedContent(updatedContent);
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
