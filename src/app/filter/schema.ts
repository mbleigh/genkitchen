import { z } from "zod";

// Define enums for multi-select options (checkboxes)
export const ColorEnum = z.enum([
  "Black",
  "Blue",
  "Brown",
  "Green",
  "Grey",
  "White",
  "Red",
  "Multicolor",
]);
export const ColorChoices = Object.values(ColorEnum.Values) as string[];

export const SizeEnum = z.enum(["XS", "S", "M", "L", "XL", "XXL", "One Size"]);
export const SizeChoices = Object.values(SizeEnum.Values) as string[];

export const BrandEnum = z.enum(["BrandA", "BrandB", "BrandC", "BrandX", "GenericBrand"]);
export const BrandChoices = Object.values(BrandEnum.Values) as string[];

export const ActivityEnum = z.enum(["Running", "Training", "Yoga", "Lifestyle", "Outdoor"]);
export const ActivityChoices = Object.values(ActivityEnum.Values) as string[];

export const CollectionEnum = z.enum(["CollectionOne", "SummerSeries", "ProLine", "Essentials"]);
export const CollectionChoices = Object.values(CollectionEnum.Values) as string[];

export const FeatureEnum = z.enum([
  "Moisture-Wicking",
  "UV Protection",
  "Reflective",
  "Pockets",
  "Breathable",
]);
export const FeatureChoices = Object.values(FeatureEnum.Values) as string[];

export const TechnologyEnum = z.enum(["TechDry", "CoolMax", "AirFlow", "ThermoGuard"]);
export const TechnologyChoices = Object.values(TechnologyEnum.Values) as string[];

export const FitEnum = z.enum(["Slim", "Regular", "Relaxed", "Loose"]);
export const FitChoices = Object.values(FitEnum.Values) as string[];

export const GenderEnum = z.enum(["Men", "Women", "Unisex"]);
export const GenderChoices = Object.values(GenderEnum.Values) as string[];

export const SortEnum = z.enum(["price", "rating", "popularity"]);
export const SortChoices = Object.values(SortEnum.Values) as string[];

// Main filter schema
export const FilterSchema = z
  .object({
    query: z
      .string()
      .describe("a full-text search query of the name and description of the product"),
    pickUpToday: z.boolean(),
    onSale: z.boolean(),
    gender: z.array(GenderEnum),
    color: z.array(ColorEnum),
    minRating: z.number().describe("on a scale of 0.0 - 5.0"),
    maxRating: z.number().describe("on a scale of 0.0 - 5.0"),
    minPrice: z.number().describe("in USD"),
    maxPrice: z.number().describe("in USD"),
    size: z.array(SizeEnum),
    brand: z.array(BrandEnum),
    activity: z.array(ActivityEnum),
    collection: z.array(CollectionEnum),
    features: z.array(FeatureEnum),
    technology: z.array(TechnologyEnum),
    fit: z.array(FitEnum),
    sort: SortEnum,
  })
  .partial();
export type Filter = z.infer<typeof FilterSchema>;

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().describe("one-sentence description"),
  popularity: z.number().describe("number from 0-100 representing popularity"),
  pickUpToday: z.boolean(),
  onSale: z.boolean(),
  gender: GenderEnum,
  color: ColorEnum,
  avgRating: z.number().describe("on a scale of 0.0-5.0"),
  price: z.number().describe("in USD"),
  availableSizes: z.array(SizeEnum),
  brand: BrandEnum,
  activity: ActivityEnum,
  collection: CollectionEnum,
  features: z.array(FeatureEnum),
  technology: TechnologyEnum,
  fit: FitEnum,
});
export type Product = z.infer<typeof ProductSchema>;
