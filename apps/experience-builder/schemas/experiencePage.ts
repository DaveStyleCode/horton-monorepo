import { defineField, defineType } from "sanity";

export const experiencePage = defineType({
  name: "experiencePage",
  title: "Experience Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 }
    }),
    defineField({
      name: "hero",
      type: "object",
      fields: [
        defineField({ name: "headline", type: "string" }),
        defineField({ name: "subhead", type: "text" })
      ]
    }),
    defineField({
      name: "content",
      type: "blockContent"
    })
  ]
});
