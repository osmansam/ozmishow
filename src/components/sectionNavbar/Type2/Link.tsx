import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store";
import { setSelectedSection } from "../../../features/context/contextSlice";

type Props = {
  page: string;
};

const Link = ({ page }: Props) => {
  const dispatch = useAppDispatch();
  const { selectedSection } = useSelector((state: RootState) => state.context);

  return (
    <li
      className={`  ${selectedSection === page ? "text-[#FF6B66]" : ""}
         hover:text-[#FFA6A3]
      `}
      onClick={() => dispatch(setSelectedSection(page))}
    >
      {page}
    </li>
  );
};

export default Link;
