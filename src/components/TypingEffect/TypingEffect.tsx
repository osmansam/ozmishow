import React, { useEffect, useState } from "react";

type Props = {
  texts: string[];
  typingSpeed?: number;
  deleteSpeed?: number;
  delay?: number;
};

const TypingEffect = ({
  texts,
  typingSpeed = 100,
  deleteSpeed = 60,
  delay = 4000,
}: Props) => {
  const [textIndex, setTextIndex] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCursorVisible, setIsCursorVisible] = useState(true);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    const typeText = () => {
      const currentText = texts[textIndex];
      const currentIndex = typingText.length;

      if (isDeleting) {
        if (currentIndex > 0) {
          setTypingText((prevText) => prevText.slice(0, currentIndex - 1));
          timerId = setTimeout(typeText, deleteSpeed);
        } else {
          setIsDeleting(false);
          setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
          timerId = setTimeout(typeText, delay);
        }
      } else {
        if (currentIndex < currentText.length) {
          setTypingText((prevText) => currentText.slice(0, currentIndex + 1));
          timerId = setTimeout(typeText, typingSpeed);
        } else {
          setIsDeleting(true);
          timerId = setTimeout(typeText, typingSpeed);
        }
      }
    };

    if (!isDeleting && typingText === "") {
      timerId = setTimeout(typeText, delay);
    } else {
      timerId = setTimeout(typeText, isDeleting ? deleteSpeed : typingSpeed);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [
    texts,
    textIndex,
    typingSpeed,
    deleteSpeed,
    delay,
    typingText,
    isDeleting,
  ]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setIsCursorVisible((prevVisible) => !prevVisible);
    }, 500);

    return () => {
      clearInterval(cursorTimer);
    };
  }, []);

  return (
    <div className="h-full">
      <span className="relative">
        {typingText}
        <span
          className={`absolute h-5 w-1 bg-black ${
            isCursorVisible ? "opacity-100" : "opacity-0"
          }`}
        ></span>
      </span>
    </div>
  );
};

export default TypingEffect;
