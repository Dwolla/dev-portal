import styled from "@emotion/styled";
import classnames from "../../modules/classnames";
import Button from "./Button";
import { PURPLE_DARK, WHITE_PRIMARY, GREY_4 } from "../colors";
import { POPPINS, ROBOTO } from "../typography";
import { breakDown } from "../breakpoints";

// Styled Banner component
const StyledBanner = styled.div`
  height: 100%;
  background-color: ${PURPLE_DARK};
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  width: 100%;
  &.filters {
    padding-bottom: 0px;
  }
`;

const StyledIcon = styled.img`
  height: 46px;
  width: 42px;
`;

const StyledTopic = styled.div`
  max-width: 749px;
  color: ${WHITE_PRIMARY};
  font-family: ${POPPINS};
  font-size: 42px;
  font-weight: 200;
  line-height: 52px;
  text-align: center;
  @media (${breakDown("sm")}) {
    font-size: 30px;
    line-height: 46px;
  }
  @media (${breakDown("xs")}) {
    font-size: 22px;
    line-height: 33px;
  }
`;

const StyledDescription = styled.div`
  color: ${GREY_4};
  font-family: ${ROBOTO};
  font-size: 19px;
  font-weight: 300;
  line-height: 26px;
  text-align: center;
  &.filters {
    margin-bottom: 52px;
  }
  @media (${breakDown("sm")}) {
    font-size: 16px;
    line-height: 20px;
  }
`;

const StyledFilter = styled.div`
  text-transform: uppercase;
  margin-top: 52px;
  margin-bottom: 0px;
  position: absolute;
  bottom: 0;
`;

// Button props
export type ButtonProps = {
  text: string;
  link: {
    href: string;
    external: boolean;
  };
};

// Prop Types
type Props = {
  icon?: string;
  topic: string;
  description: string;
  button?: ButtonProps;
  filterTabs?: JSX.Element;
};

// Banner component
function Banner({ icon, topic, description, button, filterTabs }: Props) {
  return (
    <StyledBanner className={classnames({ filters: filterTabs })}>
      {icon && <StyledIcon src={icon} alt="" />}
      <StyledTopic>{topic}</StyledTopic>
      <StyledDescription className={classnames({ filters: filterTabs })}>
        {description}
      </StyledDescription>
      {button && <Button {...button} size="large" variant="primary" />}
      {filterTabs && <StyledFilter>{filterTabs}</StyledFilter>}
    </StyledBanner>
  );
}

export default Banner;
