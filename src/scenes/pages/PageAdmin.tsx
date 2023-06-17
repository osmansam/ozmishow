import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import {
  getPageTwoPictures,
  updateTwoPicture,
  deleteTwoPicture,
  updatePageAndLanguage,
} from "../../features/twoPicture/twoPictureSlice";
import { LanguageOptions, PageOptionsType } from "../../shared/types";
import PictureAtLeft from "../../components/pictureleft/PictureAtLeft";
import PictureAtRight from "../../components/pictureRight/PictureAtRight";
import IconExplainContainer from "../../components/IconExplain/IconExplainContainer";
import TwoPictureContainer from "../../components/twoPicture/TwoPictureContainer";
import { ContainerType } from "../../shared/types";
import MaximContainer from "../../components/maxim";
import BorderBoxContainer from "../../components/borderBox/BorderBoxContainer";
import NewsContainer from "../../components/news/NewsContainer";
import ExplanationBar from "../../components/ExplanationBar";
import PageBanner from "../../components/PageBanner/PageBanner";
import WorkTeamBar from "../../components/WorkTeamBar/WorkTeamBar";
import FreqAsked from "../../components/freqAsked/FreqAsked";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar";
import Footer from "../../components/footer";
import ContactFormEn from "../../components/contactForm/ContactFormEn";
import ContactFormTr from "../../components/contactForm/ContactFormTr";
import Map from "../../components/map";
import ContactContainer from "../../components/contactContainer/ContactContainer";
import FullPageItem from "../../components/fullPageItem";

interface Props {
  page: string;
}
interface PageConfigurationButtonsProps {
  index: number;
  moveItem: (index: number, direction: "up" | "down") => void;
  disableMoveUp: boolean;
  disableMoveDown: boolean;
  id: string;
  pageOptions: Array<PageOptionsType>;
  language: string;
}
// the buttons for the admin page configuration
const PageConfigurationButtons: React.FC<PageConfigurationButtonsProps> = ({
  index,
  moveItem,
  disableMoveUp,
  disableMoveDown,
  id,
  pageOptions,
  language,
}) => {
  const [updatePage, setUpdatePage] = useState(pageOptions[0].pageNameEN);
  const [updateLanguage, setUpdateLanguage] = useState(language);

  const dispatch = useAppDispatch();
  return (
    <div className="pt-4 flex flex-col">
      {/* move the container up and down */}
      <div className="flex flex-row gap-6">
        <button
          className="border-2 m-2"
          disabled={disableMoveUp}
          onClick={() => moveItem(index, "up")}
        >
          Move Up
        </button>
        <button
          className="border-2 m-2"
          disabled={disableMoveDown}
          onClick={() => moveItem(index, "down")}
        >
          Move Down
        </button>
        {/* Delete Container */}
        <button
          className="border-2 m-2"
          onClick={async () => {
            await dispatch(deleteTwoPicture(id));
            window.location.reload();
          }}
        >
          Delete
        </button>
      </div>
      {/* change page and language  */}
      <div className="flex flex-row gap-6  w-1/3 ">
        <select
          className="border-2 m-2"
          onChange={(e) => {
            setUpdatePage(e.target.value);
          }}
        >
          {pageOptions.map((page, index) => (
            <option key={index} value={page.pageNameEN}>
              {page.pageNameEN}
            </option>
          ))}
        </select>
        <select
          className="border-2 m-2 w-1/3"
          onChange={(e) => {
            setUpdateLanguage(e.target.value);
            console.log(e.target.value);
          }}
        >
          {Object.entries(LanguageOptions).map(([value, label]) => (
            <option
              key={value}
              value={LanguageOptions[label as keyof typeof LanguageOptions]}
            >
              {label}
            </option>
          ))}
        </select>
        <button
          className="capitalize border-2 w-fit p-2 rounded-lg mx-auto mt-4 pointer hover:bg-slate-300"
          onClick={() => {
            console.log(updateLanguage);
            dispatch(
              updatePageAndLanguage({
                id,
                page: updatePage,
                language: updateLanguage,
              })
            );
            window.location.reload();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const PageAdmin = ({ page }: Props) => {
  const dispatch = useAppDispatch();
  const [newContainer, setNewContainer] = useState<ContainerType[]>([]);
  const { language, isSidebarOpen } = useSelector(
    (state: RootState) => state.context
  );
  const { container, pageOptions } = useSelector(
    (state: RootState) => state.twoPicture
  );
  // make the page top and took the containers from database

  useEffect(() => {
    dispatch(getPageTwoPictures(page));
    window.scrollTo(0, 0);
  }, [dispatch, page]);

  // filter the container by language and then sort it
  useEffect(() => {
    if (container.length > 0) {
      let filteredContainer = container.filter((c) => c.language === language);
      let sortedContainer = filteredContainer.sort(
        (a, b) => a.position - b.position
      );
      setNewContainer(sortedContainer);
    }
  }, [container, language]);
  // render containers by the component name
  const renderComponents = () => {
    const moveItem = (index: number, direction: "up" | "down") => {
      if (direction === "up" && index > 0) {
        setNewContainer((prev) => {
          const updatedContainer = prev.map((c) => ({ ...c })); // create new objects
          const temp = updatedContainer[index];
          updatedContainer[index] = updatedContainer[index - 1];
          updatedContainer[index - 1] = temp;
          updatedContainer.forEach((c, i) => {
            c.position = i;
            dispatch(updateTwoPicture(c));
          });

          return updatedContainer;
        });
      } else if (direction === "down" && index < newContainer.length - 1) {
        setNewContainer((prev) => {
          const updatedContainer = prev.map((c) => ({ ...c })); // create new objects
          const temp = updatedContainer[index];
          updatedContainer[index] = updatedContainer[index + 1];
          updatedContainer[index + 1] = temp;
          updatedContainer.forEach((c, i) => {
            c.position = i;
            dispatch(updateTwoPicture(c));
          });
          return updatedContainer;
        });
      }
    };

    return newContainer?.map((item, index) => {
      if (item && item.componentName) {
        const { mainHeader, twoPictureArray, _id } = item;

        switch (item.componentName) {
          case "PictureAtRight":
            return (
              <div key={index}>
                <PictureAtRight {...twoPictureArray[0]} />
                <PageConfigurationButtons
                  index={index}
                  moveItem={moveItem}
                  disableMoveUp={index === 0}
                  disableMoveDown={index === newContainer.length - 1}
                  id={_id ? _id : ""}
                  pageOptions={pageOptions}
                  language={language}
                />
              </div>
            );
          case "PictureAtLeft":
            return (
              <div key={index}>
                <PictureAtLeft {...twoPictureArray[0]} />
                <PageConfigurationButtons
                  index={index}
                  moveItem={moveItem}
                  disableMoveUp={index === 0}
                  disableMoveDown={index === newContainer.length - 1}
                  id={_id ? _id : ""}
                  pageOptions={pageOptions}
                  language={language}
                />
              </div>
            );
          case "TwoPictureContainer":
            return (
              <div key={index}>
                <TwoPictureContainer
                  mainHeader={item.mainHeader}
                  twoPictureArray={twoPictureArray}
                />
                <PageConfigurationButtons
                  index={index}
                  moveItem={moveItem}
                  disableMoveUp={index === 0}
                  disableMoveDown={index === newContainer.length - 1}
                  id={_id ? _id : ""}
                  pageOptions={pageOptions}
                  language={language}
                />
              </div>
            );
          case "IconExplainContainer":
            return (
              <div key={index}>
                <IconExplainContainer
                  mainHeader={mainHeader}
                  iconExplainArray={twoPictureArray}
                />
                <PageConfigurationButtons
                  index={index}
                  moveItem={moveItem}
                  disableMoveUp={index === 0}
                  disableMoveDown={index === newContainer.length - 1}
                  id={_id ? _id : ""}
                  pageOptions={pageOptions}
                  language={language}
                />
              </div>
            );
          case "MaximContainer":
            return (
              <div key={index}>
                <MaximContainer {...twoPictureArray[0]} />
                <PageConfigurationButtons
                  index={index}
                  moveItem={moveItem}
                  disableMoveUp={index === 0}
                  disableMoveDown={index === newContainer.length - 1}
                  id={_id ? _id : ""}
                  pageOptions={pageOptions}
                  language={language}
                />
              </div>
            );
          case "BorderBoxContainer":
            return (
              <div key={index}>
                <BorderBoxContainer
                  mainHeader={mainHeader}
                  twoPictureArray={twoPictureArray}
                />
                <PageConfigurationButtons
                  index={index}
                  moveItem={moveItem}
                  disableMoveUp={index === 0}
                  disableMoveDown={index === newContainer.length - 1}
                  id={_id ? _id : ""}
                  pageOptions={pageOptions}
                  language={language}
                />
              </div>
            );
          case "NewsContainer":
            return (
              <div key={index}>
                <NewsContainer
                  id={item && item._id ? item._id : ""}
                  mainHeader={mainHeader}
                  newsArray={twoPictureArray}
                  page={page}
                />
                <PageConfigurationButtons
                  index={index}
                  moveItem={moveItem}
                  disableMoveUp={index === 0}
                  disableMoveDown={index === newContainer.length - 1}
                  id={_id ? _id : ""}
                  pageOptions={pageOptions}
                  language={language}
                />
              </div>
            );
          case "ExplanationBar":
            return (
              <div key={index}>
                <ExplanationBar
                  id={item && item._id ? item._id : ""}
                  mainMainHeader={mainHeader}
                  explanationArray={twoPictureArray}
                />
                <PageConfigurationButtons
                  index={index}
                  moveItem={moveItem}
                  disableMoveUp={index === 0}
                  disableMoveDown={index === newContainer.length - 1}
                  id={_id ? _id : ""}
                  pageOptions={pageOptions}
                  language={language}
                />
              </div>
            );
          case "PageBanner":
            return (
              <div key={index}>
                <PageBanner {...twoPictureArray[0]} />
                <PageConfigurationButtons
                  index={index}
                  moveItem={moveItem}
                  disableMoveUp={index === 0}
                  disableMoveDown={index === newContainer.length - 1}
                  id={_id ? _id : ""}
                  pageOptions={pageOptions}
                  language={language}
                />
              </div>
            );
          case "FrequentlyAskedQuestions":
            return (
              <div key={index}>
                <FreqAsked
                  id={item && item._id ? item._id : ""}
                  freqAskedArray={twoPictureArray}
                />
                <PageConfigurationButtons
                  index={index}
                  moveItem={moveItem}
                  disableMoveUp={index === 0}
                  disableMoveDown={index === newContainer.length - 1}
                  id={_id ? _id : ""}
                  pageOptions={pageOptions}
                  language={language}
                />
              </div>
            );
          case "WorkTeamBar":
            return (
              <div key={index}>
                <WorkTeamBar
                  id={item && item._id ? item._id : ""}
                  mainMainHeader={mainHeader}
                  workTeamArray={twoPictureArray}
                />
                <PageConfigurationButtons
                  index={index}
                  moveItem={moveItem}
                  disableMoveUp={index === 0}
                  disableMoveDown={index === newContainer.length - 1}
                  id={_id ? _id : ""}
                  pageOptions={pageOptions}
                  language={language}
                />
              </div>
            );
          case "ContactFormEn":
            return (
              <div key={index}>
                <ContactFormEn />
                <PageConfigurationButtons
                  index={index}
                  moveItem={moveItem}
                  disableMoveUp={index === 0}
                  disableMoveDown={index === newContainer.length - 1}
                  id={_id ? _id : ""}
                  pageOptions={pageOptions}
                  language={language}
                />
              </div>
            );
          case "ContactFormTr":
            return (
              <div key={index}>
                <ContactFormTr />
                <PageConfigurationButtons
                  index={index}
                  moveItem={moveItem}
                  disableMoveUp={index === 0}
                  disableMoveDown={index === newContainer.length - 1}
                  id={_id ? _id : ""}
                  pageOptions={pageOptions}
                  language={language}
                />
              </div>
            );
          case "Map":
            return (
              <div key={index}>
                <Map />
                <PageConfigurationButtons
                  index={index}
                  moveItem={moveItem}
                  disableMoveUp={index === 0}
                  disableMoveDown={index === newContainer.length - 1}
                  id={_id ? _id : ""}
                  pageOptions={pageOptions}
                  language={language}
                />
              </div>
            );
          case "ContactContainer":
            return (
              <div key={index}>
                <ContactContainer />
                <PageConfigurationButtons
                  index={index}
                  moveItem={moveItem}
                  disableMoveUp={index === 0}
                  disableMoveDown={index === newContainer.length - 1}
                  id={_id ? _id : ""}
                  pageOptions={pageOptions}
                  language={language}
                />
              </div>
            );
          case "FullPageItem":
            return (
              <div key={index}>
                <FullPageItem
                  mainMainHeader={mainHeader}
                  fullPageItemArray={twoPictureArray}
                  id={item && item._id ? item._id : ""}
                />
                <PageConfigurationButtons
                  index={index}
                  moveItem={moveItem}
                  disableMoveUp={index === 0}
                  disableMoveDown={index === newContainer.length - 1}
                  id={_id ? _id : ""}
                  pageOptions={pageOptions}
                  language={language}
                />
              </div>
            );
          default:
            return null;
        }
      }
    });
  };

  const currentPage = pageOptions.find((item) => item.pageNameEN === page);

  return (
    <div className="flex flex-col h-full min-h-screen">
      {currentPage?.isNavbar && (
        <div>
          {isSidebarOpen && (
            <Sidebar currentPage={currentPage ? currentPage.pageNameEN : ""} />
          )}
          <Navbar currentPage={currentPage ? currentPage.pageNameEN : ""} />
        </div>
      )}
      {renderComponents()}
      {currentPage?.isNavbar && (
        <Footer currentPage={currentPage ? currentPage.pageNameEN : ""} />
      )}
    </div>
  );
};

export default PageAdmin;
