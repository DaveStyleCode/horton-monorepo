import { defineField, defineType } from "sanity";

export const pageBuilder = defineType({
  name: "pageBuilder",
  title: "Page Builder",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title", maxLength: 96 } }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({
      name: "sections",
      type: "array",
      of: [
        { type: "heroBlock" },
        { type: "richTextBlock" },
        { type: "imageBlock" },
        { type: "ctaBlock" },
        { type: "featureGridBlock" },
        { type: "tabsBlock" },
        { type: "testimonialsBlock" },
        { type: "pricingBlock" },
        { type: "faqBlock" },
        { type: "communityCollectionBlock" },
        { type: "componentBlock" }
      ]
    })
  ]
});
