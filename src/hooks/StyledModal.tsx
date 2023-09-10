import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { SketchPicker } from "react-color";
import {
  editExplanationBar,
  editWorkTeamBar,
  editTwoPictureStyle,
} from "../features/twoPicture/twoPictureSlice";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";

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

interface StyleData {
  content: string;
  style: StyleType;
}

interface StyledModalProps {
  isOpen: boolean;
  styleData: StyleData;
  onClose: () => void;
  twoPictureId: string;
  componentId: string;
  contentType: string;
  isContentSend?: boolean;
  type?: string;
}

function StyledModal({
  isOpen,
  styleData,
  onClose,
  twoPictureId,
  componentId,
  contentType,
  isContentSend,
  type,
}: StyledModalProps) {
  const dispatch = useAppDispatch();
  const [editedStyle, setEditedStyle] = useState<StyleData>(styleData);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(styleData.style.color);
  const [originalColor, setOriginalColor] = useState(styleData.style.color); // Track original color
  const [isHoverColorPickerOpen, setIsHoverColorPickerOpen] = useState(false);
  const [selectedHoverColor, setSelectedHoverColor] = useState(
    styleData.style.hover
  );
  const [originalHoverColor, setOriginalHoverColor] = useState(
    styleData.style.hover
  );
  const [isBackgroundColorPickerOpen, setIsBackgroundColorPickerOpen] =
    useState(false);
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
    styleData.style.backgroundColor
  );
  const [originalBackgroundColor, setOriginalBackgroundColor] = useState(
    styleData.style.backgroundColor
  );
  const [effectAllElement, setEffectAllElement] = useState(
    styleData.style.effectAll
  ); // State for "Effect All" option

  const toggleEffectAll = () => {
    setEffectAllElement(!effectAllElement);
  };

  useEffect(() => {
    // Update the effectAll value when the checkbox changes
    setEditedStyle((prevStyle) => ({
      ...prevStyle,
      style: {
        ...prevStyle.style,
        effectAll: effectAllElement,
      },
    }));
  }, [effectAllElement]);

  // Track original background color
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

  const handleClearColor = () => {
    setSelectedColor(""); // Clear the color
    handleStyleChange("color", "");
    setIsColorPickerOpen(false); // Close the color picker
  };

  const handleClearBackgroundColor = () => {
    setSelectedBackgroundColor(""); // Clear the background color
    handleStyleChange("backgroundColor", "");
    setIsBackgroundColorPickerOpen(false); // Close the background color picker
  };
  const handleColorChange = (color: any) => {
    setSelectedColor(color.hex);
  };

  const handleBackgroundColorChange = (color: any) => {
    setSelectedBackgroundColor(color.hex);
  };

  const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    handleStyleChange("fontFamily", value);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let container: any = [];
    if (contentType === "mainHeader") {
      container = [
        {
          mainHeader: {
            content: editedStyle.content,
            style: editedStyle.style,
          },
        },
      ];
    } else if (contentType === "header") {
      container = [
        {
          header: {
            content: editedStyle.content,
            style: editedStyle.style,
          },
        },
      ];
    } else if (contentType === "paragraphs") {
      container = [
        {
          paragraphs: {
            content: editedStyle.content,
            style: editedStyle.style,
          },
        },
      ];
    } else if (contentType === "subHeaders") {
      container = [
        {
          subHeaders: {
            content: editedStyle.content,
            style: editedStyle.style,
          },
        },
      ];
    }
    switch (type) {
      case "explanationBar":
        // console.log(editedStyle);
        await dispatch(
          editExplanationBar({
            twoPictureId,
            explanationBarId: componentId,
            container,
          })
        );
        break;
      case "workTeamBar":
        await dispatch(
          editWorkTeamBar({
            twoPictureId,
            workTeamBarId: componentId,
            container,
          })
        );
        break;
      case "twoPicture":
        await dispatch(
          editTwoPictureStyle({
            twoPictureId,
            container,
          })
        );
        break;
      default:
        break;
    }
    setEffectAllElement(true);
    onClose();
    window.location.reload();
  };

  const handleOutsideClick = () => {
    onClose();
  };
  const toggleHoverColorPicker = () => {
    setIsHoverColorPickerOpen(!isHoverColorPickerOpen);
  };

  const handleHoverColorChange = (color: any) => {
    setSelectedHoverColor(color.hex);
  };

  const handleClearColorHover = () => {
    setSelectedHoverColor(""); // Clear the hover color
    handleStyleChange("hover", "");
    setIsHoverColorPickerOpen(false); // Close the hover color picker
  };

  const handleConfirmHover = () => {
    // Save the selected hover color and close the hover color picker
    handleStyleChange("hover", selectedHoverColor);
    setIsHoverColorPickerOpen(false);
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

  const backgroundColorPicker = (
    <div className="absolute top-10 z-50 left-0">
      <SketchPicker
        color={selectedBackgroundColor}
        onChange={handleBackgroundColorChange}
      />
      <div className="flex justify-end mt-2">
        <button
          onClick={handleClearBackgroundColor} // Clear the background color and close the palette
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mr-2"
        >
          Clear Background Color
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
  const hoverColorPicker = (
    <div className="absolute top-10 z-50 left-0">
      <SketchPicker
        color={selectedHoverColor}
        onChange={handleHoverColorChange}
      />
      <div className="flex justify-end mt-2">
        <button
          onClick={handleClearColorHover} // Clear the hover color and close the palette
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mr-2"
        >
          Clear Hover Color
        </button>
        <button
          onClick={handleConfirmHover}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
        >
          Confirm
        </button>
        <button
          onClick={() => {
            setIsHoverColorPickerOpen(false);
            setSelectedHoverColor(originalHoverColor);
          }}
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
            onClick={handleOutsideClick}
          ></div>
          <div
            className="bg-white p-4 rounded-lg z-10 min-h-screen"
            style={{ maxHeight: "80vh", overflowY: "auto" }}
          >
            <form onSubmit={handleSubmit}>
              <h2 className="text-lg font-semibold mb-3 capitalize">
                {contentType} Style
              </h2>
              {/* content part */}
              {isContentSend && (
                <div className="mb-3">
                  <label htmlFor="content" className="block text-gray-600">
                    Content:
                  </label>
                  <input
                    type="text"
                    id="content"
                    name="content"
                    value={editedStyle.content}
                    onChange={handleInputChange}
                    className="border rounded px-2 py-1 w-full capitalize"
                    style={editedStyle.style}
                  />
                </div>
              )}
              {/* Add "Effect  All" option */}
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
              <div className="mb-3">
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
                  {isColorPickerOpen && colorPicker}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="hover" className="block text-gray-600">
                  Hover Color:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="hover"
                    name="style[hover]"
                    value={selectedHoverColor}
                    onClick={toggleHoverColorPicker}
                    className="border rounded px-2 py-1 w-full"
                  />
                  {isHoverColorPickerOpen && hoverColorPicker}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="fontFamily" className="block text-gray-600">
                  Font Family:
                </label>
                <select
                  id="fontFamily"
                  name="style[fontFamily]"
                  value={editedStyle.style["fontFamily"]}
                  onChange={handleFontFamilyChange}
                  className="border rounded px-2 py-1 w-full"
                >
                  <option value="Arial">Arial</option>
                  <option value="Helvetica">Helvetica</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Verdana">Verdana</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="fontWeight" className="block text-gray-600">
                  Font Weight:
                </label>
                <input
                  type="text"
                  id="fontWeight"
                  name="style[fontWeight]"
                  value={editedStyle.style["fontWeight"]}
                  onChange={(e) =>
                    handleStyleChange("fontWeight", e.target.value)
                  }
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
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
                  {isBackgroundColorPickerOpen && backgroundColorPicker}
                </div>
              </div>
              <div className="mb-3">
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
              <div className="mb-3">
                <label htmlFor="fontSize" className="block text-gray-600">
                  Font Size:
                </label>
                <input
                  type="text"
                  id="fontSize"
                  name="style[fontSize]"
                  value={editedStyle.style["fontSize"]}
                  onChange={(e) =>
                    handleStyleChange("fontSize", e.target.value)
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
