import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { setTwoPictureArray } from "../../features/twoPicture/twoPictureSlice";
import { ButtonType } from "../../shared/types";
import { style, imageStyle } from "../../shared/types";
type Props = {
  isPictureContainerImage: boolean;
  isPictureContainerButton: boolean;
  isPictureContainerParagraph: boolean;
};

const AddExplanationItem = ({
  isPictureContainerImage,
  isPictureContainerButton,
  isPictureContainerParagraph,
}: Props) => {
  const { twoPictureArray, pageOptions } = useSelector(
    (state: RootState) => state.twoPicture
  );
  const dispatch = useAppDispatch();
  const [ready, setReady] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [img, setImg] = useState("");
  const [header, setHeader] = useState("");
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const [paragraphNumber, setParagraphNumber] = useState(1);
  const [buttonNumber, setButtonNumber] = useState(1);
  const [buttons, setButtons] = useState<ButtonType[]>([]);
  const [mainHeader, setMainHeader] = useState("");

  const handleNumberSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setParagraphNumber(parseInt(e.currentTarget.paragraphNumber.value));
    if (isPictureContainerButton) {
      setButtonNumber(parseInt(e.currentTarget.buttonNumber.value));
    }
    setReady(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newParagraphs = [];
    if (isPictureContainerParagraph) {
      for (let i = 0; i < paragraphNumber; i++) {
        const newParagraph = e.currentTarget[`paragraph${i}`].value || "";
        newParagraphs.push(newParagraph);
        e.currentTarget[`paragraph${i}`].value = "";
      }
    }

    const updatedButtons: ButtonType[] = [];

    if (isPictureContainerButton) {
      for (let i = 0; i < buttonNumber; i++) {
        const buttonNameInput = e.currentTarget[
          `buttonName${i}`
        ] as HTMLInputElement;
        const buttonLinkInput = e.currentTarget[
          `buttonLink${i}`
        ] as HTMLInputElement;
        updatedButtons.push({
          content: buttonNameInput.value,
          style: style,
          link: buttonLinkInput.value,
        });
      }
      setButtons(updatedButtons);
    }

    const newExplanationBar = {
      img: {
        content: img,
        style: imageStyle,
      },
      mainHeader: {
        content: mainHeader,
        style: style,
      },
      header: { content: header, style: style },
      paragraphs: {
        content: newParagraphs,
        style: style,
      },
      buttons: buttons.map((button) => ({
        content: button.content,
        link: button.link,
        style: style,
      })),
    };
    console.log(newExplanationBar);

    dispatch(setTwoPictureArray(newExplanationBar));
    setImg("");
    setHeader("");
    setMainHeader("");
    setParagraphs([]);
    setButtons([]);

    setAllDone(true);
  };

  const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.name === "paragraphNumber") {
      setParagraphNumber(parseInt(e.currentTarget.value));
    } else if (
      isPictureContainerButton &&
      e.currentTarget.name === "buttonNumber"
    ) {
      setButtonNumber(parseInt(e.currentTarget.value));
    }
  };
  if (!ready && (isPictureContainerButton || isPictureContainerParagraph)) {
    return (
      <div className="w-full ">
        <form
          className="bg-white shadow-md rounded-lg w-5/6 mx-auto p-6 mt-6 border border-gray-200 flex flex-col justify-between gap-4 hover:shadow-lg transition duration-300 ease-in-out"
          onSubmit={handleNumberSubmit}
        >
          {isPictureContainerParagraph && (
            <div className="flex gap-5 items-center w-full bg-white  rounded-lg p-4  transition duration-300 ease-in-out">
              <label
                className="w-40 text-gray-600 font-medium"
                htmlFor="paragraphNumber"
              >
                Paragraph Number:
              </label>
              <input
                className="border p-2 rounded-lg focus:outline-none focus:border-indigo-500 transition duration-300 ease-in-out"
                type="number"
                name="paragraphNumber"
                value={paragraphNumber}
                onChange={handleChangeNumber}
                min={1}
              />
            </div>
          )}
          {isPictureContainerButton && (
            <div className="flex gap-5 w-full ">
              <label
                className="w-40 text-gray-600 font-medium"
                htmlFor="buttonNumber"
              >
                Button Number:
              </label>
              <input
                className="border-2 w-16"
                type="number"
                name="buttonNumber"
                value={buttonNumber}
                onChange={handleChangeNumber}
              />
            </div>
          )}
          <button
            type="submit"
            className="mx-auto mt-4 w-fit capitalize border-2 border-blue-500 text-blue-500 py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-100"
          >
            Submit
          </button>
        </form>
      </div>
    );
  } else if (allDone)
    return (
      <div className="w-5/6 flex justify-between mx-auto px-4 pt-4 ">Done!</div>
    );

  const paragraphInputs = [];
  const buttonInputs = [];
  //setting the number of paragraphs
  for (let i = 0; i < paragraphNumber; i++) {
    paragraphInputs.push(
      <div key={i} className="flex gap-5 h-20 w-full ">
        <label
          className="text-lg w-32 font-semibold flex justify-between"
          htmlFor={`paragraph${i}`}
        >
          Paragraph {i + 1} <span>:</span>
        </label>
        <textarea
          className="border-2 rounded-md w-4/5"
          name={`paragraph${i}`}
        />
      </div>
    );
  }
  //setting the links and buttonNumber
  for (let i = 0; i < buttonNumber; i++) {
    buttonInputs.push(
      <div key={i} className="flex gap-5  w-full ">
        <label
          className="text-lg w-32 font-semibold flex justify-between"
          htmlFor={`buttonName${i}`}
        >
          Button {i + 1} Name<span>:</span>
        </label>
        <input
          className="border-2 w-2/5 rounded-md"
          type="text"
          name={`buttonName${i}`}
        />
        <select
          className="border-2 w-2/5 rounded-md"
          name={`buttonLink${i}`}
          value={buttons[i]?.link}
          onChange={(e) => {
            const value = e.target.value.toLowerCase();
            setButtons((prevButtons) => {
              const updatedButtons = [...prevButtons];
              updatedButtons[i] = {
                ...updatedButtons[i],
                link: value,
              };
              return updatedButtons;
            });
          }}
        >
          <option value="">Select a page</option>
          {pageOptions.map((option, index) => (
            <option key={index} value={option.pageNameEN.toLowerCase()}>
              {option.pageNameEN}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="w-full mt-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg w-5/6 mx-auto p-6 mt-6 border border-gray-200 flex flex-col justify-between gap-4 hover:shadow-lg transition duration-300 ease-in-out"
      >
        {/* image */}
        {isPictureContainerImage && (
          <div className="flex items-center gap-5 w-full my-2">
            <label
              className="text-lg w-32 font-semibold flex justify-between"
              htmlFor="img"
            >
              Image<span>:</span>
            </label>
            <input
              className="border p-2 rounded-lg focus:outline-none focus:border-indigo-500 transition duration-300 ease-in-out w-4/5"
              type="text"
              name="img"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
          </div>
        )}

        {/* MainHeader */}
        <div className="flex gap-5 w-full ">
          <label
            className="text-lg w-32 font-semibold flex justify-between"
            htmlFor="mainHeader"
          >
            Main Header <span>:</span>
          </label>
          <input
            className="border p-2 rounded-lg focus:outline-none focus:border-indigo-500 transition duration-300 ease-in-out w-4/5"
            type="text"
            name="mainHeader"
            value={mainHeader}
            onChange={(e) => setMainHeader(e.target.value)}
          />
        </div>
        {/* header */}
        <div className="flex gap-5 w-full ">
          <label
            className="text-lg w-32 font-semibold flex justify-between "
            htmlFor="header"
          >
            Header <span>:</span>
          </label>
          <input
            className="border p-2 rounded-lg focus:outline-none focus:border-indigo-500 transition duration-300 ease-in-out w-4/5"
            type="text"
            name="header"
            value={header}
            onChange={(e) => setHeader(e.target.value)}
          />
        </div>
        {isPictureContainerParagraph ? paragraphInputs : null}
        {isPictureContainerButton ? buttonInputs : null}
        <button
          type="submit"
          className="mx-auto w-fit capitalize border-2 border-blue-500 text-blue-500 py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-100"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddExplanationItem;
