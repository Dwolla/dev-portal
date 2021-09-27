/* eslint-disable no-shadow */
/* eslint-disable react/jsx-indent */
import React from "react";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";

import Content from "../app/modules/content";

type Props = {
  apiReference: RenderedAPIReference;
};

const renderParams = (params) =>
  Object.keys(params).reduce((acc, key) => {
    return `${acc}${acc ? "," : ""}\n  ${key} = "value"`;
  }, "");

export default function APIReference({ apiReference }: Props) {
  // const [selectedSubsections, setSelectedSubsections] = React.useState({});
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

        // console.log("line 32:", apiReference.methods[id]);
        // console.log("selectedMethod", selectedMethod);

        return (
          <>
            <h2 id={`heading-${id?.replace(/\//g, "--")}`}>
              {meta.name || id}
            </h2>

            {renderedBody === false ? (
              "there was an error rendering this api"
            ) : (
              <MDXRemote {...renderedBody} />
            )}
            {/* {selectedMethod && apiReference.subsections[id] && ( */}
            {apiReference.subsections[id] && (
              <>
                <h4>Here are the Subsections</h4>
                {apiReference.subsections[id].map((m) => {
                  return (
                    <div style={{ background: "#eee" }}>
                      <h2 id={`heading-${id?.replace(/\//g, "--")}`}>
                        {m.meta.name || id}
                      </h2>
                      {m.renderedBody === false ? (
                        "there was an error rendering this method"
                      ) : (
                        <MDXRemote {...m.renderedBody} />
                      )}
                      {selectedMethod && apiReference.methods[id] && (
                        <>
                          <h4>Here are the Methods</h4>
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
                              dwolla.{meta.name.toLowerCase()}.
                              {selectedMethod.meta.name}(
                              {renderParams(selectedMethod.meta.params)}
                              <br />)
                            </pre>

                            {selectedMethod.renderedBody === false ? (
                              "there was an error rendering this method"
                            ) : (
                              <MDXRemote {...selectedMethod.renderedBody} />
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </>
        );
      })}
    </>
  );
}

const renderContent = async (c: Content): Promise<RenderedContent> => {
  const renderedBody = await serialize(c.rawBody);
  return { ...c, renderedBody };
};

export async function getStaticProps(): Promise<{ props: Props }> {
  const apiReference = await Content.getApiReference();

  // console.log(apiReference, "before");

  const apis: RenderedContent[] = await Promise.all(
    apiReference.apis.map(renderContent)
  );

  const subsections = await Object.keys(apiReference.subsections).reduce(
    async (acc, next) => {
      const rendered = await Promise.all(
        apiReference.subsections[next].map(renderContent)
      );
      const awaitAcc = await acc;
      const now = { ...awaitAcc, [next]: rendered };
      // console.log(acc, "acc");
      // console.log(now, "now\n\n\n\n");
      return now;
    },
    {}
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

  return { props: { apiReference: { apis, subsections, methods } } };
}
