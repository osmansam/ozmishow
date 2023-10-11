import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { getNavbar } from "../../features/twoPicture/twoPictureSlice";
import {
  createFooter,
  getFooter,
} from "../../features/twoPicture/twoPictureSlice";
import { useNavigate } from "react-router-dom";
import { GoLocation } from "react-icons/go";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { FaFax } from "react-icons/fa";
import { LanguageOptions, PageOptionsType } from "../../shared/types";
import AddFooter from "./AddFooter";
import translations from "../../translations.json";

type Props = {
  currentPage?: string;
};

const Footer = ({ currentPage }: Props) => {
  const dispatch = useAppDispatch();
  const { footer, pageOptions } = useSelector(
    (state: RootState) => state.twoPicture
  );
  const { isAdmin, language } = useSelector(
    (state: RootState) => state.context
  );
  const navigate = useNavigate();
  const [isAddFooter, setIsAddFooter] = useState(false);
  //get the footer data
  const [activeMotherPage, setActiveMotherPage] = useState<string>("");
  useEffect(() => {
    setIsAddFooter(false);
    dispatch(getFooter());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getNavbar());
  }, [dispatch]);
  useEffect(() => {
    setActiveMotherPage(""); // Reset activeMotherPage when currentPage changes
  }, [currentPage]);
  const getSubpages = (motherPage: string) => {
    return pageOptions.filter(
      (item) =>
        item.motherPageEN === motherPage || item.motherPageTR === motherPage
    );
  };

  const renderSubpages = (subpages: PageOptionsType[]) => {
    return subpages.map((subpage, index) => (
      <li
        key={index}
        className={`p-2 m-2 mt-4 text-xs uppercase cursor-pointer hover:underline ${
          currentPage === subpage.pageNameEN
            ? "text-white rounded-md hover:no-underline"
            : "text-[#888888]"
        }`}
        onClick={() => navigate(`/${subpage.pageNameEN}`)}
      >
        {language === LanguageOptions.EN
          ? subpage.pageNameEN
          : subpage.pageNameTR}
      </li>
    ));
  };

  const renderNavigationLinks = () => {
    return pageOptions.map((page, index) => {
      if (page.isNavbar) {
        const subpages = getSubpages(page.pageNameEN);
        const isActiveMotherPage = activeMotherPage === page.pageNameEN;
        return (
          <React.Fragment key={index}>
            <li
              className={`p-2 m-2 mt-4  uppercase cursor-pointer hover:underline ${
                currentPage === page.pageNameEN
                  ? "text-white rounded-md hover:no-underline"
                  : "text-[#888888]"
              }`}
              onClick={() => {
                if (subpages.length > 0) {
                  setActiveMotherPage(
                    isActiveMotherPage ? "" : page.pageNameEN
                  );
                } else {
                  navigate(`/${page.pageNameEN}`);
                }
              }}
            >
              {language === LanguageOptions.EN
                ? page.pageNameEN
                : page.pageNameTR}
            </li>
            {isActiveMotherPage && (
              <ul className="pl-4">{renderSubpages(subpages)}</ul>
            )}
          </React.Fragment>
        );
      } else {
        return null;
      }
    });
  };

  const navigationLinks = renderNavigationLinks();

  return (
    <footer className="h-full lg:h-48 bg-black mt-auto">
      <div className="flex flex-col gap-5">
        <ul className="flex flex-row flex-wrap justify-between mx-auto w-5/6">
          {navigationLinks}
        </ul>
        {/* Adress and tel fax email */}
        <div className="flex flex-row flex-wrap gap-6  w-5/6 mx-auto">
          {/* Adress */}
          <div className="flex flex-row gap-10 ">
            {/* icon */}
            <div className="flex flex-row gap-2">
              <GoLocation className="w-8 h-6" style={{ color: "#888888" }} />
              <h2 className="text-[#888888]">
                {translations[language as keyof typeof translations]?.address}
              </h2>
            </div>

            {/* adress info */}
            <p className="text-sm flex flex-wrap w-1/2 text-[#888888] leading-8">
              {footer?.adress}
            </p>
          </div>
          {/* tel fax email */}
          <div className="flex flex-col gap-4">
            {/* tel */}
            <div className="flex flex-row gap-4">
              <BsTelephone className="w-8 h-6" style={{ color: "#888888" }} />
              <h2 className="text-[#888888]">
                {translations[language as keyof typeof translations]?.phone}
              </h2>
              <p className="text-sm text-[#888888]">{footer?.phone}</p>
            </div>
            {/* fax */}
            <div className="flex flex-row gap-4">
              <FaFax className="w-8 h-6" style={{ color: "#888888" }} />
              <h2 className="text-[#888888]">Fax:</h2>
              <p className="text-sm text-[#888888]">{footer?.fax}</p>
            </div>
            {/* email */}
            <div className="flex flex-row gap-4">
              <AiOutlineMail className="w-8 h-6" style={{ color: "#888888" }} />
              <h2 className="text-[#888888]">
                {translations[language as keyof typeof translations]?.email}
              </h2>
              <p className="text-sm text-[#888888]">{footer?.email}</p>
            </div>
          </div>
        </div>
        {!isAddFooter && isAdmin && (
          <button
            className="capitalize border-2 w-fit py-4 rounded-lg mx-auto pointer hover:bg-slate-300"
            onClick={() => setIsAddFooter(true)}
          >
            Change Footer info
          </button>
        )}
        {isAddFooter && isAdmin && (
          <div>
            <AddFooter setIsAddFooter={setIsAddFooter} />
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
