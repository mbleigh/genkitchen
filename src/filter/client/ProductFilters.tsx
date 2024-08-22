import React, { useState } from "react";
import {
  Filter,
  ColorChoices,
  SizeChoices,
  BrandChoices,
  ActivityChoices,
  CollectionChoices,
  FeatureChoices,
  TechnologyChoices,
  FitChoices,
  GenderChoices,
  SortChoices,
} from "../schema.js";

export default function ProductFilters({
  filter,
  setFilter,
}: {
  filter: Filter;
  setFilter: (filter: Filter | ((filter: Filter) => Filter)) => any;
}) {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter((prev) => ({ ...prev, sort: e.target.value } as Filter));
  };

  const handleCheckboxChange = (category: keyof Filter, value: string) => {
    setFilter((prev) => {
      const currentValues = (prev[category] as string[]) || [];
      if (currentValues.includes(value)) {
        return { ...prev, [category]: currentValues.filter((v) => v !== value) };
      } else {
        return { ...prev, [category]: [...currentValues, value] };
      }
    });
  };

  const handleToggleChange = (key: "pickUpToday" | "onSale") => {
    setFilter((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleRatingChange = (value: number) => {
    setFilter((prev) => ({ ...prev, minRating: prev.minRating === value ? undefined : value }));
  };

  const handlePriceRangeChange = (minPrice: number | undefined, maxPrice: number | undefined) => {
    setFilter((prev) => {
      if (prev.minPrice === minPrice && prev.maxPrice === maxPrice) {
        return { ...prev, minPrice: undefined, maxPrice: undefined };
      }
      return { ...prev, minPrice, maxPrice };
    });
  };

  const clearCheckboxGroup = (category: keyof Filter) => {
    setFilter((prev) => ({ ...prev, [category]: undefined }));
  };

  const renderCheckboxGroup = (title: string, choices: string[], category: keyof Filter) => (
    <div className="collapse collapse-plus border border-base-300">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">{title}</div>
      <div className="collapse-content">
        {choices.map((choice) => (
          <label key={choice} className="label cursor-pointer">
            <span className="label-text">{choice}</span>
            <input
              type="checkbox"
              className="checkbox"
              checked={((filter[category] as string[]) || []).includes(choice)}
              onChange={() => handleCheckboxChange(category, choice)}
            />
          </label>
        ))}
        <button
          className="btn btn-xs btn-link font-normal text-black mt-2"
          onClick={() => clearCheckboxGroup(category)}
        >
          Clear
        </button>
      </div>
    </div>
  );

  const colorMap: { [key: string]: string } = {
    Black: "bg-black",
    Blue: "bg-blue-500",
    Brown: "bg-amber-700",
    Green: "bg-green-500",
    Grey: "bg-gray-500",
    White: "bg-white",
    Red: "bg-red-500",
    Multicolor: "bg-gradient-to-r from-red-500 via-green-500 to-blue-500",
  };

  const renderStarRating = () => (
    <div className="form-control">
      <label className="label">
        <span className="label-text">Minimum Rating</span>
      </label>
      <div className="rating rating-lg rating-half">
        <input
          type="radio"
          name="rating-10"
          className="rating-hidden"
          checked={!filter.minRating}
          onChange={() => handleRatingChange(0)}
        />
        {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((value) => (
          <input
            key={value}
            type="radio"
            name="rating-10"
            className={`mask mask-star-2 ${value % 1 === 0 ? "mask-half-2" : "mask-half-1"} ${
              (filter.minRating || 0) < value ? "bg-orange-100" : "bg-orange-400"
            }`}
            checked={filter.minRating === value}
            onChange={() => handleRatingChange(value)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-64 p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Filters</h2>

      <div className="form-control w-full max-w-xs mb-4">
        <label className="label">
          <span className="label-text">Search</span>
        </label>
        <input
          type="text"
          placeholder="Enter query"
          className="input input-bordered w-full"
          value={filter.query || ""}
          onChange={(e) => setFilter((prev) => ({ ...prev, query: e.target.value }))}
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Sort By</span>
        </label>
        <select className="select select-bordered" onChange={handleSortChange} value={filter.sort}>
          <option disabled value="">
            Pick one
          </option>
          {SortChoices.map((choice) => (
            <option key={choice} value={choice}>
              {choice.charAt(0).toUpperCase() + choice.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Pick Up Today</span>
          <input
            type="checkbox"
            className="toggle"
            checked={filter.pickUpToday || false}
            onChange={() => handleToggleChange("pickUpToday")}
          />
        </label>
      </div>

      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">On Sale</span>
          <input
            type="checkbox"
            className="toggle"
            checked={filter.onSale || false}
            onChange={() => handleToggleChange("onSale")}
          />
        </label>
      </div>

      {renderStarRating()}

      <div className="form-control">
        <label className="label">
          <span className="label-text">Price Range</span>
        </label>
        <div className="btn-group">
          <button
            className={`btn m-1 ${filter.maxPrice === 25 ? "btn-active" : ""}`}
            onClick={() => handlePriceRangeChange(undefined, 25)}
          >
            Under $25
          </button>
          <button
            className={`btn m-1 ${
              filter.minPrice === 25 && filter.maxPrice === 50 ? "btn-active" : ""
            }`}
            onClick={() => handlePriceRangeChange(25, 50)}
          >
            $25-50
          </button>
          <button
            className={`btn m-1 ${
              filter.minPrice === 50 && filter.maxPrice === 100 ? "btn-active" : ""
            }`}
            onClick={() => handlePriceRangeChange(50, 100)}
          >
            $50-100
          </button>
          <button
            className={`btn m-1 ${filter.minPrice === 100 ? "btn-active" : ""}`}
            onClick={() => handlePriceRangeChange(100, undefined)}
          >
            Over $100
          </button>
        </div>
      </div>

      {renderCheckboxGroup("Gender", GenderChoices, "gender")}

      <div className="collapse collapse-plus border border-base-300">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">Color</div>
        <div className="collapse-content">
          {ColorChoices.map((color) => (
            <label key={color} className="label cursor-pointer">
              <span className="label-text flex items-center">
                <span
                  className={`w-4 h-4 mr-2 ${colorMap[color]} border border-gray-300 rounded-sm`}
                ></span>
                {color}
              </span>
              <input
                type="checkbox"
                className="checkbox"
                checked={(filter.color || []).includes(color as any)}
                onChange={() => handleCheckboxChange("color", color)}
              />
            </label>
          ))}
          <button
            className="btn btn-xs btn-link font-normal text-black mt-2"
            onClick={() => clearCheckboxGroup("color")}
          >
            Clear
          </button>
        </div>
      </div>

      {renderCheckboxGroup("Size", SizeChoices, "size")}
      {renderCheckboxGroup("Brand", BrandChoices, "brand")}
      {renderCheckboxGroup("Activity", ActivityChoices, "activity")}
      {renderCheckboxGroup("Collection", CollectionChoices, "collection")}
      {renderCheckboxGroup("Features", FeatureChoices, "features")}
      {renderCheckboxGroup("Technology", TechnologyChoices, "technology")}
      {renderCheckboxGroup("Fit", FitChoices, "fit")}
    </div>
  );
}
