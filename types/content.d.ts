type ContentMeta = Record<string, any>;

type ContentIdString = string;

type Content = {
  id: ContentIdString;
  meta: ContentMeta;
  rawBody: string;
};

type RenderedContent = Content & {
  renderedBody: any;
};

type APINameString = string;

type APIReference = {
  apis: Contents;
  subsections: Record<APINameString, Contents>;
  methods: Record<APINameString, Contents>;
};

type RenderedAPIReference = {
  apis: RenderedContent[];
  subsections: Record<APINameString, RenderedContent[]>;
  methods: Record<APINameString, RenderedContent[]>;
};
