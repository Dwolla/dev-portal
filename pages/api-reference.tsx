import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";

import Content from "../app/modules/content";

type Props = {
  renderedContents: Contents;
};

export default ({ renderedContents }: Props) => {
  return (
    <>
      <h1>API Reference</h1>

      <div>
        {renderedContents.map(({ renderedBody, id, head }) => {
          return (
            <div id={id}>
              <pre>{JSON.stringify({ id, head }, null, 2)}</pre>
              {renderedBody === false
                ? "there was an error rendering this one"
                : hydrate(renderedBody, { components: {} })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export async function getStaticProps() {
  const contents = await Content.list();
  const renderedContents = await Promise.all(
    contents.map(async (c) => {
      const renderedBody = await renderToString(c.body, {
        components: {},
      }).catch(() => false);
      return { ...c, renderedBody };
    })
  );
  return { props: { renderedContents } };
}
