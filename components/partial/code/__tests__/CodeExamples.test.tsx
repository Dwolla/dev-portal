import renderer from "react-test-renderer";
import { createElement } from "react";
import CodeExamples from "../CodeExamples";
import { LanguageContext } from "../../../util/Contexts";

function MockMDXCreateElement(props: {
  children: any;
  originalType: string;
  id?: string;
  className?: string;
}) {
  return createElement(props.originalType, {
    children: props.children,
    id: props.id,
  });
}

test("CodeExamples", () => {
  const tree = renderer
    .create(
      <LanguageContext.Provider
        value={{
          selectedLanguage: { value: "php", label: "PHP" },
          setSelectedLanguage: () => {},
          languageOptions: [
            { value: "java", label: "Java" },
            { value: "php", label: "PHP" },
          ],
        }}
      >
        <CodeExamples>
          <MockMDXCreateElement originalType="pre">
            <MockMDXCreateElement originalType="code" className="language-php">
              code example A
            </MockMDXCreateElement>
          </MockMDXCreateElement>

          <MockMDXCreateElement originalType="pre">
            <MockMDXCreateElement originalType="code" className="language-java">
              code example B
            </MockMDXCreateElement>
          </MockMDXCreateElement>
        </CodeExamples>
      </LanguageContext.Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
