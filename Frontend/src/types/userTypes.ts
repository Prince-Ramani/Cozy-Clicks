export interface LinksInterface {
  instagram?: string;
  facebook?: string;
  youtube?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

export interface UserGetMe {
  _id: string;
  username: string;
  email: string;
  profilePicture: string;
}

export interface GetProfileInfoInterface {
  _id: string;
  username: string;
  email: string;
  profilePicture: string;
  profileBanner: string;
  views: number;
  following: number;
  followers: number;
  links: LinksInterface;
}
