import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store";
import { setSelectedSection } from "../../../features/context/contextSlice";
import AnchorLink from "react-anchor-link-smooth-scroll";

type Props = {
  page: string;
};

const Link = ({ page }: Props) => {
  const dispatch = useAppDispatch();
  const { selectedSection } = useSelector((state: RootState) => state.context);

  return (
    <AnchorLink
      className={`${selectedSection === page ? "text-[#FF6B66]" : ""}
         hover:text-[#FFA6A3]
      `}
      href={`#${page}`}
      onClick={() => dispatch(setSelectedSection(page))}
    >
      {page}
    </AnchorLink>
  );
};

export default Link;
