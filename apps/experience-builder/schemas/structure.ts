import { defineField, defineType } from "sanity";

export const navigationLink = defineType({
  name: "navigationLink",
  title: "Navigation Link",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string" }),
    defineField({
      name: "linkType",
      type: "string",
      options: { list: ["internal", "external"] },
      initialValue: "internal"
    }),
    defineField({
      name: "page",
      type: "reference",
      to: [{ type: "pageBuilder" }],
      hidden: ({ parent }) => parent?.linkType !== "internal"
    }),
    defineField({
      name: "url",
      type: "url",
      hidden: ({ parent }) => parent?.linkType !== "external"
    }),
    defineField({ name: "hidden", type: "boolean" })
  ]
});

export const siteStructure = defineType({
  name: "siteStructure",
  title: "Site Structure",
  type: "document",
  fields: [
    defineField({
      name: "primaryNav",
      type: "array",
      of: [{ type: "navigationLink" }]
    }),
    defineField({
      name: "footerNav",
      type: "array",
      of: [{ type: "navigationLink" }]
    })
  ]
});
