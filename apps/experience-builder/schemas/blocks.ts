import { defineField, defineType } from "sanity";

export const heroBlock = defineType({
  name: "heroBlock",
  title: "Hero",
  type: "object",
  fields: [
    defineField({ name: "headline", type: "string" }),
    defineField({ name: "subhead", type: "text", rows: 3 }),
    defineField({ name: "backgroundImage", type: "image", options: { hotspot: true } }),
    defineField({
      name: "primaryCta",
      type: "object",
      fields: [
        defineField({ name: "label", type: "string" }),
        defineField({ name: "href", type: "url" })
      ]
    })
  ]
});

export const richTextBlock = defineType({
  name: "richTextBlock",
  title: "Rich Text",
  type: "object",
  fields: [defineField({ name: "content", type: "blockContent" })]
});

export const imageBlock = defineType({
  name: "imageBlock",
  title: "Image",
  type: "object",
  fields: [
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "caption", type: "string" })
  ]
});

export const ctaBlock = defineType({
  name: "ctaBlock",
  title: "Call To Action",
  type: "object",
  fields: [
    defineField({ name: "headline", type: "string" }),
    defineField({ name: "body", type: "text", rows: 3 }),
    defineField({
      name: "link",
      type: "object",
      fields: [
        defineField({ name: "label", type: "string" }),
        defineField({ name: "href", type: "url" })
      ]
    })
  ]
});

export const featureGridBlock = defineType({
  name: "featureGridBlock",
  title: "Feature Grid",
  type: "object",
  fields: [
    defineField({
      name: "items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "description", type: "text", rows: 2 })
          ]
        }
      ]
    })
  ]
});

export const tabsBlock = defineType({
  name: "tabsBlock",
  title: "Tabs",
  type: "object",
  fields: [
    defineField({ name: "headline", type: "string" }),
    defineField({
      name: "items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "content", type: "blockContent" })
          ]
        }
      ]
    })
  ]
});

export const testimonialsBlock = defineType({
  name: "testimonialsBlock",
  title: "Testimonials",
  type: "object",
  fields: [
    defineField({ name: "headline", type: "string" }),
    defineField({
      name: "items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "quote", type: "text", rows: 3 }),
            defineField({ name: "name", type: "string" }),
            defineField({ name: "title", type: "string" }),
            defineField({ name: "avatar", type: "image", options: { hotspot: true } })
          ]
        }
      ]
    })
  ]
});

export const pricingBlock = defineType({
  name: "pricingBlock",
  title: "Pricing",
  type: "object",
  fields: [
    defineField({ name: "headline", type: "string" }),
    defineField({ name: "subhead", type: "text", rows: 2 }),
    defineField({
      name: "plans",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", type: "string" }),
            defineField({ name: "price", type: "string" }),
            defineField({ name: "priceNote", type: "string" }),
            defineField({
              name: "features",
              type: "array",
              of: [{ type: "string" }]
            }),
            defineField({ name: "ctaLabel", type: "string" }),
            defineField({ name: "ctaHref", type: "url" }),
            defineField({ name: "highlighted", type: "boolean" })
          ]
        }
      ]
    })
  ]
});

export const faqBlock = defineType({
  name: "faqBlock",
  title: "FAQ",
  type: "object",
  fields: [
    defineField({ name: "headline", type: "string" }),
    defineField({
      name: "items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", type: "string" }),
            defineField({ name: "answer", type: "text", rows: 3 })
          ]
        }
      ]
    })
  ]
});


export const communityCollectionBlock = defineType({
  name: "communityCollectionBlock",
  title: "Community Collection",
  type: "object",
  fields: [
    defineField({ name: "headline", type: "string" }),
    defineField({ name: "subhead", type: "text", rows: 2 }),
    defineField({
      name: "market",
      title: "Market",
      type: "reference",
      to: [{ type: "market" }]
    }),
    defineField({
      name: "communities",
      title: "Communities",
      type: "array",
      of: [{ type: "reference", to: [{ type: "community" }] }]
    }),
    defineField({
      name: "cta",
      title: "CTA",
      type: "object",
      fields: [
        defineField({ name: "label", type: "string" }),
        defineField({ name: "href", type: "url" })
      ]
    })
  ]
});

export const componentBlock = defineType({
  name: "componentBlock",
  title: "Component",
  type: "object",
  fields: [
    defineField({
      name: "component",
      type: "reference",
      to: [{ type: "component" }]
    }),
    defineField({
      name: "props",
      title: "Props",
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

export const blocks = [
  heroBlock,
  richTextBlock,
  imageBlock,
  ctaBlock,
  featureGridBlock,
  tabsBlock,
  testimonialsBlock,
  pricingBlock,
  faqBlock,
  communityCollectionBlock,
  componentBlock
];
