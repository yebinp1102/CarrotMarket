
export type INewUser = {
  name: string,
  email: string,
  password: string,
  username: string
}

export type IUser = {
  id: string,
  name: string,
  email: string,
  username: string,
  imageUrl: string,
  bio: string
}

export type INavLink = {
  imgURL: string,
  route: string,
  label: string,
}

export type INewPost = {
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
};
