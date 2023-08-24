import React, { useState, useEffect, useRef } from "react";

const SpeedReader = () => {
  const [text, setText] = useState("Hello world!");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const words = text.split(" ");
  const [currentIndex, setCurrentIndex] = useState(0);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const progressHandleRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);

  const togglePlay = () => {
    if (currentIndex >= words.length - 1) {
      setCurrentIndex(0);
      setProgress(0);
    }
    setIsPlaying((prevState) => !prevState);
  };

  const handleDragStart = () => {
    isDragging.current = true;
  };

  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || e.buttons !== 1 || !progressBarRef.current)
      return;

    const progressBarWidth = progressBarRef.current.offsetWidth;
    const clickX =
      e.clientX - progressBarRef.current.getBoundingClientRect().left;
    const newProgress = (clickX / progressBarWidth) * 100;

    if (newProgress >= 0 && newProgress <= 100) {
      setProgress(newProgress);
      setCurrentIndex(Math.floor((newProgress / 100) * words.length));
    }
  };

  const handleDragEnd = () => {
    isDragging.current = false;
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;

    const progressBarWidth = progressBarRef.current.offsetWidth;
    const clickX =
      e.clientX - progressBarRef.current.getBoundingClientRect().left;
    const newProgress = (clickX / progressBarWidth) * 100;

    if (newProgress >= 0 && newProgress <= 100) {
      setProgress(newProgress);
      setCurrentIndex(Math.floor((newProgress / 100) * words.length));
    }
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        if (currentIndex === words.length - 1) {
          clearInterval(interval);
          setIsPlaying(false);
        } else {
          setProgress(
            (prevProgress) => (prevProgress + 100 / words.length) % 100
          );
        }
      }, (60 / 300) * 1000); // 300 WPM = 200 ms per word

      return () => {
        clearInterval(interval);
      };
    }
  }, [isPlaying, currentIndex, words.length]);

  useEffect(() => {
    if (progressHandleRef.current) {
      progressHandleRef.current.style.left = `${progress}%`;
    }
  }, [progress]);

  return (
    <div className="flex flex-col items-center p-4 py-40">
      <div className="w-full max-w-md p-4 border border-gray-300 rounded-md mb-4">
        <textarea
          className="w-full h-20 p-2 bg-gray-100 border border-gray-300 rounded-md"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="flex flex-col items-center border-2 rounded-md p-4 mb-4">
        <p className="text-center font-semibold text-lg">
          {words[currentIndex]}
        </p>
        <div className="flex flex-row mt-4 gap-4">
          <button
            className="py-1 px-3 bg-blue-500 text-white rounded-md"
            onClick={() => {
              setCurrentIndex(0);
              setProgress(0);
              setIsPlaying(false);
            }}
          >
            {"|<"}
          </button>
          <button
            className="py-1 px-3 bg-blue-500 text-white rounded-md"
            onClick={togglePlay}
          >
            {isPlaying ? "||" : ">"}
          </button>
        </div>
      </div>
      <div className="w-full max-w-md border border-gray-300 rounded-md p-4">
        <div
          className="progress-bar cursor-pointer relative"
          ref={progressBarRef}
          onMouseDown={handleDragStart}
          onMouseMove={handleDrag}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onClick={handleProgressBarClick}
        >
          <div
            className="played-progress h-2 bg-green-500 "
            style={{ width: `${progress}%` }}
          />
          {/* <div className="absolute border-4 top-1/2 -translate-y-1/2 bg-slate-400 w-full h-3"></div> */}
          <div
            className="progress-handle h-4 w-4 bg-blue-500 rounded-full cursor-pointer absolute top-1/2 -translate-y-1/2"
            ref={progressHandleRef}
          />
        </div>
      </div>
    </div>
  );
};

export default SpeedReader;
