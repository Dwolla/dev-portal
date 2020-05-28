type PageGroup = {
  id: string;
  title: string;
  category?: string;
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

type Page = {
  id: string;
  title: string;
  group?: PageGroup;
  guide?: Guide;
  meta: Meta;
  weight?: number;
};
