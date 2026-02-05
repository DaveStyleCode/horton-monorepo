import { DocumentIcon, HomeIcon, PinIcon, UsersIcon } from "@sanity/icons";
import type { StructureBuilder } from "sanity/structure";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Community Builder")
    .items([
      S.listItem()
        .title("Markets")
        .icon(PinIcon)
        .schemaType("market")
        .child(S.documentTypeList("market").title("Markets")),
      S.listItem()
        .title("Communities")
        .icon(UsersIcon)
        .schemaType("community")
        .child(S.documentTypeList("community").title("Communities")),
      S.listItem()
        .title("Properties")
        .icon(HomeIcon)
        .schemaType("property")
        .child(S.documentTypeList("property").title("Properties")),
      S.listItem()
        .title("Floor Plans")
        .icon(DocumentIcon)
        .schemaType("floorPlan")
        .child(S.documentTypeList("floorPlan").title("Floor Plans")),
      S.listItem()
        .title("States")
        .schemaType("state")
        .child(S.documentTypeList("state").title("States")),
    ]);
