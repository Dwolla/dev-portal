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
      {res?.data?.apis?.map((api) => (
        <>
          <CategoryHeading>
            <a
              href={`/api-reference${api.id}`}
              id={api.id}
              onClick={scrollToApi}
            >
              {api.meta?.name}
            </a>
          </CategoryHeading>

          {res?.data?.subsections &&
            res?.data?.subsections[api.id]?.map((subSection) => (
              <CategoryHeading style={{ marginLeft: "20px" }}>
                <a
                  href={`/api-reference${subSection.id}`}
                  id={subSection.id}
                  onClick={scrollToApi}
                >
                  {subSection.meta?.name}
                </a>
              </CategoryHeading>
            ))}
        </>
      ))}
    </ul>
  );
}
