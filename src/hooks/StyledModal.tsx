import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { SketchPicker } from "react-color";

interface StyleType {
  color: string;
  "text-size": string;
  backgroundColor: string;
  padding: string;
  "font-size": string;
}

interface StyleData {
  content: string;
  style: StyleType;
}

interface StyledModalProps {
  isOpen: boolean;
  styleData: StyleData;
  onClose: () => void;
  twoPictureId: string;
  explanationId: string;
  contentType: string;
}

function StyledModal({
  isOpen,
  styleData,
  onClose,
  twoPictureId,
  explanationId,
  contentType,
}: StyledModalProps) {
  const [editedStyle, setEditedStyle] = useState<StyleData>(styleData);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(styleData.style.color);
  const [originalColor, setOriginalColor] = useState(styleData.style.color); // Track original color
  const [isBackgroundColorPickerOpen, setIsBackgroundColorPickerOpen] =
    useState(false);
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
    styleData.style.backgroundColor
  );
  const [originalBackgroundColor, setOriginalBackgroundColor] = useState(
    styleData.style.backgroundColor
  ); // Track original background color

  const toggleColorPicker = () => {
    setIsColorPickerOpen(!isColorPickerOpen);
    setIsBackgroundColorPickerOpen(false); // Close the background color picker
  };

  const toggleBackgroundColorPicker = () => {
    setIsBackgroundColorPickerOpen(!isBackgroundColorPickerOpen);
    setIsColorPickerOpen(false); // Close the color picker
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedStyle((prevStyle) => ({
      ...prevStyle,
      [name]: value,
    }));
  };

  const handleStyleChange = (property: string, value: string) => {
    setEditedStyle((prevStyle) => ({
      ...prevStyle,
      style: {
        ...prevStyle.style,
        [property]: value,
      },
    }));
  };

  const handleColorChange = (color: any) => {
    setSelectedColor(color.hex);
  };

  const handleBackgroundColorChange = (color: any) => {
    setSelectedBackgroundColor(color.hex);
  };

  const handleConfirm = () => {
    // Save the selected colors to the editedStyle and close the color pickers
    handleStyleChange("color", selectedColor);
    handleStyleChange("backgroundColor", selectedBackgroundColor);
    setIsColorPickerOpen(false);
    setIsBackgroundColorPickerOpen(false);
  };

  const handleCancel = () => {
    // Close the color pickers without saving changes and reset the color values
    setSelectedColor(originalColor);
    setSelectedBackgroundColor(originalBackgroundColor);
    setIsColorPickerOpen(false);
    setIsBackgroundColorPickerOpen(false);
  };

  useEffect(() => {
    // Update the original color values when styleData changes
    setOriginalColor(styleData.style.color);
    setOriginalBackgroundColor(styleData.style.backgroundColor);
  }, [styleData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onClose();
  };

  const handleOutsideClick = () => {
    onClose();
  };

  return isOpen
    ? ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center z-40">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleOutsideClick}
          ></div>
          <div className="bg-white p-4 rounded-lg z-10">
            <form onSubmit={handleSubmit}>
              <h2 className="text-lg font-semibold mb-4">Edit Style</h2>
              <div className="mb-4">
                <label htmlFor="content" className="block text-gray-600">
                  Content:
                </label>
                <input
                  type="text"
                  id="content"
                  name="content"
                  value={editedStyle.content}
                  onChange={handleInputChange}
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="color" className="block text-gray-600">
                  Color:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="color"
                    name="style[color]"
                    value={selectedColor}
                    onClick={toggleColorPicker}
                    className="border rounded px-2 py-1 w-full"
                  />
                  {isColorPickerOpen && (
                    <div className="absolute top-10 z-50 left-0">
                      <SketchPicker
                        color={selectedColor}
                        onChange={handleColorChange}
                      />
                      <div className="flex justify-end mt-2">
                        <button
                          onClick={handleConfirm}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-gray-300 text-gray-600 px-4 py-2 rounded hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="text-size" className="block text-gray-600">
                  Text Size:
                </label>
                <input
                  type="text"
                  id="text-size"
                  name="style[text-size]"
                  value={editedStyle.style["text-size"]}
                  onChange={(e) =>
                    handleStyleChange("text-size", e.target.value)
                  }
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
              <div className="mb-4">
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
                          onClick={handleConfirm}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-gray-300 text-gray-600 px-4 py-2 rounded hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="padding" className="block text-gray-600">
                  Padding:
                </label>
                <input
                  type="text"
                  id="padding"
                  name="style[padding]"
                  value={editedStyle.style.padding}
                  onChange={(e) => handleStyleChange("padding", e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="font-size" className="block text-gray-600">
                  Font Size:
                </label>
                <input
                  type="text"
                  id="font-size"
                  name="style[font-size]"
                  value={editedStyle.style["font-size"]}
                  onChange={(e) =>
                    handleStyleChange("font-size", e.target.value)
                  }
                  className="border rounded px-2 py-1 w-full"
                />
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
}

export default StyledModal;
