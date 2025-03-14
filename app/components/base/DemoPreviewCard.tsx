import { Box, Button, styled, Typography } from "@mui/material";
import { ReactComponent as NewTabIcon } from "../../../assets/images/component-icons/open-in-new-tab-icon.svg";
import { PURPLE_004, PURPLE_100, WHITE_PRIMARY } from "../colors";

// Styled Components
const CTAContainer = styled(Box, { name: "CTAContainer" })(({ theme }) => ({
  position: "relative",
  width: "80%",
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  display: "inline-block",
  cursor: "pointer",
  padding: "2rem",
  willChange: "transform",
  "&:hover .imageWrapper": {
    transform: "scale(1.03)",
    transition: "transform 0.3s ease",
  },
}));

const ImageWrapper = styled(Box, { name: "ImageWrapper" })({
  position: "relative",
  width: "100%",
  transition: "transform 0.3s ease",
  clipPath: "inset(0% 0% 0% 0% round 5px)",
});

const GradientOverlay = styled(Box, {
  name: "GradientOverlay",
  shouldForwardProp: (prop) => prop !== "gradientDirection",
})<{ gradientDirection: string }>(({ gradientDirection }) => ({
  position: "absolute",
  inset: 0,
  background: `linear-gradient(${gradientDirection}, ${PURPLE_100}, ${PURPLE_004})`,
}));

const Content = styled(Box, { name: "Content" })(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  textAlign: "left",
  color: theme.palette.common.white,
  padding: theme.spacing(7),
  zIndex: 2,

  [theme.breakpoints.down("lg")]: {
    padding: theme.spacing(3),
    "& h4": {
      fontSize: "1.5rem",
    },
    "& p": {
      fontSize: "0.875rem",
    },
  },
}));

const CTAButton = styled(Button, { name: "CTAButton" })(({ theme }) => ({
  marginTop: theme.spacing(1),
  color: theme.palette.primary.main,
  borderColor: theme.palette.common.white,
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  transition: "transform 0.3s ease",
  willChange: "transform",

  "&:hover": {
    transform: "scale(1.05)",
  },
}));

// ImageCTA Props Interface
export interface ImageCTAProps {
  imageSrc: string;
  imageAlt?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  href: string;
  gradientDirection?:
    | "to bottom"
    | "to top"
    | "to left"
    | "to right"
    | "to top left"
    | "to top right"
    | "to bottom left"
    | "to bottom right";
}

// ImageCTA Component
export default function ImageCTA({
  imageSrc,
  imageAlt = "",
  title,
  description,
  buttonText,
  href,
  gradientDirection = "to top right",
}: ImageCTAProps) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      <CTAContainer>
        {/* Image Wrapper */}
        <ImageWrapper className="imageWrapper">
          <img src={imageSrc} alt={imageAlt} width="100%" height="auto" />
        </ImageWrapper>

        {/* Gradient Overlay */}
        <GradientOverlay gradientDirection={gradientDirection} />

        {/* Content Overlay at Bottom-Left */}
        <Content>
          {title && (
            <Typography variant="h4" style={{ color: WHITE_PRIMARY }}>
              {title}
            </Typography>
          )}
          {description && (
            <Typography variant="body2">{description}</Typography>
          )}
          {buttonText && (
            <CTAButton variant="contained" color="white">
              {buttonText}
              <NewTabIcon width={16} height={16} />
            </CTAButton>
          )}
        </Content>
      </CTAContainer>
    </a>
  );
}
