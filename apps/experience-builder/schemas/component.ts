import { defineField, defineType } from "sanity";

export const component = defineType({
  name: "component",
  title: "Component",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "category", type: "string" }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({ name: "content", type: "blockContent" }),
    defineField({ name: "media", type: "image", options: { hotspot: true } })
  ]
});
