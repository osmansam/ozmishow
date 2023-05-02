import React from "react";
import PictureAtRight from "../../components/PictureAtRight";
import PictureAtLeft from "../../components/PictureAtLeft";
import ChessImage from "../../assets/chessvangogh.jpg";
import WhiteButton from "../../components/WhiteButton";
import HText from "../../shared/Htext";
import FreqAsked from "../../components/FreqAsked";
import BorderBox from "../../components/BorderBox";
import IconExplain from "../../components/IconExplain";
import TwoPictureContainer from "../../components/TwoPictureContainer";
import IconExplainContainer from "../../components/IconExplainContainer";
import HeaderAndText from "../../components/HeaderAndText";
import NewsBox from "../../components/news/NewsBox";
import Maxim from "../../components/maxim";
import {
  IconExplainContainerType,
  TwoPictureContainerType,
  TwoPictureType,
} from "../../shared/types";
type Props = {};
const data: TwoPictureContainerType = {
  mainHeader: "Earn money with Uber",
  twoPictureArray: [
    {
      img: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_1116,h_744/v1597153245/assets/f3/d748e5-9df6-4841-8b9d-e3c5436412c4/original/UberIM_20079-large-1-3_2.jpg",

      header: "Drive with Uber",
      paragraphs: [
        "Make the most of your time on the road on the platform with the largest network of active riders.",
      ],
      buttons: ["Sign up to drive"],
    },
    {
      img: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_1116,h_744/v1597153245/assets/f3/d748e5-9df6-4841-8b9d-e3c5436412c4/original/UberIM_20079-large-1-3_2.jpg",

      header: "Drive with Uber",
      paragraphs: [
        "Make the most of your time on the road on the platform with the largest network of active riders.",
      ],
      buttons: ["Sign up to drive"],
    },
  ],
};
const icon: IconExplainContainerType = {
  mainHeader: "Company info",
  iconExplainArray: [
    {
      img: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_720,h_480/v1555540623/assets/cb/9b789f-167d-4a57-ac3a-c23060bfa9e8/original/170830_DaraAllHands_0I7A9940_R2.jpg",
      header: "Who's driving Uber",
      paragraphs: [
        "We’re building a culture within Uber that emphasizes doing the right thing, period, for riders, drivers, and employees. Find out more about the team that’s leading the way.",
      ],
      buttons: ["See our leadership"],
    },
    {
      img: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_720,h_480/v1555540623/assets/cb/9b789f-167d-4a57-ac3a-c23060bfa9e8/original/170830_DaraAllHands_0I7A9940_R2.jpg",
      header: "Who's driving Uber",
      paragraphs: [
        "We’re building a culture within Uber that emphasizes doing the right thing, period, for riders, drivers, and employees. Find out more about the team that’s leading the way.",
      ],
      buttons: ["See our leadership"],
    },
    {
      header: "Who's driving Uber",
      paragraphs: [
        "We’re building a culture within Uber that emphasizes doing the right thing, period, for riders, drivers, and employees. Find out more about the team that’s leading the way.",
      ],
      buttons: ["See our leadership"],
    },
  ],
};
const dataThree: TwoPictureType = {
  img: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_1116,h_744/v1597153245/assets/f3/d748e5-9df6-4841-8b9d-e3c5436412c4/original/UberIM_20079-large-1-3_2.jpg",
  header: "Drive with Uber",
  paragraphs: [
    "Make the most of your time on the road on the platform with the largest network of active riders.",
  ],
  buttons: ["Sign up to drive"],
};

const Deneme = (props: Props) => {
  return (
    <div>
      <div className="h-fit ">
        <PictureAtRight {...dataThree}></PictureAtRight>
      </div>
      <div className="mt-8 bg-black h-40 items-center flex justify-center">
        <WhiteButton
          text="Learn more about Lime"
          textColor="text-black"
          backgroundColor="bg-white"
          backgroundColorHover="bg-whiteButtonBackground"
        ></WhiteButton>
      </div>
      <div className="mt-8 bg-whiteButtonBackground h-40 items-center flex justify-center">
        <WhiteButton
          text="Learn more about Lime"
          textColor="text-white"
          backgroundColor="bg-black"
          backgroundColorHover="bg-blackButtonBackground"
        ></WhiteButton>
      </div>
      <div className="w-5/6  h-full my-8 mx-auto">
        <BorderBox img={ChessImage} header="Driver safety"></BorderBox>
      </div>

      <div className="w-5/6  h-full my-8 mx-auto">
        <HText>Frequently asked questions</HText>
        <div className="mt-12">
          <FreqAsked
            text="How do I create an account?"
            description="Download the Uber app from the App Store or Google Play, then create an account with your email address and mobile phone number. A payment method is also needed before you can request a ride."
            message="How to create an account"
          ></FreqAsked>
          <FreqAsked
            text="How do I create an account?"
            description="Download the Uber app from the App Store or Google Play, then create an account with your email address and mobile phone number. A payment method is also needed before you can request a ride."
            message="How to create an account"
          ></FreqAsked>
        </div>
      </div>
      <div className="h-full">
        <PictureAtLeft
          img={
            "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_1076,h_717/v1602280707/assets/ca/8ba51a-ac4a-438d-a62e-776bf6920c1a/original/Reserve_Web-4_Trip.jpg"
          }
          header="Reserve a ride that's ready when you are"
          paragraphs={[
            "Now more than ever, reservations are a way of life. Reserve a premium Uber experience, up to 30 days in advance, for whenever you’re ready to ride.",
          ]}
          buttons={["Learn more"]}
        ></PictureAtLeft>
      </div>

      <div className="h-full">
        <PictureAtRight
          img={
            "https://www.uber-assets.com/image/upload/q_auto:eco,c_fill,w_1116,h_744/v1555433729/assets/13/b383de-93a1-4327-8812-91de86e3edd9/original/_background-01.svg"
          }
          header="Your safety drives us"
          paragraphs={[
            "Whether you’re in the back seat or behind the wheel, your safety is essential. We are committed to doing our part, and technology is at the heart of our approach. We partner with safety advocates and develop new technologies and systems to help improve safety and help make it easier for everyone to get around.",
          ]}
          buttons={["Learn more"]}
        ></PictureAtRight>
      </div>
      <div className="w-5/6 flex flex-wrap  h-full  mx-auto py-10 md:py-20">
        <NewsBox
          img={ChessImage}
          header="Uber team up on driver charging as EV momentum"
        ></NewsBox>
        <NewsBox
          img={ChessImage}
          header="Uber team up on driver charging as EV momentum"
        ></NewsBox>
        <NewsBox
          img={ChessImage}
          header="Uber team up on driver charging as EV momentum"
        ></NewsBox>
        <NewsBox
          img={ChessImage}
          header="Uber team up on driver charging as EV momentum"
        ></NewsBox>
        <NewsBox
          img={ChessImage}
          header="Uber team up on driver charging as EV momentum"
        ></NewsBox>
      </div>
      <Maxim
        header="“Uber is the single best advancement for the mobility of blind people in the past decade.”"
        writer="Mike May, Former President, the Lighthouse for the Blind"
      ></Maxim>

      <HeaderAndText
        mainHeader="We reimagine the way the world moves for the better"
        paragraphs={[
          "Movement is what we power. It’s our lifeblood. It runs through our veins. It’s what gets us out of bed each morning. It pushes us to constantly reimagine how we can move better. For you. For all the places you want to go. For all the things you want to get. For all the ways you want to earn. Across the entire world. In real time. At the incredible speed of now.",
        ]}
      ></HeaderAndText>
    </div>
  );
};

export default Deneme;
