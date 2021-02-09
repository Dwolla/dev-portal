type ContentHead = Record<string, any>;

type Content = {
  id: string;
  head: ContentHead;
  rawBody: string;
  renderedBody: any;
};

type Contents = Content[];
