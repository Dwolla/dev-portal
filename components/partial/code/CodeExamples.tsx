import styled from "@emotion/styled";
import {
  Children,
  useContext,
  cloneElement,
  useMemo,
  useState,
  useEffect,
} from "react";
import sortBy from "lodash.sortby";
import {
  CODE_BLOCK_PURPLE,
  CODE_BLOCK_AQUA,
  GREY_3,
  PURPLE_DARK,
  PURPLE_DARKER,
  GREY_5,
  CODE_BLOCK_ORANGE,
} from "../../colors";
import { getLanguage } from "../../util/groupCodeExamples";
import { LanguageContext } from "../../util/Contexts";
import highlight from "../../../modules/highlight";
import Select from "../../base/select/Select";

const SwitcherBar = styled.div`
  background-color: ${PURPLE_DARKER};
  padding: 10px 8px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  display: flex;
`;

const CodeBlock = styled.div`
  background-color: ${PURPLE_DARK};
  overflow-x: scroll;
  padding: 12px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  > pre {
    margin: 0;

    > code {
      color: ${GREY_3};

      .hljs- {
        &keyword {
          color: ${CODE_BLOCK_PURPLE};
        }
        &string {
          color: ${CODE_BLOCK_AQUA};
        }
        &meta,
        &comment {
          color: ${GREY_5};
        }
        &symbol {
          color: ${CODE_BLOCK_ORANGE};
        }
      }
    }
  }
`;

const find = (
  children: JSX.Element | JSX.Element[],
  fn: (child: JSX.Element) => boolean
) => Children.toArray(children).find(fn);

const first = (children: JSX.Element | JSX.Element[]) =>
  Children.toArray(children)[0];

const getInitialLanguage = (
  exampleLanguages: string[],
  ctxSelectedLanguage: string
) => {
  const matchingCtxSelectedLanguage = exampleLanguages.find(
    (l) => l === ctxSelectedLanguage
  );
  return matchingCtxSelectedLanguage || exampleLanguages[0];
};

const getLanguageOptions = (language: string, ctxLanguageOptions) =>
  ctxLanguageOptions.find((lo) => lo.value === language);

const codeStringFrom = (codeExample: any): any =>
  Children.only(codeExample.props.children).props.children;

export default function CodeExamples({
  children: examples,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const ctx = useContext(LanguageContext);

  const exampleLanguages: string[] = sortBy(
    Children.map(examples, getLanguage),
    (l) => ctx.languageOptions.findIndex(({ value }) => value === l)
  );

  const [selectedLanguage, setSelectedLanguage] = useState(
    getInitialLanguage(exampleLanguages, ctx.selectedLanguage.value)
  );

  // when ctx.selectedLanguage changes, setSelectedLanguage if
  // ctx.selectedLanguage is one of the exampleLanguages
  useEffect(() => {
    if (exampleLanguages.includes(ctx.selectedLanguage.value)) {
      setSelectedLanguage(ctx.selectedLanguage.value);
    }
  }, [ctx.selectedLanguage.value]);

  // when selectedLanguage changes, update the context if
  // selectedLanguage is one of the context's languageOptions
  useEffect(() => {
    const selectedLanguageOptionsFromCtx = getLanguageOptions(
      selectedLanguage,
      ctx.languageOptions
    );
    if (selectedLanguageOptionsFromCtx) {
      ctx.setSelectedLanguage(selectedLanguageOptionsFromCtx);
    }
  }, [selectedLanguage]);

  const codeExample: any =
    find(examples, (e) => getLanguage(e) === selectedLanguage) ||
    first(examples);

  const highlightedCode = useMemo(
    () => highlight(codeStringFrom(codeExample), selectedLanguage),
    [codeStringFrom(codeExample), selectedLanguage]
  );

  const codeExampleHighlighted = cloneElement(codeExample, {
    children: cloneElement(codeExample.props.children, {
      children: null,
      dangerouslySetInnerHTML: {
        __html: highlightedCode,
      },
    }),
  });

  const options = exampleLanguages.map(
    (l) => getLanguageOptions(l, ctx.languageOptions) || { value: l, label: l }
  );

  return (
    <div>
      <SwitcherBar>
        <Select
          autoWidth
          variant="code"
          options={options}
          selectedValue={options.find((o) => o.value === selectedLanguage)}
          setSelectedValue={({ value }) => setSelectedLanguage(value)}
        />
      </SwitcherBar>

      <CodeBlock>{codeExampleHighlighted}</CodeBlock>
    </div>
  );
}
