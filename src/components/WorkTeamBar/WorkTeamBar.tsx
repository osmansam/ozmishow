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
import { PictureWithStyleType, ContentStyleType } from "../../shared/types";
import StyleModalContainer from "../../hooks/styledModal/StyleModalContainer";
import ContentModalContainer from "../../hooks/contentModal/ContentModalContainer";
const WorkTeamBar = ({
  mainMainHeader,
  workTeamArray,
  id,
}: WorkTeamBarType) => {
  const dispatch = useAppDispatch();
  const [isWorkTeamItem, setIsWorkTeamItem] = useState(false);
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const [barSelection, setBarSelection] = useState(0);
  const [hovered, setHovered] = useState(Number);
  const { twoPictureArray } = useSelector(
    (state: RootState) => state.twoPicture
  );
  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value));
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
      <div className="w-5/6 mx-auto mb-4">
        <h1
          className="text-3xl font-bold  ml-4 w-fit flex flex-row gap-8 rounded-2xl px-4 py-0.5 justify-center items-center"
          style={mainMainHeader?.style}
        >
          {mainMainHeader?.content}
          <StyleModalContainer
            styleData={mainMainHeader}
            twoPictureId={id ?? ""}
            componentId={""}
            contentContainerType="mainHeader"
            isContentSend={true}
            type="mainMainHeader"
          />
        </h1>
      </div>
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
                  <StyleModalContainer
                    styleData={mainHeader}
                    twoPictureId={id}
                    componentId={workTeamId ? workTeamId : ""}
                    contentContainerType="mainHeader"
                    isContentSend={true}
                    type="workTeamBar"
                  />
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

                    {/* editing buttons and modals */}
                    <div className="flex flex-row gap-4">
                      <ContentModalContainer
                        content={workTeam.subHeaders}
                        twoPictureId={id}
                        componentId={workTeam._id ?? ""}
                        contentContainerType="subHeaders"
                        type="workTeamBar"
                      />
                      {/* paragraphs */}
                      <ContentModalContainer
                        content={workTeam.paragraphs}
                        twoPictureId={id}
                        componentId={workTeam._id ?? ""}
                        contentContainerType="paragraphs"
                        type="workTeamBar"
                      />
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
