import { Children, useContext, useMemo, useState, useEffect } from "react";
import sortBy from "lodash.sortby";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { getLanguage } from "../../util/groupCodeExamples";
import { LanguageContext } from "../../util/Contexts";
// eslint-disable-next-line no-unused-vars
import highlight, { Language } from "../../../modules/highlight";
import Select from "../../base/select/Select";
import {
  ExpandedOverlay,
  ExpandedCodeBlock,
  CodeBlockBar,
  BarText,
  CodeBlockButton,
  CodeBlockContent,
} from "./CodeExamples.styled";
import { ReactComponent as CopyIcon } from "../../../assets/images/component-icons/copy-icon.svg";
import { ReactComponent as ExpandIcon } from "../../../assets/images/component-icons/expand.svg";
import { ReactComponent as CollapseIcon } from "../../../assets/images/component-icons/collapse.svg";
import useCopy from "../../../hooks/useCopy";
import ga from "../../../modules/ga";

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

type CodeExampleProps = { language: Language; children: string };

// eslint-disable-next-line no-unused-vars
export const CodeExample = (props: CodeExampleProps) => null;

const toCodeExampleProps = (child): CodeExampleProps => {
  if (child.type === CodeExample || child.props.mdxType === "CodeExample") {
    return child.props;
  }
  return { language: getLanguage(child), children: codeStringFrom(child) };
};

export default function CodeExamples({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const examples: CodeExampleProps[] = Children.toArray(children).map(
    toCodeExampleProps
  );

  const ctx = useContext(LanguageContext);

  const exampleLanguages: string[] = sortBy(
    examples.map((e) => e.language),
    (l) => ctx.languageOptions.findIndex(({ value }) => value === l)
  );

  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [expanded, setExpanded] = useState("");

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

  const { children: codeString, language: codeLanguage } =
    examples.find((e) => e.language === activeLanguage) || examples[0];

  const codeHtmlHighlighted = useMemo(
    () => highlight(codeString, codeLanguage),
    [codeString, codeLanguage]
  );

  const options = exampleLanguages.map(
    (l) => getLanguageOptions(l, ctx.languageOptions) || { value: l, label: l }
  );

  const { copied, copy } = useCopy(codeString);

  const onlyOneExample = options.length === 1;

  const toggleExpanded = () => {
    if (!expanded) {
      setExpanded("expanded");
      disableBodyScroll();
    } else {
      setExpanded("collapsing");
      setTimeout(() => {
        setExpanded("");
        enableBodyScroll();
      }, 280);
    }
  };

  type CodeBlockProps = {
    variant?: "default" | "fullscreen";
  };

  const CodeBlock = ({ variant = "default" }: CodeBlockProps) => (
    <>
      <CodeBlockBar className={`code-block-bar-${variant}`}>
        {onlyOneExample ? (
          <BarText>{activeLanguage}</BarText>
        ) : (
          <Select
            autoWidth
            variant="code"
            options={options}
            selectedValue={options.find((o) => o.value === activeLanguage)}
            setSelectedValue={({ value }) => {
              setSelectedLanguage(value);
              ga("code sample", "language change", value);
            }}
          />
        )}

        <CodeBlockButton type="button" onClick={copy} disabled={copied}>
          {copied ? "copied" : "copy"} <CopyIcon />
        </CodeBlockButton>

        <CodeBlockButton
          type="button"
          onClick={toggleExpanded}
          autoFocus={variant === "fullscreen"}
        >
          {variant === "fullscreen" ? (
            <>
              collapse <CollapseIcon width={16} height={16} />
            </>
          ) : (
            <>
              expand <ExpandIcon width={16} height={16} />
            </>
          )}
        </CodeBlockButton>
      </CodeBlockBar>

      <CodeBlockContent className={`code-block-${variant}`}>
        <pre>
          <code
            className={`language-${activeLanguage}`}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: codeHtmlHighlighted,
            }}
          />
        </pre>
      </CodeBlockContent>
    </>
  );

  return (
    <div>
      <>
        <CodeBlock />
      </>

      {expanded && (
        <ExpandedOverlay className={expanded}>
          <ExpandedCodeBlock className={expanded}>
            <CodeBlock variant="fullscreen" />
          </ExpandedCodeBlock>
        </ExpandedOverlay>
      )}
    </div>
  );
}
