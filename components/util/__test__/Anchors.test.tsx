import { create as render, act } from "react-test-renderer";
import { createElement } from "react";
import { useAnchors, AnchorsProvider, AnchorsSetter } from "../Anchors";

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
  originalType: string;
  id?: string;
}) {
  return createElement(props.originalType, {
    children: props.children,
    id: props.id,
  });
}

test("Anchors", async () => {
  let tree;
  act(() => {
    tree = render(
      <AnchorsProvider>
        <AnchorsSetter>
          <MockMDXCreateElement originalType="h1">A</MockMDXCreateElement>
          <MockMDXCreateElement originalType="h2">B</MockMDXCreateElement>
          <MockMDXCreateElement originalType="h3">C</MockMDXCreateElement>
          <MockMDXCreateElement originalType="h4">D</MockMDXCreateElement>
          <MockMDXCreateElement originalType="h5">E</MockMDXCreateElement>
          <MockMDXCreateElement originalType="h6">F</MockMDXCreateElement>
          <MockMDXCreateElement originalType="h1">A</MockMDXCreateElement>
          <MockMDXCreateElement originalType="h2">A</MockMDXCreateElement>
        </AnchorsSetter>

        <DebugAnchors />
      </AnchorsProvider>
    );
  });

  expect(tree.toJSON()).toMatchSnapshot();
});
