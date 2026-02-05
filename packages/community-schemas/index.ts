import { community } from "./schemas/community";
import { floorPlan } from "./schemas/floorPlan";
import { property } from "./schemas/property";
import { market } from "./schemas/market";
import { state } from "./schemas/state";

export { community, floorPlan, property, market, state };

export const communitySchemaTypes = [
  state,
  market,
  community,
  property,
  floorPlan,
];
