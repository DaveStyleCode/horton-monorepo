export const pageBuilderQuery = `*[_type == "pageBuilder" && slug.current == $slug][0]{
  title,
  summary,
  sections[]{
    _key,
    _type,
    ...,
    "component": component->{
      name,
      category,
      description,
      content,
      media
    },
    "market": market->{
      name,
      url
    },
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

export const statesQuery = `*[_type == "state"]|order(name asc){
  _id,
  name
}`;
