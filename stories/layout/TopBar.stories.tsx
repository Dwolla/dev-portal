import React, { useState, useContext } from "react";
import { storiesOf } from "@storybook/react";
import TopBar from "../../app/components/layout/TopBar";
import { LanguageContext } from "../../app/components/util/Contexts";

const languageOptions = [
  { value: "javascript", label: "JavaScript" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "python", label: "Python" },
  { value: "raw", label: "Raw" },
];

function LanguageContextDecorator(story) {
  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);

  return (
    <LanguageContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ selectedLanguage, setSelectedLanguage, languageOptions }}
    >
      {story()}
    </LanguageContext.Provider>
  );
}

type LanguageType = { value: String; label: String };
type LanguageContextType = {
  selectedLanguage: LanguageType;
  setSelectedLanguage: Function;
  languageOptions: Array<LanguageType>;
};

function LangaugeContextAccessor() {
  const { selectedLanguage }: LanguageContextType = useContext(LanguageContext);

  return <h2>Selected Language: {selectedLanguage.label}</h2>;
}

storiesOf("layout/TopBar", module)
  .addDecorator(LanguageContextDecorator)
  .add("default", () => (
    <TopBar
      button={{
        text: "Get API Keys",
        link: {
          href: "https://accounts-sandbox.dwolla.com/sign-up",
          external: true,
        },
      }}
    />
  ))
  .add("active link", () => (
    <TopBar
      button={{
        text: "Get API Keys",
        link: {
          href: "https://accounts-sandbox.dwolla.com/sign-up",
          external: true,
        },
      }}
    />
  ))
  .add("accessing language selection", () => (
    <>
      <TopBar
        button={{
          text: "Get API Keys",
          link: {
            href: "https://accounts-sandbox.dwolla.com/sign-up",
            external: true,
          },
        }}
      />
      <LangaugeContextAccessor />
    </>
  ))
  .add("with help component", () => (
    <TopBar
      button={{
        text: "Get API Keys",
        link: {
          href: "https://accounts-sandbox.dwolla.com/sign-up",
          external: true,
        },
      }}
      helpLinks={[
        {
          href: "https://discuss.dwolla.com/",
          text: "Developer Forum",
        },
        {
          href: "https://support.dwolla.com/s/",
          text: "Support Center",
        },
        {
          href: "https://accounts.dwolla.com/login",
          text: "Dashboard",
        },
        {
          href: "https://discuss.dwolla.com/c/api-support/other/31",
          text: "Submit Feedback",
        },
      ]}
    />
  ));
