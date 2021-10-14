/* eslint-disable no-shadow */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-unused-vars */
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
  const [selectedMethods, setSelectedMethods] = React.useState({});

  return (
    <>
      {apiReference.apis.map(({ renderedBody, id, meta }) => {
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

            {apiReference.subsections[id] && (
              <>
                {apiReference.subsections[id].map((subSection) => {
                  const currentMethod =
                    typeof apiReference.methods[subSection.id] !== "undefined"
                      ? apiReference.methods[subSection.id].find(
                          (m) => m.id === selectedMethods[id]
                        ) || apiReference.methods[subSection.id][0]
                      : null;
                  return (
                    <div>
                      <h3 id={`heading-${subSection.id?.replace(/\//g, "--")}`}>
                        {subSection.meta.name || subSection.id}
                      </h3>
                      {subSection.renderedBody === false ? (
                        "there was an error rendering this method"
                      ) : (
                        <MDXRemote {...subSection.renderedBody} />
                      )}
                      <br />
                      {apiReference.methods[subSection.id] && (
                        <>
                          <select
                            value={selectedMethods[id]}
                            onChange={(e) => {
                              setSelectedMethods({
                                ...selectedMethods,
                                [id]: e.target.value,
                              });
                            }}
                          >
                            {apiReference.methods[subSection.id].map(
                              (method) => {
                                return (
                                  <option key={method.id} value={method.id}>
                                    {method.meta.name}
                                  </option>
                                );
                              }
                            )}
                          </select>
                          <div>
                            {selectedMethods[id] === false ? (
                              "there was an error rendering this method"
                            ) : (
                              <MDXRemote {...currentMethod.renderedBody} />
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

      return now;
    },
    {}
  );

  return { props: { apiReference: { apis, subsections, methods } } };
}
