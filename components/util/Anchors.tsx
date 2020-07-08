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

// AnchorsContext

export const AnchorsContext = createContext({
  anchors: [] as Anchor[],
  setAnchors: (_anchors: Anchor[]) => {}, // eslint-disable-line no-unused-vars
});

export const useAnchors = () => useContext(AnchorsContext);

// AnchorsProvider

export function AnchorsProvider(props: {
  children: JSX.Element | JSX.Element[];
}) {
  const [anchors, setAnchors] = useState([]);

  return (
    <AnchorsContext.Provider value={{ anchors, setAnchors }}>
      {props.children}
    </AnchorsContext.Provider>
  );
}

// AnchorsSetter

function AnchorData(props: { anchor: Anchor; children: JSX.Element }) {
  return props.children;
}

export function AnchorsSetter(props) {
  const { setAnchors } = useAnchors();

  const slugger = new GithubSlugger();

  const children =
    Children.map(props.children, (c) => {
      if (ANCHOR_EL_TYPES.includes(c.props.originalType)) {
        const text = childrenToString(c.props.children);
        const id = c.props.id ? c.props.id : slugger.slug(text);
        const level = ANCHOR_EL_TYPES.indexOf(c.props.originalType) + 1;
        return (
          <AnchorData anchor={{ id, text, level }}>
            {cloneElement(c, { id })}
          </AnchorData>
        );
      }
      return c;
    }) || [];

  const anchors = children.reduce(
    (acc, current) =>
      current.props.anchor ? [...acc, current.props.anchor] : acc,
    []
  );

  const router = useRouter();

  useEffect(() => {
    setAnchors(anchors);

    return () => setAnchors([]);
  }, [router?.pathname]);

  return children;
}
