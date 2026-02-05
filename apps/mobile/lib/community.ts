import type { Community } from "./pageBuilder";

export type CommunityCard = {
  name: string;
  location: string;
  price: string;
  beds: string;
  baths: string;
  status?: string;
};

const fallbackCommunities: CommunityCard[] = [
  {
    name: "Cedar Grove",
    location: "Austin, TX",
    price: "From $328k",
    beds: "3-5 Beds",
    baths: "2-3 Baths"
  },
  {
    name: "Seaside Harbor",
    location: "Tampa, FL",
    price: "From $289k",
    beds: "2-4 Beds",
    baths: "2-3 Baths"
  },
  {
    name: "Desert Bloom",
    location: "Phoenix, AZ",
    price: "From $315k",
    beds: "3-4 Beds",
    baths: "2-3 Baths"
  },
  {
    name: "Stonegate Ridge",
    location: "Charlotte, NC",
    price: "From $299k",
    beds: "3-5 Beds",
    baths: "2-4 Baths"
  },
  {
    name: "Willow Park",
    location: "Denver, CO",
    price: "From $349k",
    beds: "3-4 Beds",
    baths: "2-3 Baths"
  },
  {
    name: "Lakeview Commons",
    location: "Orlando, FL",
    price: "From $279k",
    beds: "2-4 Beds",
    baths: "2-3 Baths"
  }
];

const formatCurrency = (value?: number) => {
  if (!value) return "";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(value);
  } catch {
    return `$${value}`;
  }
};

const formatRange = (
  min?: number,
  max?: number,
  suffix = "",
  fallback = "Details available"
) => {
  const minValue = typeof min === "number" ? min : undefined;
  const maxValue = typeof max === "number" ? max : undefined;

  if (minValue && maxValue) {
    return `${minValue}-${maxValue}${suffix}`;
  }
  if (minValue) {
    return `${minValue}+${suffix}`;
  }
  if (maxValue) {
    return `Up to ${maxValue}${suffix}`;
  }
  return fallback;
};

const formatPriceRange = (min?: number, max?: number) => {
  const minValue = typeof min === "number" ? min : undefined;
  const maxValue = typeof max === "number" ? max : undefined;

  if (minValue && maxValue) {
    return `${formatCurrency(minValue)} - ${formatCurrency(maxValue)}`;
  }
  if (minValue) {
    return `From ${formatCurrency(minValue)}`;
  }
  if (maxValue) {
    return `Up to ${formatCurrency(maxValue)}`;
  }
  return "Pricing available";
};

export const buildCommunityCards = (communities?: Community[]): CommunityCard[] => {
  if (!communities?.length) return fallbackCommunities;

  return communities.map((community) => {
    const locationParts = [community.market?.name, community.state?.name].filter(Boolean);
    const location = locationParts.join(", ") || community.address || "Location";

    return {
      name: community.name ?? "Community",
      location,
      price: formatPriceRange(community.minPrice, community.maxPrice),
      beds: formatRange(community.minBeds, community.maxBeds, " Beds", "Beds available"),
      baths: formatRange(community.minBaths, community.maxBaths, " Baths", "Baths available"),
      status: community.sellingStatus
    };
  });
};

export const fallbackCommunityCards = fallbackCommunities;
