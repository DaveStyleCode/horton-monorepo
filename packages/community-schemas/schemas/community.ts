import { defineType, defineField } from "sanity";
import { PinIcon } from "@sanity/icons";
import { ImageUrlPreview } from "../components/ImageUrlPreview";
import { UrlWithLink } from "../components/UrlWithLink";

export const community = defineType({
  name: "community",
  title: "Community",
  type: "document",
  icon: PinIcon,
  groups: [
    {
      name: "basic",
      title: "Basic Information",
      default: true,
    },
    {
      name: "pricing",
      title: "Pricing & Availability",
    },
    {
      name: "specs",
      title: "Specs",
    },
    {
      name: "details",
      title: "Details",
    },
    {
      name: "inventory",
      title: "Inventory",
    },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
      group: "basic",
    }),
    defineField({
      name: "imageLink",
      title: "Image",
      type: "string",
      description: "Community thumbnail image URL",
      components: {
        input: ImageUrlPreview,
      },
      group: "basic",
    }),
    defineField({
      name: "stateRef",
      title: "State",
      type: "reference",
      to: [{ type: "state" }],
      weak: true,
      validation: (rule) => rule.required(),
      group: "basic",
    }),
    defineField({
      name: "marketRef",
      title: "Market",
      type: "reference",
      to: [{ type: "market" }],
      weak: true,
      description: "The market this community belongs to",
      group: "basic",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
      group: "basic",
    }),
    defineField({
      name: "pageLink",
      title: "Page Link",
      type: "url",
      components: {
        input: UrlWithLink,
      },
      group: "basic",
    }),
    defineField({
      name: "sellingStatus",
      title: "Selling Status",
      type: "string",
      options: {
        list: [
          "Now Selling",
          "Coming Soon",
          "Grand Opening",
          "Final Opportunities",
        ],
      },
      group: "pricing",
    }),
    defineField({
      name: "availableHomes",
      title: "Available Homes",
      type: "number",
      group: "pricing",
    }),
    defineField({
      name: "minBeds",
      title: "Min Beds",
      type: "number",
      group: "specs",
    }),
    defineField({
      name: "maxBeds",
      title: "Max Beds",
      type: "number",
      group: "specs",
    }),
    defineField({
      name: "minBaths",
      title: "Min Baths",
      type: "number",
      group: "specs",
    }),
    defineField({
      name: "maxBaths",
      title: "Max Baths",
      type: "number",
      group: "specs",
    }),
    defineField({
      name: "minCars",
      title: "Min Cars",
      type: "number",
      group: "specs",
    }),
    defineField({
      name: "maxCars",
      title: "Max Cars",
      type: "number",
      group: "specs",
    }),
    defineField({
      name: "minStories",
      title: "Min Stories",
      type: "number",
      group: "specs",
    }),
    defineField({
      name: "maxStories",
      title: "Max Stories",
      type: "number",
      group: "specs",
    }),
    defineField({
      name: "minSqft",
      title: "Min SqFt",
      type: "number",
      group: "specs",
    }),
    defineField({
      name: "maxSqft",
      title: "Max SqFt",
      type: "number",
      group: "specs",
    }),
    defineField({
      name: "minPrice",
      title: "Min Price",
      type: "number",
      group: "pricing",
    }),
    defineField({
      name: "maxPrice",
      title: "Max Price",
      type: "number",
      group: "pricing",
    }),
    defineField({
      name: "callForPrice",
      title: "Call for Price",
      type: "boolean",
      group: "pricing",
    }),
    defineField({
      name: "brand",
      title: "Brand",
      type: "string",
      options: {
        list: [
          "Express Series®",
          "Freedom Series℠",
          "Emerald Series®",
          "Tradition Series℠",
          "Pacific Ridge Series℠",
        ],
      },
      group: "details",
    }),
    defineField({
      name: "amenities",
      title: "Amenities",
      type: "array",
      of: [{ type: "string" }],
      group: "details",
    }),
    defineField({
      name: "propertyType",
      title: "Property Type",
      type: "string",
      options: {
        list: [
          "Single family",
          "Townhome",
          "Duplex",
          "Patio home",
          "Multifamily",
          "MultiGen",
        ],
      },
      group: "details",
    }),
    defineField({
      name: "properties",
      title: "Properties",
      type: "array",
      of: [{ type: "reference", to: [{ type: "property" }] }],
      description: "Available properties in this community",
      group: "inventory",
    }),
    defineField({
      name: "floorPlans",
      title: "Floor Plans",
      type: "array",
      of: [{ type: "reference", to: [{ type: "floorPlan" }] }],
      description: "Available floor plans in this community",
      group: "inventory",
    }),
    defineField({
      name: "coordinates",
      title: "Coordinates",
      type: "object",
      description: "Geographic coordinates for the community",
      group: "details",
      fields: [
        defineField({
          name: "latitude",
          title: "Latitude",
          type: "number",
        }),
        defineField({
          name: "longitude",
          title: "Longitude",
          type: "number",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      address: "address",
      city: "city",
      imageUrl: "imageLink",
      stateName: "stateRef.name",
      marketName: "marketRef.name",
      priceMin: "priceMin",
      priceMax: "priceMax",
    },
    prepare({
      title,
      address,
      city,
      imageUrl,
      stateName,
      marketName,
      priceMin,
      priceMax,
    }) {
      const parts = [];

      // Location info
      const location = [city, marketName, stateName].filter(Boolean).join(", ");
      if (location) parts.push(location);

      // Price range
      if (priceMin && priceMax) {
        parts.push(
          `$${priceMin.toLocaleString()}-$${priceMax.toLocaleString()}`,
        );
      } else if (priceMin) {
        parts.push(`From $${priceMin.toLocaleString()}`);
      }

      return {
        title: title || "Untitled Community",
        subtitle: parts.length ? parts.join(" • ") : address,
        imageUrl,
      };
    },
  },
});
