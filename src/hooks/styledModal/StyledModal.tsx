import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { GenericButton } from "../../common/GenericButton";
import SelectInput from "../../common/SelectInput";
import TextInput from "../../common/TextInput";
import { InputTypes } from "../../common/types";
import {
    editExplanationBar,
    editMainMainHeader,
    editResumeBox,
    editTwoPictureIndexStyle,
    editTwoPictureStyle,
    editWorkTeamBar,
} from "../../features/twoPicture/twoPictureSlice";
import { StyleType } from "../../shared/types";
import { RootState, useAppDispatch } from "../../store";

interface StyleData {
  content: string;
  style: StyleType;
  link?: string;
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
  buttonIndex?: number;
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
  buttonIndex,
}: StyledModalProps) {
  const dispatch = useAppDispatch();
  const [editedStyle, setEditedStyle] = useState<StyleData>(styleData);
  const [selectedColor, setSelectedColor] = useState(styleData.style.color);
  const [selectedHoverColor, setSelectedHoverColor] = useState(
    styleData.style.hover
  );
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
    styleData.style.backgroundColor
  );
  const { pageOptions } = useSelector((state: RootState) => state.twoPicture);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let container;
    if (contentType === "buttons") {
      container = [
        {
          [contentType]: {
            content: editedStyle.content,
            style: editedStyle.style,
            link: editedStyle.link,
          },
          buttonIndex: buttonIndex,
        },
      ];
    } else {
      container = [
        {
          [contentType]: {
            content: editedStyle.content,
            style: editedStyle.style,
          },
        },
      ];
    }

    switch (type) {
      case "explanationBar":
        console.log("explanationBar");
        console.log(container);
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
        if (componentId !== "") {
          await dispatch(
            editExplanationBar({
              twoPictureId,
              explanationBarId: componentId,
              container,
            })
          );
        } else {
          await dispatch(
            editTwoPictureStyle({
              twoPictureId,
              container,
            })
          );
        }

        break;
      case "twoPictureIndex":
        await dispatch(
          editTwoPictureIndexStyle({
            twoPictureId,
            container,
            index: componentId,
          })
        );
        break;
      case "resumeBox":
        await dispatch(
          editResumeBox({
            twoPictureId,
            container,
            index: componentId,
          })
        );
        break;
      case "mainMainHeader":
        await dispatch(
          editMainMainHeader({
            twoPictureId,
            mainHeader: {
              content: editedStyle.content,
              style: editedStyle.style,
            },
          })
        );
        break;
      default:
        break;
    }
    onClose();
    window.location.reload();
  };

  const handleOutsideClick = () => {
    onClose();
  };
  const handleStyleChangeWrapper = (property: string, value: string | boolean) => {
    if (property === "color") {
      setSelectedColor(value as string);
    } else if (property === "hover") {
      setSelectedHoverColor(value as string);
    } else if (property === "backgroundColor") {
      setSelectedBackgroundColor(value as string);
    } else if (property === "effectAll") {
      setEditedStyle((prevStyle) => ({
        ...prevStyle,
        style: {
          ...prevStyle.style,
          effectAll: value as boolean,
        },
      }));
      return;
    }
    setEditedStyle((prevStyle) => ({
      ...prevStyle,
      style: {
        ...prevStyle.style,
        [property]: value,
      },
    }));
  };

  return isOpen
    ? ReactDOM.createPortal(
        <div className="fixed right-0 top-0 flex z-40">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleOutsideClick}
          ></div>
          <div
            className="bg-white p-6 rounded-lg shadow-xl z-10 min-h-screen w-96"
            style={{ maxHeight: "100vh", overflowY: "auto" }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-bold mb-6 pb-3 border-b border-gray-200 capitalize">
                {contentType} Style
              </h2>
              {/* content part */}
              {isContentSend && (
                <TextInput
                  label="Content"
                  type={InputTypes.TEXT}
                  value={editedStyle.content}
                  onChange={(value) => setEditedStyle({ ...editedStyle, content: value })}
                />
              )}
              {contentType === "buttons" && (
                <SelectInput
                  label="Link to Page"
                  options={[
                    { label: "Select a page", value: "" },
                    ...pageOptions.map((option) => ({
                      label: option.pageNameEN,
                      value: option.pageNameEN.toLowerCase(),
                    })),
                  ]}
                  value={{ value: editedStyle.link || "", label: pageOptions.find(opt => opt.pageNameEN.toLowerCase() === editedStyle.link)?.pageNameEN || "Select a page" }}
                  onChange={(option) => {
                    if (option && 'value' in option) {
                      setEditedStyle({ ...editedStyle, link: String(option.value) });
                    }
                  }}
                />
              )}
              {/* Add "Effect All" option */}
              <TextInput
                label="Effect Style For All"
                type={InputTypes.CHECKBOX}
                value={editedStyle.style.effectAll}
                onChange={(value) => handleStyleChangeWrapper("effectAll", value)}
              />
              <TextInput
                label="Color"
                type={InputTypes.COLOR}
                value={selectedColor}
                onChange={(color) => handleStyleChangeWrapper("color", color)}
              />
              <TextInput
                label="Hover Color"
                type={InputTypes.COLOR}
                value={selectedHoverColor}
                onChange={(color) => handleStyleChangeWrapper("hover", color)}
              />
              <SelectInput
                label="Font Family"
                options={[
                  { label: "Arial", value: "Arial" },
                  { label: "Helvetica", value: "Helvetica" },
                  { label: "Times New Roman", value: "Times New Roman" },
                  { label: "Georgia", value: "Georgia" },
                  { label: "Verdana", value: "Verdana" },
                  { label: "Comic Sans MS", value: "Comic Sans MS" },
                ]}
                value={{ value: editedStyle.style.fontFamily || "Arial", label: editedStyle.style.fontFamily || "Arial" }}
                onChange={(option) => {
                  if (option && 'value' in option) {
                    handleStyleChangeWrapper("fontFamily", String(option.value));
                  }
                }}
              />
              <TextInput
                label="Font Weight"
                type={InputTypes.TEXT}
                value={editedStyle.style.fontWeight}
                onChange={(value) => handleStyleChangeWrapper("fontWeight", value)}
              />
              <TextInput
                label="Background Color"
                type={InputTypes.COLOR}
                value={selectedBackgroundColor}
                onChange={(color) => handleStyleChangeWrapper("backgroundColor", color)}
              />
              <TextInput
                label="Padding"
                type={InputTypes.TEXT}
                value={editedStyle.style.padding}
                onChange={(value) => handleStyleChangeWrapper("padding", value)}
              />
              <TextInput
                label="Font Size"
                type={InputTypes.TEXT}
                value={editedStyle.style.fontSize}
                onChange={(value) => handleStyleChangeWrapper("fontSize", value)}
              />
              <div className="flex justify-end gap-2 mt-6">
                <GenericButton
                  type="submit"
                  variant="primary"
                  size="md"
                >
                  Save
                </GenericButton>
                <GenericButton
                  type="button"
                  onClick={onClose}
                  variant="secondary"
                  size="md"
                >
                  Cancel
                </GenericButton>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )
    : null;
}

export default StyledModal;
