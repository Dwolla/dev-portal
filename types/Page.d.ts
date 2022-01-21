type PageGroup = {
  id: string;
  title: string;
  category?: string;
  weight?: number;
};

type Guide = {
  step: number;
  filter?: string;
  icon?: string;
};

type Meta = {
  title: string;
  description: string;
};

// eslint-disable-next-line no-unused-vars
type Page = {
  id: string;
  title: string;
  group?: PageGroup;
  guide?: Guide;
  meta: Meta;
  weight?: number;
};
