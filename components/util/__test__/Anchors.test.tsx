import { create as render, act } from "react-test-renderer";
import { createElement } from "react";
import Anchors, { useAnchors } from "../Anchors";

const mockPath = "/";
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: mockPath,
      pathname: mockPath,
      query: "",
      asPath: mockPath,
    };
  },
}));

function DebugAnchors() {
  return <pre>{JSON.stringify(useAnchors().anchors, null, 2)}</pre>;
}

function MockMDXCreateElement(props: {
  children: string;
  mdxType: string;
  id?: string;
}) {
  return createElement(props.mdxType, {
    children: props.children,
    id: props.id,
  });
}

test("Anchors", async () => {
  let tree;
  act(() => {
    tree = render(
      <Anchors.Provider>
        <Anchors.Set>
          <MockMDXCreateElement mdxType="h1">A</MockMDXCreateElement>
          <MockMDXCreateElement mdxType="h2">B</MockMDXCreateElement>
          <MockMDXCreateElement mdxType="h3">C</MockMDXCreateElement>
          <MockMDXCreateElement mdxType="h2">A</MockMDXCreateElement>
        </Anchors.Set>

        <DebugAnchors />
      </Anchors.Provider>
    );
  });

  expect(tree.toJSON()).toMatchSnapshot();
});
