import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { FrontMatter } from "../../../layouts/types";

// Custom word mapping for acronyms
const customTitleMapping = {
  "api-reference": "API Reference",
  "sdks-tools": "SDKs & Tools",
  sdks: "SDKs",
  kba: "KBA",
  // Add more custom words as needed
};

// Utility function to capitalize the words of a string
function capitalizeWords(str: string): string {
  return str.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// Utility function to generate the breadcrumb list
function generateBreadcrumbs(
  asPathNestedRoutes: string[],
  frontMatter: FrontMatter
) {
  const breadcrumbs = [];
  let currentPath = "";

  for (let i = 0; i < asPathNestedRoutes.length; i += 1) {
    const subpath = asPathNestedRoutes[i];
    currentPath += `/${subpath}`;

    // Skip the "Docs" segment if it's the first segment and starts with "docs"
    if (i === 0 && subpath.startsWith("docs")) {
      // eslint-disable-next-line no-continue
      continue; // Skip the "Docs" segment
    }

    // Use customTitleMapping if available, or fallback to the original segment.
    const text = customTitleMapping[subpath] || subpath;

    if (i === asPathNestedRoutes.length - 1) {
      // If it's the last segment, use the title from frontMatter if available,
      // or fallback to the default text.
      breadcrumbs.push({
        href: currentPath,
        text: frontMatter?.["group"]?.title || frontMatter?.["title"] || text, // eslint-disable-line dot-notation
      });
    } else {
      // For non-last segments, capitalize the text and add it to the breadcrumbs.
      breadcrumbs.push({
        href: currentPath,
        text: capitalizeWords(text),
      });
    }
  }

  // Add "Home" breadcrumb to the list
  return [{ href: "/", text: "Home" }, ...breadcrumbs];
}

type Props = {
  frontMatter?: FrontMatter;
};

type CrumbProps = {
  text: string;
  href: string;
  last: boolean;
};

function Crumb({ text, href, last = false }: CrumbProps) {
  if (last) {
    return <Typography color="text.primary">{text}</Typography>;
  }

  return (
    <Link underline="hover" color="inherit" href={href}>
      {text}
    </Link>
  );
}

export default function BreadcrumbsMui({ frontMatter }: Props) {
  const router = useRouter();

  // Split the router's asPath into segments and remove empty segments
  const asPathWithoutQuery = router.asPath.split("?")[0];
  const asPathNestedRoutes = asPathWithoutQuery
    .split("/")
    .filter((v) => v.length > 0);

  // Generate breadcrumbs based on the asPath segments and frontMatter
  const breadcrumbs = generateBreadcrumbs(asPathNestedRoutes, frontMatter);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {breadcrumbs.map((crumb, idx) => (
        <Crumb
          {...crumb}
          key={crumb.text}
          last={idx === breadcrumbs.length - 1}
        />
      ))}
    </Breadcrumbs>
  );
}
