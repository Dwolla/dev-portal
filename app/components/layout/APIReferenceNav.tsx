import useSWR from "swr";
import scrollToElement from "scroll-to-element";

import fetcher from "../../modules/fetcher";
import { CategoryHeading } from "./SideNav/CategoryHeading";
import { SCROLL_DURATION, SCROLL_OFFSET } from "../util/Anchors";

const scrollToApi = (e) => {
  e.preventDefault();
  scrollToElement(`#heading-${e.target.id.replace(/\//g, "--")}`, {
    offset: -SCROLL_OFFSET,
    duration: SCROLL_DURATION,
  });
  return false;
};

export default function APIReferenceNav() {
  const res = useSWR("/api/api_reference", fetcher, {
    refreshInterval: 60000,
  }).data;

  return (
    <ul>
      {res?.data?.apis?.map((a) => (
        <>
          <CategoryHeading>
            <a href={`/api-reference${a.id}`} id={a.id} onClick={scrollToApi}>
              {a.meta?.name}
            </a>
          </CategoryHeading>

          {res?.data?.methods &&
            res?.data?.methods[a.id]?.map((b) => (
              <CategoryHeading>
                <a
                  href={`/api-reference${b.id}`}
                  id={b.id}
                  onClick={scrollToApi}
                >
                  {b.meta?.name}
                </a>
              </CategoryHeading>
            ))}
        </>
      ))}
    </ul>
  );
}
