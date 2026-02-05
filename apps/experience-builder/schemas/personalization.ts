import { defineField, defineType } from "sanity";

export const audienceSegment = defineType({
  name: "audienceSegment",
  title: "Audience Segment",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({
      name: "traits",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "key", type: "string" }),
            defineField({ name: "value", type: "string" })
          ]
        }
      ]
    })
  ]
});

export const personalization = defineType({
  name: "personalization",
  title: "Personalization",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "targetPage",
      type: "reference",
      to: [{ type: "pageBuilder" }]
    }),
    defineField({
      name: "variants",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({
              name: "segment",
              type: "reference",
              to: [{ type: "audienceSegment" }]
            }),
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
        }
      ]
    })
  ]
});
