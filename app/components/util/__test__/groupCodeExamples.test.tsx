import { createElement } from "react";
import groupCodeExamples from "../groupCodeExamples";

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

function MockCodeExamples({ children: c }: any) {
  return (
    <>
      <h3>code examples</h3>
      {c}
    </>
  );
}

test("groupCodeExamples", () => {
  expect(
    groupCodeExamples({
      children: [
        <MockMDXCreateElement originalType="pre">
          <MockMDXCreateElement originalType="code" className="language-php">
            code example A
          </MockMDXCreateElement>
        </MockMDXCreateElement>,

        <MockMDXCreateElement originalType="pre">
          <MockMDXCreateElement originalType="code" className="language-java">
            code example B
          </MockMDXCreateElement>
        </MockMDXCreateElement>,

        <MockMDXCreateElement originalType="p">
          paragraph text
        </MockMDXCreateElement>,

        <MockMDXCreateElement originalType="pre">
          <MockMDXCreateElement originalType="code" className="language-php">
            code example C
          </MockMDXCreateElement>
        </MockMDXCreateElement>,

        <MockMDXCreateElement originalType="pre">
          <MockMDXCreateElement originalType="code" className="language-java">
            code example D
          </MockMDXCreateElement>
        </MockMDXCreateElement>,
      ],
      into: MockCodeExamples,
    })
  ).toMatchSnapshot();
});
