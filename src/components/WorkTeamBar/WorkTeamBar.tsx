import React, { useState } from "react";
import AddWorkTeamItem from "./AddWorkTeamItem";
import { WorkTeamBarType } from "../../shared/types";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import {
  updateWorkTeamBar,
  resetTwoPictureArray,
  deleteItemInContainer,
} from "../../features/twoPicture/twoPictureSlice";
import StyledModal from "../../hooks/styledModal/StyledModal";
import { AiOutlineDown } from "react-icons/ai";
import ContentModal from "../../hooks/contentModal/ContentModal";
import { PictureWithStyleType, ContentStyleType } from "../../shared/types";
import { style } from "../../shared/types";

const WorkTeamBar = ({
  mainMainHeader,
  workTeamArray,
  id,
}: WorkTeamBarType) => {
  const [isWorkTeamItem, setIsWorkTeamItem] = useState(false);
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const [contentModalContentType, setContentModalContentType] = useState("");
  const [barSelection, setBarSelection] = useState(0);
  const [hovered, setHovered] = useState(Number);
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [contentToEdit, setContentToEdit] = useState<any>();
  const [contentType, setContentType] = useState("");
  const [mainHeaderId, setMainHeaderId] = useState("");
  const [paragraphId, setParagraphId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [selectedStyle, setSelectedStyle] = useState({
    content: "",
    style: style,
  });
  const { twoPictureArray } = useSelector(
    (state: RootState) => state.twoPicture
  );
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  const dispatch = useAppDispatch();

  const openModal = (styleData: any) => {
    setSelectedStyle(styleData);
    setIsModalOpen(true);
  };
  const openContentModal = (content: any, contentType: string) => {
    setContentToEdit(content);
    setContentModalContentType(contentType);

    setIsContentModalOpen(true);
  };

  //handle create new explanation item
  const handleCreate = async () => {
    dispatch(updateWorkTeamBar({ container: twoPictureArray, id }));
    setIsWorkTeamItem(false);
    dispatch(resetTwoPictureArray());
    window.location.reload();
  };

  const groupedWorkTeams: {
    mainHeader?: ContentStyleType;
    items: Array<PictureWithStyleType>;
  }[] = workTeamArray.reduce(
    (
      acc: { mainHeader?: ContentStyleType; items: PictureWithStyleType[] }[],
      curr: PictureWithStyleType
    ) => {
      const existingGroup = acc.find(
        (group) => group.mainHeader?.content === curr.mainHeader?.content
      );
      if (existingGroup) {
        existingGroup.items.push(curr);
      } else {
        acc.push({ mainHeader: curr.mainHeader, items: [curr] });
      }
      return acc;
    },
    []
  );

  const barHeight = groupedWorkTeams.length * 25 + 50;
  const barClassName = `lg:w-[270px] md:w-[270px] sm:w-full w-full  flex flex-col gap-4 justify-between mb-4 h-[${barHeight}px] bg-[#f9f9f9] rounded-lg py-4`;

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold p-4 ml-4 ">
        {mainMainHeader?.content}
      </h1>
      <div className="w-5/6 mx-auto flex lg:flex-row flex-col items-center sm:items-start">
        {/* Bar part */}
        <div className={barClassName}>
          <div className="w-max flex flex-col  gap-4 mx-auto justify-center items-center cursor-pointer">
            {groupedWorkTeams.map((group, index) => {
              const { mainHeader, items } = group;
              const workTeamId = items[0]._id;
              return (
                <div
                  className="flex w-full mx-auto  justify-center items-center cursor-pointer "
                  key={index}
                >
                  <li
                    className="w-full  px-8 rounded-lg flex list-none capitalize cursor-pointer  z-10  justify-center  items-center   py-1  "
                    style={
                      mainHeader?.style
                        ? {
                            ...mainHeader.style,
                            color:
                              index === barSelection
                                ? mainHeader.style.hover
                                  ? mainHeader.style.hover
                                  : "#e1241b"
                                : index === hovered
                                ? mainHeader.style.hover
                                  ? mainHeader.style.hover
                                  : mainHeader.style.color
                                : mainHeader.style.color,
                          }
                        : {}
                    }
                    onClick={() => setBarSelection(index)}
                    onMouseOver={() => setHovered(index)}
                    onMouseLeave={() => setHovered(barSelection)}
                  >
                    {mainHeader?.content}
                  </li>
                  {!isModalOpen && isAdmin && (
                    <AiOutlineDown
                      className="text-lg justify-end"
                      onClick={() => {
                        openModal({
                          style: mainHeader?.style,
                          content: mainHeader?.content,
                        });
                        setContentType("mainHeader");
                        setMainHeaderId(workTeamId ?? "");
                      }}
                    />
                  )}
                  {isModalOpen &&
                    contentType === "mainHeader" &&
                    mainHeaderId === workTeamId && (
                      <StyledModal
                        key={workTeamId}
                        isOpen={isModalOpen}
                        styleData={selectedStyle}
                        onClose={() => setIsModalOpen(false)}
                        type="workTeamBar"
                        twoPictureId={id}
                        componentId={workTeamId ? workTeamId : ""}
                        contentType="mainHeader"
                        isContentSend={true}
                      />
                    )}
                </div>
              );
            })}
          </div>
        </div>
        {/* next to bar  */}
        <div className="flex  mx-auto flex-col gap-4 px-4 w-full lg:w-2/3">
          {groupedWorkTeams[barSelection] && (
            <>
              {groupedWorkTeams[barSelection].items.map((workTeam, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row  py-5  gap-5 justify-center items-center md:justify-normal md:items-start "
                >
                  {workTeam.img && (
                    <img
                      src={workTeam.img}
                      alt="explanationImage"
                      className="w-40 h-44 object-fit rounded-md"
                    />
                  )}

                  <div>
                    {/* subheaders and paragraphs */}
                    <div className="flex flex-row gap-2">
                      {/* subheaders */}
                      <div className="w-max flex flex-col gap-1 ">
                        {workTeam.subHeaders?.content?.map(
                          (subHeader, index) => (
                            <h2
                              key={index}
                              className="w-full font-[700] text-sm leading-5 text-[#212529] rounded-lg px-2  "
                              style={
                                workTeam?.subHeaders?.style
                                  ? workTeam?.subHeaders?.style
                                  : {}
                              }
                            >
                              {subHeader} :
                            </h2>
                          )
                        )}
                      </div>
                      {/* paragraphs */}
                      <div className="w-max flex flex-col gap-1 ">
                        {workTeam.paragraphs?.content?.map(
                          (paragraph, index) => (
                            <h2
                              key={index}
                              className="w-full font-[400] text-sm leading-5 text-[#212529] rounded-lg px-2  "
                              style={
                                workTeam?.paragraphs?.style
                                  ? workTeam?.paragraphs?.style
                                  : {}
                              }
                            >
                              {workTeam?.paragraphs?.content &&
                                "   " + workTeam?.paragraphs?.content[index]}
                            </h2>
                          )
                        )}
                      </div>
                    </div>

                    {/* editing part */}

                    {/* editing buttons and modals */}
                    <div className="flex flex-row gap-4">
                      {/* subheader */}
                      {isAdmin && (
                        <div className="flex flex-row justify-end gap-2 rounded-2xl py-2">
                          {!isModalOpen && (
                            <button
                              className="flex flex-row gap-1 bg-blue-500 text-white px-2  rounded-2xl hover:bg-blue-700 mr-2"
                              onClick={() => {
                                openModal({
                                  style: workTeam.subHeaders?.style,
                                  content: workTeam?.subHeaders?.content,
                                });
                                setParagraphId(workTeam._id ?? "");
                                setContentType("subHeaders");
                              }}
                            >
                              Input Style <AiOutlineDown className="my-auto" />
                            </button>
                          )}
                          {isModalOpen &&
                            contentType === "subHeaders" &&
                            paragraphId === workTeam._id && (
                              <StyledModal
                                key={workTeam._id}
                                isOpen={isModalOpen}
                                styleData={selectedStyle}
                                onClose={() => setIsModalOpen(false)}
                                type="workTeamBar"
                                twoPictureId={id}
                                componentId={workTeam._id ?? ""}
                                contentType="subHeaders"
                                isContentSend={false}
                              />
                            )}
                          {/* ContentModal for editing subHeaders */}
                          {isContentModalOpen &&
                            paragraphId === workTeam._id &&
                            contentModalContentType === "subHeaders" && (
                              <ContentModal
                                isOpen={isContentModalOpen}
                                content={contentToEdit}
                                onClose={() => setIsContentModalOpen(false)}
                                componentId={workTeam._id ?? ""}
                                type="workTeamBar"
                                contentType="subHeaders"
                                twoPictureId={id}
                              />
                            )}
                          {workTeam.subHeaders && (
                            <button
                              onClick={() => {
                                openContentModal(
                                  workTeam.subHeaders,
                                  "subHeaders"
                                );
                                setParagraphId(workTeam._id ?? "");
                              }}
                              className="flex flex-row gap-1 bg-blue-500 text-white px-2  rounded-2xl hover:bg-blue-700 mr-2"
                            >
                              Input Edit
                              <AiOutlineDown className="my-auto" />
                            </button>
                          )}
                        </div>
                      )}
                      {/* paragraphs */}
                      {isAdmin && (
                        <div className="flex flex-row justify-end gap-2 rounded-2xl py-2">
                          {!isModalOpen && (
                            <button
                              className="flex flex-row gap-1 bg-blue-500 text-white px-2  rounded-2xl hover:bg-blue-700 mr-2"
                              onClick={() => {
                                openModal({
                                  style: workTeam.paragraphs?.style,
                                  content: workTeam?.paragraphs?.content,
                                });
                                setParagraphId(workTeam._id ?? "");
                                setContentType("paragraphs");
                              }}
                            >
                              Answer Style <AiOutlineDown className="my-auto" />
                            </button>
                          )}
                          {isModalOpen &&
                            contentType === "paragraphs" &&
                            paragraphId === workTeam._id && (
                              <StyledModal
                                key={workTeam._id}
                                isOpen={isModalOpen}
                                styleData={selectedStyle}
                                onClose={() => setIsModalOpen(false)}
                                type="workTeamBar"
                                twoPictureId={id}
                                componentId={workTeam._id ?? ""}
                                contentType="paragraphs"
                                isContentSend={false}
                              />
                            )}
                          {/* ContentModal for editing paragraphs */}
                          {isContentModalOpen &&
                            paragraphId === workTeam._id &&
                            contentModalContentType === "paragraphs" && (
                              <ContentModal
                                isOpen={isContentModalOpen}
                                content={contentToEdit}
                                onClose={() => setIsContentModalOpen(false)}
                                componentId={workTeam._id ?? ""}
                                type="workTeamBar"
                                contentType="paragraphs"
                                twoPictureId={id}
                              />
                            )}
                          {workTeam.paragraphs && (
                            <button
                              onClick={() => {
                                openContentModal(
                                  workTeam.paragraphs,
                                  "paragraphs"
                                );
                                setParagraphId(workTeam._id ?? "");
                              }}
                              className="flex flex-row gap-1 bg-blue-500 text-white px-2  rounded-2xl hover:bg-blue-700 mr-2"
                            >
                              Answer Edit
                              <AiOutlineDown className="my-auto" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    {isAdmin && (
                      <button
                        className="capitalize border-2 w-fit p-2 rounded-lg mx-auto mt-4 pointer hover:bg-slate-300"
                        onClick={async () => {
                          try {
                            await dispatch(
                              deleteItemInContainer({
                                id,
                                itemId: workTeam._id ?? "",
                              })
                            );
                            setBarSelection(0);
                            window.location.reload();
                          } catch (error) {
                            console.log(error);
                          }
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      {/* Button to add new item */}
      {!isWorkTeamItem && isAdmin && (
        <div className="flex gap-2">
          <input
            className="border-2 w-16"
            type="number"
            name="quantity"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <button
            className="capitalize border-2 w-fit p-2 rounded-lg pointer hover:bg-slate-300"
            onClick={() => setIsWorkTeamItem(true)}
          >
            Add New item
          </button>
        </div>
      )}

      {isWorkTeamItem && isAdmin && (
        <div>
          {[...Array(quantity)].map((_, index) => (
            <AddWorkTeamItem
              key={index}
              isPictureContainerImage={true}
              isPictureContainerButton={false}
              isPictureContainerParagraph={true}
            />
          ))}
          <button
            className="capitalize border-2 w-fit p-2 rounded-lg pointer hover:bg-slate-300"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkTeamBar;
