import {
  Children,
  useContext,
  cloneElement,
  useMemo,
  useState,
  useEffect,
} from "react";
import sortBy from "lodash.sortby";
import { getLanguage } from "../../util/groupCodeExamples";
import { LanguageContext } from "../../util/Contexts";
import highlight from "../../../modules/highlight";
import Select from "../../base/select/Select";
import useCopy from "../../util/useCopy";
import {
  CodeBlockBar,
  BarText,
  CopyButton,
  CodeBlock,
} from "./CodeExamples.styled";
import { ReactComponent as CopyIcon } from "../../../assets/images/component-icons/copy-icon.svg";

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

  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const activeLanguage =
    selectedLanguage ||
    getInitialLanguage(exampleLanguages, ctx.selectedLanguage.value);

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

  const codeBlock: any =
    find(examples, (e) => getLanguage(e) === activeLanguage) || first(examples);

  const codeString = codeStringFrom(codeBlock);

  const codeHtmlHighlighted = useMemo(
    () => highlight(codeString, activeLanguage),
    [codeString, activeLanguage]
  );

  const codeBlockHighlighted = cloneElement(codeBlock, {
    children: cloneElement(codeBlock.props.children, {
      children: null,
      dangerouslySetInnerHTML: {
        __html: codeHtmlHighlighted,
      },
    }),
  });

  const options = exampleLanguages.map(
    (l) => getLanguageOptions(l, ctx.languageOptions) || { value: l, label: l }
  );

  const { copied, copy } = useCopy(codeString);

  const onlyOneExample = options.length === 1;

  return (
    <div>
      <CodeBlockBar>
        {onlyOneExample ? (
          <BarText>{activeLanguage}</BarText>
        ) : (
          <Select
            autoWidth
            variant="code"
            options={options}
            selectedValue={options.find((o) => o.value === activeLanguage)}
            setSelectedValue={({ value }) => setSelectedLanguage(value)}
          />
        )}

        <CopyButton type="button" onClick={copy} disabled={copied}>
          {copied ? "copied" : "copy"} <CopyIcon />
        </CopyButton>
      </CodeBlockBar>

      <CodeBlock>{codeBlockHighlighted}</CodeBlock>
    </div>
  );
}
