type Props = {
  header: string;
  paragraphs?: string[];
  img: string;
};

const SinglePicture = ({ header, paragraphs, img }: Props) => {
  return (
    <li className="relative mx-5 inline-block h-[380px] w-[450px] ">
      <div
        className="p-5 absolute  flex
  h-[380px]  w-[450px] z-30 flex-col items-center justify-center
  whitespace-normal bg-[#FF6B66] text-center text-white
  opacity-0 transition duration-500 hover:opacity-90"
      >
        <p className="text-2xl">{header}</p>
        {paragraphs?.map((paragraph, index) => (
          <p key={index} className=" font-[400] leading-6 px-2">
            {paragraph}
          </p>
        ))}
      </div>
      <img
        alt="carousel img"
        src={img}
        className="object-cover h-full w-full "
      />
    </li>
  );
};

export default SinglePicture;
