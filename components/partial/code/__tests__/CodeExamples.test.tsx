/* eslint-disable react/jsx-curly-brace-presence */
import renderer from "react-test-renderer";
import { createElement } from "react";
import CodeExamples, { CodeExample } from "../CodeExamples";
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

test("single example", () => {
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
            <MockMDXCreateElement
              originalType="code"
              className="language-javascript"
            >
              {'const foo = "bar";'}
            </MockMDXCreateElement>
          </MockMDXCreateElement>
        </CodeExamples>
      </LanguageContext.Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("multiple examples", () => {
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
          <CodeExample language="javascript">
            {'const foo = "bar";'}
          </CodeExample>

          <MockMDXCreateElement originalType="pre">
            <MockMDXCreateElement originalType="code">
              {"plaintext goes here"}
            </MockMDXCreateElement>
          </MockMDXCreateElement>

          <MockMDXCreateElement originalType="pre">
            <MockMDXCreateElement originalType="code" className="language-ruby">
              {'foo = "bar"'}
            </MockMDXCreateElement>
          </MockMDXCreateElement>

          <MockMDXCreateElement originalType="pre">
            <MockMDXCreateElement originalType="code" className="language-php">
              {'$foo = "bar"'}
            </MockMDXCreateElement>
          </MockMDXCreateElement>

          <MockMDXCreateElement originalType="pre">
            <MockMDXCreateElement originalType="code" className="language-java">
              {'string foo = "bar"'}
            </MockMDXCreateElement>
          </MockMDXCreateElement>
        </CodeExamples>
      </LanguageContext.Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
