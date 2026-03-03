export type Slide = {
  id: string;
  title: string;
  body: string;
  notes?: string;
};

export type Presentation = {
  id: string;
  title: string;
  slides: Slide[];
  updatedAt: string;
};
