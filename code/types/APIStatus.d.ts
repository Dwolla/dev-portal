type APIStatus = {
  indicator: "none" | "critical" | "major" | "minor" | "maintenance";
  description: string;
};
