import React from "react";
import { useNavigate } from "react-router-dom";
import { PageOptions } from "../../shared/types";
type Props = {};

const Deneme = (props: Props) => {
  const navigate = useNavigate();
  return (
    <div>
      {Object.keys(PageOptions).map((key) => (
        <button
          key={key}
          className="border-2 p-2 m-2 mt-4"
          onClick={() => navigate(`/${key as keyof typeof PageOptions}`)}
        >
          {key}
        </button>
      ))}
      <button className="border-2 p-2 m-2 mt-4" onClick={() => navigate(`/`)}>
        Admin
      </button>
    </div>
  );
};

export default Deneme;
