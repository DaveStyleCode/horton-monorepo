export const PAGE_QUERY = `*[_type == "pageBuilder" && slug.current == $slug][0]{
  title,
  summary,
  sections[]{
    _key,
    _type,
    ...,
    "communities": communities[]->{
      _id,
      name,
      imageLink,
      address,
      pageLink,
      sellingStatus,
      minPrice,
      maxPrice,
      minBeds,
      maxBeds,
      minBaths,
      maxBaths,
      "state": stateRef->{name},
      "market": marketRef->{name, url}
    }
  }
}`;

export const STATES_QUERY = `*[_type == "state"]|order(name asc){
  _id,
  name
}`;

export type Community = {
  _id?: string;
  name?: string;
  imageLink?: string;
  address?: string;
  pageLink?: string;
  sellingStatus?: string;
  minPrice?: number;
  maxPrice?: number;
  minBeds?: number;
  maxBeds?: number;
  minBaths?: number;
  maxBaths?: number;
  state?: { name?: string };
  market?: { name?: string; url?: string };
};

export type PageSection = {
  _key?: string;
  _type?: string;
  headline?: string;
  subhead?: string;
  communities?: Community[];
};

export type PageBuilderData = {
  title?: string;
  summary?: string;
  sections?: PageSection[];
};

export type State = {
  _id: string;
  name?: string;
};
