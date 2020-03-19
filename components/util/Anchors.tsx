import {
  createContext,
  useState,
  useEffect,
  useContext,
  Children,
  cloneElement,
  // eslint-disable-next-line no-unused-vars
  ReactElement,
} from "react";
import { useRouter } from "next/router";
import GithubSlugger from "github-slugger";

// constants

const ANCHOR_EL_TYPES = ["h1", "h2", "h3", "h4", "h5", "h6"];

// helpers

const childrenToString = (children) =>
  Children.toArray(children).reduce((acc, child: ReactElement | string) => {
    if (typeof child === "object") {
      return child.props.children.toString();
    }
    return acc + child.toString();
  }, "");

// Context

const Context = createContext({
  anchors: [],
  setAnchors: (_anchors: string[]) => {}, // eslint-disable-line no-unused-vars
});

// Provider

function Provider(props: { children: JSX.Element }) {
  const [anchors, setAnchorsState] = useState([]);

  const setAnchors = (newAnchors) => setAnchorsState(newAnchors);

  return (
    <Context.Provider value={{ anchors, setAnchors }}>
      {props.children}
    </Context.Provider>
  );
}

// Wrapper

function Wrapper(props) {
  const { setAnchors } = useContext(Context);
  const { pathname } = useRouter();

  const slugger = new GithubSlugger();

  const children = Children.map(props.children, (el) =>
    ANCHOR_EL_TYPES.includes(el.props.mdxType)
      ? cloneElement(el, {
          id: slugger.slug(childrenToString(el.props.children)),
        })
      : el
  );

  const anchors = children.reduce(
    (acc, current) => (current.props.id ? [...acc, current.props.id] : acc),
    []
  );

  useEffect(() => {
    setAnchors(anchors);

    return () => setAnchors([]);
  }, [pathname]);

  return children;
}

// exports

export const useAnchors = () => useContext(Context);

export default {
  Context,
  Provider,
  Wrapper,
};
