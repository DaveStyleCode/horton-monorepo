import { communitySchemaTypes } from "@drhorton/community-schemas";
import { blockContent } from "./blockContent";
import { blocks } from "./blocks";
import { component } from "./component";
import { pageBuilder } from "./pageBuilder";
import { audienceSegment, personalization } from "./personalization";
import { navigationLink, siteStructure } from "./structure";

export const schemaTypes = [
  blockContent,
  ...blocks,
  component,
  pageBuilder,
  navigationLink,
  siteStructure,
  audienceSegment,
  personalization,
  ...communitySchemaTypes
];
