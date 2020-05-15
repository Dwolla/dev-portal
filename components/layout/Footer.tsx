import styled from "@emotion/styled";
import map from "lodash.map";
import { GREY_2, HEADLINE_TEXT, PARAGRAPH_TEXT } from "../colors";
import { POPPINS, ROBOTO } from "../typography";
import { breakUp, breakDown } from "../breakpoints";
import logo from "../../assets/images/dwolla-developers-logo.png";

const Container = styled.div`
  border-top: 1px solid ${GREY_2};
  display: flex;
  flex-wrap: wrap;

  @media (${breakUp("md")}) {
    padding: 20px;
  }
`;

const LogoContainer = styled.div`
  width: 35%;
  padding: 20px;

  @media (${breakDown("sm")}) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Logo = styled.img`
  width: 173px;
`;

const Copyright = styled.div`
  font-family: ${ROBOTO};
  font-size: 12px;
  line-height: 21px;
  color: ${PARAGRAPH_TEXT};
  margin-top: 14px;
`;

const LinkContainer = styled.div`
  width: 65%;
  display: flex;
  justify-content: flex-end;

  @media (${breakDown("md")}) {
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
    order: -1;
  }

  @media (${breakDown("sm")}) {
    order: unset;
  }
`;

const LinkGroup = styled.div`
  padding: 20px;

  @media (${breakUp("lg")}) {
    width: 200px;
  }
`;

const LinkGroupHeading = styled.h3`
  font-family: ${POPPINS};
  font-weight: 600;
  color: ${HEADLINE_TEXT};
  text-transform: uppercase;
  font-size: 11px;
`;

const LinkGroupList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const LinkGroupItem = styled.li`
  margin: 0;
`;

const LinkGroupLink = styled.a`
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

const LegalContainer = styled.div`
  width: 65%;
  padding: 20px;

  @media (${breakDown("sm")}) {
    width: 100%;
  }
`;

const LegalTitle = styled.strong`
  font-family: ${ROBOTO};
  font-weight: 600;
  color: ${HEADLINE_TEXT};
  font-size: 12px;
`;

const LegalDesc = styled.p`
  font-family: ${ROBOTO};
  font-size: 12px;
  line-height: 21px;
  color: ${PARAGRAPH_TEXT};
`;

export interface FooterLink {
  text: string;
  href: string;
}

interface FooterProps {
  links: Record<string, FooterLink[]>;
  legal: { title: string; description: string };
}

export default function Footer(props: FooterProps) {
  return (
    <Container>
      <LogoContainer>
        <Logo src={logo} alt="" />
        <Copyright>{new Date().getFullYear()} All Rights Reserved</Copyright>
      </LogoContainer>

      <LinkContainer>
        {map(props.links, (v: FooterLink[], k: string) => (
          <LinkGroup key={k}>
            <LinkGroupHeading>{k}</LinkGroupHeading>

            <LinkGroupList>
              {v.map((i) => (
                <LinkGroupItem key={i.href}>
                  <LinkGroupLink href={i.href}>{i.text}</LinkGroupLink>
                </LinkGroupItem>
              ))}
            </LinkGroupList>
          </LinkGroup>
        ))}
      </LinkContainer>

      <LegalContainer>
        <LegalTitle>{props.legal.title}</LegalTitle>
        <LegalDesc>{props.legal.description}</LegalDesc>
      </LegalContainer>
    </Container>
  );
}
