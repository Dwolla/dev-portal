import {
  createContext,
  useState,
  useEffect,
  useContext,
  Children,
  cloneElement,
} from "react";
import { useRouter } from "next/router";
import GithubSlugger from "github-slugger";
import { childrenToString } from "../../modules/helpers";

// constants

const ANCHOR_EL_TYPES = ["h1", "h2", "h3", "h4", "h5", "h6"];

// useAnchors (Context)

const Context = createContext({
  anchors: [] as Anchor[],
  setAnchors: (_anchors: Anchor[]) => {}, // eslint-disable-line no-unused-vars
});

export const useAnchors = () => useContext(Context);

// Anchors.Provider

function Provider(props: { children: JSX.Element | JSX.Element[] }) {
  const [anchors, setAnchorsState] = useState([]);

  const setAnchors = (newAnchors) => setAnchorsState(newAnchors);

  return (
    <Context.Provider value={{ anchors, setAnchors }}>
      {props.children}
    </Context.Provider>
  );
}

// Anchors.Set

interface AnchorWrapperProps {
  anchor: Anchor;
  children: JSX.Element;
}

function AnchorData(props: AnchorWrapperProps) {
  return props.children;
}

function Set(props) {
  const { setAnchors } = useContext(Context);
  const { pathname } = useRouter();

  const slugger = new GithubSlugger();

  const children = Children.map(props.children, (el) => {
    if (ANCHOR_EL_TYPES.includes(el.props.mdxType)) {
      const text = childrenToString(el.props.children);
      const id = slugger.slug(text);
      const level = ANCHOR_EL_TYPES.indexOf(el.props.mdxType) + 1;
      return (
        <AnchorData anchor={{ id, text, level }}>
          {cloneElement(el, {
            id,
          })}
        </AnchorData>
      );
    }
    return el;
  });

  const anchors = children.reduce(
    (acc, current) =>
      current.props.anchor ? [...acc, current.props.anchor] : acc,
    []
  );

  useEffect(() => {
    setAnchors(anchors);

    return () => setAnchors([]);
  }, [pathname]);

  return children;
}

export default {
  Provider,
  Set,
};
