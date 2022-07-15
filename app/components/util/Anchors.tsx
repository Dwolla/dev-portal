import {
  Children,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import GithubSlugger from "github-slugger";
import scrollToElement from "scroll-to-element";
import { childrenToString } from "../../modules/helpers";

// constants

const ANCHOR_EL_TYPES = ["h1", "h2", "h3"];
export const SCROLL_OFFSET = 100;
export const SCROLL_DURATION = 500;

// AnchorsContext

export const AnchorsContext = createContext({
  anchors: [] as Anchor[],
  setAnchors: (_anchors: Anchor[]) => {}, // eslint-disable-line no-unused-vars
  activeAnchor: null as Anchor,
  setActiveAnchor: (anchor: Anchor) => {}, // eslint-disable-line no-unused-vars
});

export const useAnchors = () => useContext(AnchorsContext);

// AnchorsProvider

export function AnchorsProvider(props: {
  children: JSX.Element | JSX.Element[];
}) {
  const [anchors, setAnchors] = useState([]);
  const [activeAnchor, setActiveAnchor] = useState(null);

  return (
    <AnchorsContext.Provider
      value={{
        anchors,
        setAnchors,
        activeAnchor,
        setActiveAnchor,
      }}
    >
      {props.children}
    </AnchorsContext.Provider>
  );
}

// AnchorsSetter

function AnchorData(props: { anchor: Anchor; children: JSX.Element }) {
  return props.children;
}

export function AnchorsSetter(props) {
  const { setAnchors, activeAnchor, setActiveAnchor } = useAnchors();

  const slugger = new GithubSlugger();

  const children =
    Children.map(props.children, (c) => {
      if (ANCHOR_EL_TYPES.includes(c.props.originalType)) {
        const text = childrenToString(c.props.children);
        const id = slugger.slug(text);
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
    setActiveAnchor(anchors[0]);

    return () => {
      setAnchors([]);
      setActiveAnchor(null);
    };
  }, [router?.pathname]);

  useEffect(() => {
    let raf: number;
    const anchorEls = anchors.map((a: Anchor) => document.getElementById(a.id));

    const handleScroll = () => {
      raf = requestAnimationFrame(() => {
        if (anchorEls && anchorEls.length > 0) {
          const anchorId = anchorEls.reduce(
            (acc: { score: number; el: { id: string } }, next) => {
              const { y } = next.getBoundingClientRect();
              const nextScore = Math.abs(SCROLL_OFFSET - y);

              if (!acc) {
                return { el: next, score: nextScore };
              }

              return nextScore < acc.score
                ? { el: next, score: nextScore }
                : acc;
            },
            null
          ).el.id;

          if (anchorId !== activeAnchor?.id) {
            setActiveAnchor(anchors.find((a: Anchor) => a.id === anchorId));
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(raf);
    };
  }, [router?.pathname]);

  useEffect(() => {
    if (activeAnchor) {
      window.history.replaceState(
        null,
        null,
        activeAnchor.level !== 1 ? `#${activeAnchor.id}` : " " //prevent h1 tags from displaying as anchors in the url
      );
    }
  }, [activeAnchor?.id]);

  return children;
}

export const scrollTo = (anchorId: string) => {
  const element = document.getElementById(anchorId);

  if (element) {
    scrollToElement(element, {
      offset: -SCROLL_OFFSET + 1,
      duration: SCROLL_DURATION,
    });
  }
};
