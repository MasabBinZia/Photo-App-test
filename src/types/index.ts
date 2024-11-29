export type User = {
  name: string | null;
};

export type Comment = {
  id: string;
  text: string;
  photoId?: string;
  user: User;
};

export type Photo = {
  id: string;
  url: string;
  caption: string | null;
  comments?: Comment[];
};

export type NewComment = {
  id: string;
  text: string;
  user: {
    name: string | null;
  };
};
