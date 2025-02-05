

export const allProductsQuery = ` 
  *[_type == "products"]{
    _id,
    title,
    price,
    priceWithoutDiscount,
    "image": image.asset->url,
    description,
    category->{
      title
    },
    badge,
    tags,
    inventory
  }
`;




