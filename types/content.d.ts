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
  methods: Record<APINameString, Contents>;
};

type RenderedAPIReference = {
  apis: RenderedContent[];
  methods: Record<APINameString, RenderedContent[]>;
};
