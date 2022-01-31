/* eslint-disable import/no-mutable-exports */
// https://mdxjs.com/advanced/typescript
declare module "*.mdx" {
  // eslint-disable-next-line no-unused-vars
  let MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
}
