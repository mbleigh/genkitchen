"use client";

import { useState } from "react";
import ProductFilters from "./ProductFilters";
import ProductList from "./ProductList";
import data from "./data.json";
import { Filter, Product } from "./schema";

import MiniSearch from "minisearch";
import Search from "./Search";
import { magicFilter } from "./action";

const minisearch = new MiniSearch({
  fields: ["name", "description"],
  idField: "id",
  searchOptions: { boost: { name: 2 }, prefix: true },
});
minisearch.addAll(data.products);

function searchProducts(query: string): Product[] {
  return data.products.filter((p) =>
    minisearch
      .search(query)
      .map((r) => r.id)
      .includes(p.id)
  ) as Product[];
}

function isFilterMatch(product: Product, filter: Filter): boolean {
  if (filter.pickUpToday !== undefined && product.pickUpToday !== filter.pickUpToday) return false;
  if (filter.onSale && !product.onSale) return false;
  if (filter.gender?.length && !filter.gender.includes(product.gender)) return false;
  if (filter.color?.length && !filter.color.includes(product.color)) return false;
  if (filter.minRating !== undefined && product.avgRating < filter.minRating) return false;
  if (filter.maxRating !== undefined && product.avgRating > filter.maxRating) return false;
  if (filter.minPrice !== undefined && product.price < filter.minPrice) return false;
  if (filter.maxPrice !== undefined && product.price > filter.maxPrice) return false;
  if (filter.size && !filter.size.some((size) => product.availableSizes.includes(size)))
    return false;
  if (filter.brand?.length && !filter.brand.includes(product.brand)) return false;
  if (filter.activity?.length && !filter.activity.includes(product.activity)) return false;
  if (filter.collection?.length && !filter.collection.includes(product.collection)) return false;
  if (
    filter.features?.length &&
    !filter.features.every((feature) => product.features.includes(feature))
  )
    return false;
  if (filter.technology?.length && !filter.technology.includes(product.technology)) return false;
  if (filter.fit?.length && !filter.fit.includes(product.fit)) return false;

  return true;
}

function filterAndSortProducts(filter: Filter): Product[] {
  let filteredProducts: Product[] = filter.query
    ? searchProducts(filter.query)
    : ([...data.products] as Product[]);
  filteredProducts = filteredProducts.filter((p) => isFilterMatch(p, filter));

  // Sort the filtered products if a sort option is specified
  if (filter.sort) {
    filteredProducts.sort((a, b) => {
      switch (filter.sort) {
        case "price":
          return a.price - b.price;
        case "rating":
          return b.avgRating - a.avgRating;
        case "popularity":
          return b.popularity - a.popularity;
        default:
          return 0;
      }
    });
  }

  return filteredProducts;
}

export default function Page() {
  const [filter, setFilter] = useState<Filter>({});
  const [searching, setSearching] = useState(false);

  return (
    <>
      <h1 className="text-6xl text-center mt-12 font-black">Sportswear Shop</h1>
      <div className={searching ? "animate-pulse" : ""}>
        <Search
          onSubmit={async (query) => {
            setSearching(true);
            const newFilter = await magicFilter({ query, existing: filter });
            setSearching(false);
            setFilter(newFilter);
            return "";
          }}
        />
      </div>
      <div className="container bg-white p-6 mt-4 mx-auto rounded-2xl flex">
        <div>
          <ProductFilters filter={filter} setFilter={setFilter} />
        </div>
        <div className="flex-1">
          <ProductList products={filterAndSortProducts(filter)} />
        </div>
      </div>
    </>
  );
}
