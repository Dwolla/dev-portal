import styled from "@emotion/styled";
import map from "lodash.map";
import { GREY_2, HEADLINE_TEXT, PARAGRAPH_TEXT } from "../colors";
import { POPPINS, ROBOTO } from "../typography";
import { minWidth, BREAKPOINT_DESKTOP } from "../breakpoints";

const Container = styled.div`
  border-top: 1px solid ${GREY_2};
  display: flex;
  flex-wrap: wrap;

  @media (${minWidth(BREAKPOINT_DESKTOP)}) {
    padding: 20px;
  }
`;

const Group = styled.div`
  padding: 20px;

  @media (${minWidth(BREAKPOINT_DESKTOP)}) {
    width: 200px;
  }
`;

const Heading = styled.h3`
  font-family: ${POPPINS};
  font-weight: 600;
  color: ${HEADLINE_TEXT};
  text-transform: uppercase;
  font-size: 11px;
`;

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const Item = styled.li`
  margin: 0;
`;

const ListLink = styled.a`
  display: block;
  padding: 6px 0;
  font-family: ${ROBOTO};
  font-size: 14px;
  line-height: 20px;
  color: ${PARAGRAPH_TEXT};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export interface FooterLink {
  text: string;
  href: string;
}

interface FooterProps {
  links: Record<string, FooterLink[]>;
}

export default function Footer(props: FooterProps) {
  return (
    <Container>
      {map(props.links, (v: FooterLink[], k: string) => (
        <Group key={k}>
          <Heading>{k}</Heading>

          <List>
            {v.map((i) => (
              <Item key={i.href}>
                <ListLink href={i.href}>{i.text}</ListLink>
              </Item>
            ))}
          </List>
        </Group>
      ))}
    </Container>
  );
}
