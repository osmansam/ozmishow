import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
type Props = {};

const Deneme = (props: Props) => {
  const navigate = useNavigate();
  const { pageOptions } = useSelector((state: RootState) => state.twoPicture);
  return (
    <div>
      {pageOptions.map((page, index) => (
        <button
          key={index}
          className="border-2 p-2 m-2 mt-4"
          onClick={() => navigate(`/${page.pageNameEN}`)}
        >
          {page.pageNameEN}
        </button>
      ))}
      <button className="border-2 p-2 m-2 mt-4" onClick={() => navigate(`/`)}>
        Admin
      </button>
    </div>
  );
};

export default Deneme;
