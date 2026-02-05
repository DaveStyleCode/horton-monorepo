import { DocumentIcon, HomeIcon, UsersIcon } from "@sanity/icons";
import type { StructureBuilder } from "sanity/structure";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Experience Builder")
    .items([
      S.listItem()
        .title("Pages")
        .icon(HomeIcon)
        .schemaType("pageBuilder")
        .child(S.documentTypeList("pageBuilder").title("Pages")),
      S.listItem()
        .title("Components")
        .icon(DocumentIcon)
        .schemaType("component")
        .child(S.documentTypeList("component").title("Components")),
      S.listItem()
        .title("Site Structure")
        .schemaType("siteStructure")
        .child(S.documentTypeList("siteStructure").title("Site Structure")),
      S.listItem()
        .title("Personalization")
        .icon(UsersIcon)
        .schemaType("personalization")
        .child(S.documentTypeList("personalization").title("Personalization")),
      S.listItem()
        .title("Audience Segments")
        .schemaType("audienceSegment")
        .child(
          S.documentTypeList("audienceSegment").title("Audience Segments"),
        ),
      S.divider(),
      S.listItem()
        .title("Community Content")
        .child(
          S.list()
            .title("Community Content")
            .items([
              S.listItem()
                .title("Markets")
                .schemaType("market")
                .child(S.documentTypeList("market").title("Markets")),
              S.listItem()
                .title("Communities")
                .schemaType("community")
                .child(S.documentTypeList("community").title("Communities")),
              S.listItem()
                .title("Properties")
                .schemaType("property")
                .child(S.documentTypeList("property").title("Properties")),
              S.listItem()
                .title("Floor Plans")
                .schemaType("floorPlan")
                .child(S.documentTypeList("floorPlan").title("Floor Plans")),
              S.listItem()
                .title("States")
                .schemaType("state")
                .child(S.documentTypeList("state").title("States")),
            ]),
        ),
    ]);
