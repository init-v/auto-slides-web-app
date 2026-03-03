export type Slide = {
  id: string;
  kicker?: string;
  title: string;
  subtitle?: string;
  body: string;
  notes?: string;
};

export type Presentation = {
  id: string;
  title: string;
  slides: Slide[];
  updatedAt: string;
};
