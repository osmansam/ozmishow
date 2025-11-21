// Quick verification script to check all components are registered
import { getComponentConfig } from "./componentRegistry";

const componentsToCheck = [
  // From old switch statement
  { name: "BackgroundHeader", type: undefined },
  { name: "BorderBoxContainer", type: undefined },
  { name: "Carousel", type: undefined },
  { name: "Carousel", type: "type1" },
  { name: "ContactContainer", type: undefined },
  { name: "ContactFormEn", type: undefined },
  { name: "ContactFormTr", type: undefined },
  { name: "ExplanationBar", type: undefined },
  { name: "FrequentlyAskedQuestions", type: "type1" },
  { name: "FrequentlyAskedQuestions", type: "type2" },
  { name: "FullPageItem", type: undefined },
  { name: "FullPageItem", type: "type1" },
  { name: "IconExplainContainer", type: "type1" },
  { name: "IconExplainContainer", type: "type2" },
  { name: "Map", type: undefined },
  { name: "MaximContainer", type: undefined },
  { name: "NewsContainer", type: "type1" },
  { name: "NewsContainer", type: "type2" },
  { name: "PageBanner", type: undefined },
  { name: "PictureAndText", type: "type1" },
  { name: "PictureAndText", type: "type2" },
  { name: "PictureAndText", type: "type3" },
  { name: "PictureAndText", type: "type4" },
  { name: "PictureAndText", type: "type5" },
  { name: "PictureAndText", type: "type6" },
  { name: "ProgressBar", type: undefined },
  { name: "ResumeBox", type: undefined },
  { name: "ResumeIcon", type: undefined },
  { name: "Slider", type: "type1" },
  { name: "Slider", type: "type2" },
  { name: "SpeedReader", type: undefined },
  { name: "TwoPictureContainer", type: "type1" },
  { name: "TwoPictureContainer", type: "type2" },
  { name: "TypingEffectContainer", type: undefined },
  { name: "WorkTeamBar", type: undefined },
  { name: "YoutubeVideo", type: undefined },
];

console.log("Checking component registrations...\n");

let missing = 0;
let found = 0;

componentsToCheck.forEach(({ name, type }) => {
  const config = getComponentConfig(name, type);
  const key = type ? `${name}:${type}` : name;
  
  if (config) {
    found++;
    console.log(`✅ ${key}`);
  } else {
    missing++;
    console.log(`❌ MISSING: ${key}`);
  }
});

console.log(`\n\nSummary: ${found} found, ${missing} missing`);

if (missing === 0) {
  console.log("✅ All components are registered!");
} else {
  console.log(`⚠️  ${missing} components are missing from the registry`);
}
