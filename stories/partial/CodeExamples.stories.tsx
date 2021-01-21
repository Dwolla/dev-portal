/* eslint-disable react/jsx-curly-brace-presence */
import { storiesOf } from "@storybook/react";
import { createElement } from "react";
import CodeExamples, {
  CodeExample,
} from "../../app/components/partial/code/CodeExamples";
import { LanguageContext } from "../../app/components/util/Contexts";

function MockMDXCreateElement({
  originalType,
  ...props
}: {
  children: any;
  originalType: string;
  className?: string;
}) {
  return createElement(originalType, props);
}

storiesOf("partial|CodeExamples", module)
  .addDecorator((story) => (
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
      <div style={{ padding: 20 }}>{story()}</div>
    </LanguageContext.Provider>
  ))
  .add("single example", () => (
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
  ))
  .add("multiple examples", () => (
    <CodeExamples>
      <CodeExample language="javascript">{'const foo = "bar";'}</CodeExample>

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
  ));
