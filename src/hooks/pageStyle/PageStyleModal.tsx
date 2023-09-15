import React, { useState } from "react";
import { PageStyleType } from "../../shared/types";
import { SketchPicker } from "react-color";
import { updatePageOptions } from "../../features/twoPicture/twoPictureSlice";
import { useAppDispatch } from "../../store";

interface PageStyleModalProps {
  isOpen: boolean;
  styleData: PageStyleType;
  onClose: () => void;
  pageOptionsId: string;
}

const PageStyleModal = ({
  isOpen,
  styleData,
  onClose,
  pageOptionsId,
}: PageStyleModalProps) => {
  const dispatch = useAppDispatch();

  // Initialize the edited style with the original style data
  const [editedStyle, setEditedStyle] = useState<PageStyleType>({
    ...styleData,
  });

  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
    styleData.backgroundColor
  );
  const [isBackgroundColorPickerOpen, setIsBackgroundColorPickerOpen] =
    useState(false);
  const [originalBackgroundColor, setOriginalBackgroundColor] = useState(
    styleData.backgroundColor
  );

  // Function to toggle the background color picker
  const toggleBackgroundColorPicker = () => {
    setIsBackgroundColorPickerOpen(!isBackgroundColorPickerOpen);
  };

  // Function to handle background color change
  const handleBackgroundColorChange = (color: any) => {
    setSelectedBackgroundColor(color.hex);

    // Update the edited style's backgroundColor
    setEditedStyle((prevEditedStyle) => ({
      ...prevEditedStyle,
      backgroundColor: color.hex,
    }));
  };

  // Function to clear the background color
  const handleClearBackgroundColor = () => {
    setSelectedBackgroundColor(""); // Clear the background color

    // Update the edited style's backgroundColor
    setEditedStyle((prevEditedStyle) => ({
      ...prevEditedStyle,
      backgroundColor: "",
    }));
  };

  // Function to cancel background color changes
  const handleCancelBackgroundColor = () => {
    setSelectedBackgroundColor(originalBackgroundColor); // Reset to the original background color
    setIsBackgroundColorPickerOpen(false); // Close the background color picker

    // Reset the edited style to the original style
    setEditedStyle(styleData);
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Dispatch an action to update page options with the editedStyle
    await dispatch(
      updatePageOptions({ id: pageOptionsId, style: editedStyle })
    );

    onClose();
    window.location.reload();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="backgroundColor" className="block text-gray-600">
            Background Color:
          </label>
          <div className="relative">
            <input
              type="text"
              id="backgroundColor"
              name="style[backgroundColor]"
              value={selectedBackgroundColor}
              onClick={toggleBackgroundColorPicker}
              className="border rounded px-2 py-1 w-full"
            />
            {isBackgroundColorPickerOpen && (
              <div className="absolute top-10 z-50 left-0">
                <SketchPicker
                  color={selectedBackgroundColor}
                  onChange={handleBackgroundColorChange}
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleClearBackgroundColor}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mr-2"
                  >
                    Clear Background Color
                  </button>
                  <button
                    onClick={handleCancelBackgroundColor}
                    className="bg-gray-300 text-gray-600 px-4 py-2 rounded hover:bg-gray-400 mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit" // Add a "Save" button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PageStyleModal;
