import React from "react";
import { Product } from "../schema.js";

const COLOR_MAP = {
  Black: "bg-gray-900",
  Blue: "bg-blue-500",
  Brown: "bg-amber-700",
  Green: "bg-green-500",
  Grey: "bg-gray-500",
  White: "bg-white border border-gray-300",
  Red: "bg-red-500",
  Multicolor: "bg-gradient-to-r from-red-500 via-green-500 to-blue-500",
};

export const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <>
      <div className="flex px-4">
        <h3 className="text-2xl font-bold">Showing {products.length} Products</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
        {products.map((product, index) => (
          <div key={index} className="card bg-base-100 shadow-xl">
            <div className={`w-full h-6 rounded-t-xl ${COLOR_MAP[product.color]}`}></div>
            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>
              <p className="text-sm">{product.description}</p>
              <div className="flex justify-between items-center mt-2">
                <span className={`text-lg font-bold${product.onSale ? " text-red-600" : ""}`}>
                  ${product.price.toFixed(2)}
                </span>
                <div className="badge badge-accent">{product.gender}</div>
              </div>
              <div className="flex items-center mt-2">
                <div className="rating rating-sm">
                  {[...Array(5)].map((_, i) => (
                    <input
                      key={i}
                      type="radio"
                      name={`rating-${index}`}
                      className="mask mask-star-2 bg-orange-400"
                      checked={i < Math.floor(product.avgRating)}
                      readOnly
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm">({product.avgRating.toFixed(1)})</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {product.availableSizes.map((size, i) => (
                  <div key={i} className="badge badge-outline">
                    {size}
                  </div>
                ))}
              </div>
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-primary btn-sm">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductList;
