import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom"; // Import ReactDOM for createPortal
import { SketchPicker } from "react-color";
import { updatePageOptions } from "../../features/twoPicture/twoPictureSlice";
import { useAppDispatch } from "../../store";
import { PageStyleType } from "../../shared/types";

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
    backgroundSize: "cover",
  });

  const [effectAllElement, setEffectAllElement] = useState(styleData.effectAll); //
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
    styleData.backgroundColor
  );
  const [isBackgroundColorPickerOpen, setIsBackgroundColorPickerOpen] =
    useState(false);

  const toggleEffectAll = () => {
    setEffectAllElement(!effectAllElement);
  };

  useEffect(() => {
    // Update the effectAll value when the checkbox changes
    setEditedStyle((prevStyle) => ({
      ...prevStyle,
      effectAll: effectAllElement,
    }));
  }, [effectAllElement]);
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
  const handleStyleChange = (property: string, value: string) => {
    setEditedStyle((prevStyle) => ({
      ...prevStyle,
      [property]: value,
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
  // Function to confirm the background color change
  const handleConfirmBackgroundColor = () => {
    // Save the selected background color and close the background color picker
    setIsBackgroundColorPickerOpen(false);
  };

  // Function to cancel background color changes
  const handleCancelBackgroundColor = () => {
    setIsBackgroundColorPickerOpen(false); // Close the background color picker
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

  // Function to handle clicks outside the modal
  const handleOutsideClick = () => {
    onClose();
  };

  return isOpen
    ? ReactDOM.createPortal(
        <div className="fixed right-0 top-0 flex z-40">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleOutsideClick}
          ></div>
          <div
            className="bg-white p-4 rounded-lg z-10 min-h-screen"
            style={{ maxHeight: "80vh", overflowY: "auto" }}
          >
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label
                  htmlFor="backgroundColor"
                  className="block text-gray-600"
                >
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
                          type="button"
                          onClick={handleClearBackgroundColor}
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mr-2"
                        >
                          Clear Background Color
                        </button>
                        <button
                          type="button"
                          onClick={handleConfirmBackgroundColor} // Add this handler
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelBackgroundColor}
                          className="bg-gray-300 text-gray-600 px-4 py-2 rounded hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="backgroundImage"
                  className="block text-gray-600"
                >
                  Background Image:
                </label>
                <input
                  type="text"
                  id="backgroundImage"
                  name="backgroundImage"
                  // value={editedStyle.backgroundImage?.replace(
                  //   /url\((['"])?(.*?)\1\)/gi,
                  //   "$2"
                  // )}
                  value={editedStyle.backgroundImage}
                  onChange={(e) =>
                    handleStyleChange(
                      "backgroundImage",
                      // `url("${e.target.value}")`
                      e.target.value
                    )
                  }
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="effectAll" className="block text-gray-600">
                  Effect Style For All:
                </label>
                <input
                  type="checkbox"
                  id="effectAll"
                  name="effectAll"
                  checked={effectAllElement}
                  onChange={toggleEffectAll}
                  className="mr-2"
                />
                <span>Apply to all elements</span>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-300 text-gray-600 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )
    : null;
};

export default PageStyleModal;
