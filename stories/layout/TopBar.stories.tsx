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
      links={[
        { text: "API Docs", href: "https://docs.dwolla.com", external: true },
        { text: "Changelog", href: "/changelog" },
      ]}
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
      links={[
        { text: "API Docs", href: "https://docs.dwolla.com", external: true },
        { text: "Changelog", href: "/changelog", active: true },
      ]}
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
        links={[
          { text: "API Docs", href: "https://docs.dwolla.com", external: true },
          { text: "Changelog", href: "/changelog" },
        ]}
      />
      <LangaugeContextAccessor />
    </>
  ));
