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
import { PictureType } from "../../shared/types";

const WorkTeamBar = ({
  mainMainHeader,
  workTeamArray,
  id,
}: WorkTeamBarType) => {
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

  const dispatch = useAppDispatch();

  //handle create new explanation item
  const handleCreate = async () => {
    dispatch(updateWorkTeamBar({ container: twoPictureArray, id }));
    setIsWorkTeamItem(false);
    dispatch(resetTwoPictureArray());
    window.location.reload();
  };

  const groupedWorkTeams: { mainHeader?: string; items: Array<PictureType> }[] =
    workTeamArray.reduce(
      (
        acc: { mainHeader?: string; items: PictureType[] }[],
        curr: PictureType
      ) => {
        const existingGroup = acc.find(
          (group) => group.mainHeader === curr.mainHeader
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
      <h1 className="text-3xl font-bold p-4 ml-4 ">{mainMainHeader}</h1>
      <div className="w-5/6 mx-auto flex lg:flex-row flex-col items-center sm:items-start">
        {/* Bar part */}
        <div className={barClassName}>
          {groupedWorkTeams.map((group, index) => {
            const { mainHeader, items } = group;
            const listClassName = `list-none capitalize pointer z-10 items-center mx-auto px-4 py-1 ${
              (index === barSelection || index === hovered) && "text-[#e1241b] "
            }`;
            return (
              <div
                className="flex  justify-center items-center cursor-pointer"
                key={index}
              >
                <li
                  className={listClassName}
                  onClick={() => setBarSelection(index)}
                  onMouseOver={() => setHovered(index)}
                  onMouseLeave={() => setHovered(barSelection)}
                >
                  {mainHeader}
                </li>
              </div>
            );
          })}
        </div>
        {/* next to bar  */}
        <div className="flex  mx-auto flex-col gap-4 px-4 w-full lg:w-2/3">
          {groupedWorkTeams[barSelection] && (
            <>
              {groupedWorkTeams[barSelection].items.map((workTeam, index) => (
                <div
                  key={index}
                  className="flex md:flex-row flex-col py-5  gap-5 justify-center items-center md:justify-normal md:items-start "
                >
                  {workTeam.img && (
                    <img
                      src={workTeam.img}
                      alt="explanationImage"
                      className="w-40 h-44 object-fit rounded-md"
                    />
                  )}
                  <div>
                    {workTeam.subHeaders?.map((subHeader, index) => (
                      <div key={index} className="flex ">
                        <h2
                          className="font-[700] text-sm leading-5  "
                          style={{ color: "#212529" }}
                        >
                          {subHeader}
                          <span
                            className="font-[400] ml-2 text-sm leading-5 "
                            style={{ color: "#212529" }}
                          >
                            {workTeam.paragraphs &&
                              "   " + workTeam.paragraphs[index]}
                          </span>
                        </h2>
                      </div>
                    ))}
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
