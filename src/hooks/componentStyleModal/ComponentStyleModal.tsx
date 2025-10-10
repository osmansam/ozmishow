import React, { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import ReactDOM from "react-dom";
import { editComponentStyle } from "../../features/twoPicture/twoPictureSlice";
import { ComponentStyleType } from "../../shared/types";
import { useAppDispatch } from "../../store";

interface ComponentStyleModalProps {
  isOpen: boolean;
  styleData: any;
  onClose: () => void;
  componentTypes?: string[];
  twoPictureId: string;
  currentType: string;
  isComponentType: boolean;
}

function ComponentStyleModal({
  isOpen,
  styleData,
  currentType,
  onClose,
  componentTypes,
  isComponentType,
  twoPictureId,
}: ComponentStyleModalProps) {
  const dispatch = useAppDispatch();
  const [editedStyle, setEditedStyle] = useState<ComponentStyleType>(styleData);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(styleData.backgroundColor);
  const [originalColor, setOriginalColor] = useState(styleData.backgroundColor);
  const [selectedType, setSelectedType] = useState(currentType);
  const toggleColorPicker = () => {
    setIsColorPickerOpen(!isColorPickerOpen);
  };

  const handleStyleChange = (property: string, value: string) => {
    setEditedStyle((prevStyle) => ({
      ...prevStyle,
      [property]: value,
    }));
  };

  const handleClearColor = () => {
    setSelectedColor(""); // Clear the color
    handleStyleChange("backgroundColor", "");
    setIsColorPickerOpen(false); // Close the color picker
  };

  const handleColorChange = (color: any) => {
    setSelectedColor(color.hex);
  };

  const handleConfirm = () => {
    // Save the selected colors to the editedStyle and close the color pickers
    handleStyleChange("backgroundColor", selectedColor ?? "");
    setIsColorPickerOpen(false);
  };

  const handleCancel = () => {
    // Close the color picker without saving changes and reset the color values
    setSelectedColor(originalColor);
    setIsColorPickerOpen(false);
  };

  useEffect(() => {
    // Update the original color values when styleData changes
    setOriginalColor(styleData.backgroundColor);
  }, [styleData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(
      editComponentStyle({
        twoPictureId,
        style: editedStyle,
        type: selectedType,
      })
    );
    onClose();
    window.location.reload();
  };

  const colorPicker = (
    <div className="absolute top-10 z-50 left-0">
      <SketchPicker color={selectedColor} onChange={handleColorChange} />
      <div className="flex justify-end mt-2">
        <button
          onClick={handleClearColor} // Clear the color and close the palette
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mr-2"
        >
          Clear Color
        </button>
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
  );

  return isOpen
    ? ReactDOM.createPortal(
        <div className="fixed right-0 top-0 flex  z-40 ">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={onClose}
          ></div>
          <div
            className="bg-white p-4 rounded-lg z-10 min-h-screen"
            style={{ maxHeight: "80vh", overflowY: "auto" }}
          >
            <form onSubmit={handleSubmit}>
              <h2 className="text-lg font-semibold mb-3 capitalize">
                Component Style
              </h2>
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
                    name="backgroundColor"
                    value={selectedColor}
                    onClick={toggleColorPicker}
                    className="border rounded px-2 py-1 w-full"
                  />
                  {isColorPickerOpen && colorPicker}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="width" className="block text-gray-600">
                  Width:
                </label>
                <input
                  type="text"
                  id="width"
                  name="width"
                  value={editedStyle.width}
                  onChange={(e) => handleStyleChange("width", e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                />
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
                  value={editedStyle.backgroundImage}
                  onChange={(e) =>
                    handleStyleChange("backgroundImage", e.target.value)
                  }
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
              {isComponentType && (
                <div className="mb-3">
                  <label htmlFor="fontFamily" className="block text-gray-600">
                    Component Type:
                  </label>
                  <select
                    id="type"
                    name="selectedType"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                  >
                    {componentTypes?.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              )}
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

export default ComponentStyleModal;
