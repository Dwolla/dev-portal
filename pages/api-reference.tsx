/* eslint-disable react/jsx-indent */
import React from "react";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";

import Content from "../app/modules/content";

type Props = {
  apiReference: RenderedAPIReference;
};

const renderParams = (params) =>
  Object.keys(params).reduce((acc, key) => {
    return `${acc}${acc ? "," : ""}\n  ${key} = "value"`;
  }, "");

export default function APIReference({ apiReference }: Props) {
  const [selectedMethods, setSelectedMethods] = React.useState({});

  // console.log(apiReference, "after");

  return (
    <>
      {apiReference.apis.map(({ renderedBody, id, meta }) => {
        const selectedMethod =
          typeof apiReference.methods[id] !== "undefined"
            ? apiReference.methods[id].find(
                (m) => m.id === selectedMethods[id]
              ) || apiReference.methods[id][0]
            : null;

        // console.log(apiReference.methods[id], id);

        return (
          <>
            <h2 id={`heading-${id?.replace(/\//g, "--")}`}>
              {meta.name || id}
            </h2>

            {renderedBody === false
              ? "there was an error rendering this api"
              : hydrate(renderedBody, { components: {} })}

            {selectedMethod && apiReference.methods[id] && (
              <>
                <h4>Methods</h4>
                <select
                  value={selectedMethods[id]}
                  onChange={(e) => {
                    setSelectedMethods({
                      ...selectedMethods,
                      [id]: e.target.value,
                    });
                  }}
                >
                  {apiReference.methods[id].map((m) => {
                    return <option value={m.id}>{m.id}</option>;
                  })}
                </select>
                <div style={{ background: "#eee" }}>
                  <pre style={{ background: "black", color: "#eee" }}>
                    dwolla.{meta.name.toLowerCase()}.{selectedMethod.meta.name}(
                    {renderParams(selectedMethod.meta.params)}
                    <br />)
                  </pre>

                  {selectedMethod.renderedBody === false
                    ? "there was an error rendering this method"
                    : hydrate(selectedMethod.renderedBody, { components: {} })}
                </div>
              </>
            )}
          </>
        );
      })}
    </>
  );
}

const renderContent = async (c: Content): Promise<RenderedContent> => {
  const renderedBody = await renderToString(c.rawBody, {
    components: {},
  }).catch(() => false);
  return { ...c, renderedBody };
};

export async function getStaticProps(): Promise<{ props: Props }> {
  const apiReference = await Content.getApiReference();

  // console.log(apiReference, "before");

  const apis: RenderedContent[] = await Promise.all(
    apiReference.apis.map(renderContent)
  );

  const methods = await Object.keys(apiReference.methods).reduce(
    async (acc, next) => {
      const rendered = await Promise.all(
        apiReference.methods[next].map(renderContent)
      );
      const awaitAcc = await acc;
      const now = { ...awaitAcc, [next]: rendered };
      // console.log(acc, "acc");
      // console.log(now, "now\n\n\n\n");
      return now;
    },
    {}
  );

  return { props: { apiReference: { apis, methods } } };
}
