import Image from "next/image";
import { PortableText } from "@portabletext/react";
import type { ReactNode } from "react";

import { urlForImage } from "@/lib/sanity";

type BlockBase = { _key?: string; _type: string };

type HeroBlock = BlockBase & {
  _type: "heroBlock";
  headline?: string;
  subhead?: string;
  backgroundImage?: unknown;
  primaryCta?: { label?: string; href?: string };
};

type RichTextBlock = BlockBase & {
  _type: "richTextBlock";
  content?: unknown;
};

type ImageBlock = BlockBase & {
  _type: "imageBlock";
  image?: unknown;
  caption?: string;
};

type CtaBlock = BlockBase & {
  _type: "ctaBlock";
  headline?: string;
  body?: string;
  link?: { label?: string; href?: string };
};

type FeatureGridBlock = BlockBase & {
  _type: "featureGridBlock";
  items?: { title?: string; description?: string }[];
};

type TabsBlock = BlockBase & {
  _type: "tabsBlock";
  headline?: string;
  items?: { label?: string; content?: unknown }[];
};

type TestimonialsBlock = BlockBase & {
  _type: "testimonialsBlock";
  headline?: string;
  items?: { quote?: string; name?: string; title?: string; avatar?: unknown }[];
};

type PricingBlock = BlockBase & {
  _type: "pricingBlock";
  headline?: string;
  subhead?: string;
  plans?: {
    name?: string;
    price?: string;
    priceNote?: string;
    features?: string[];
    ctaLabel?: string;
    ctaHref?: string;
    highlighted?: boolean;
  }[];
};

type FaqBlock = BlockBase & {
  _type: "faqBlock";
  headline?: string;
  items?: { question?: string; answer?: string }[];
};


type CommunityCollectionBlock = BlockBase & {
  _type: "communityCollectionBlock";
  headline?: string;
  subhead?: string;
  market?: { name?: string; url?: string };
  communities?: {
    _id?: string;
    name?: string;
    imageLink?: string;
    address?: string;
    pageLink?: string;
    sellingStatus?: string;
    minPrice?: number;
    maxPrice?: number;
    minBeds?: number;
    maxBeds?: number;
    minBaths?: number;
    maxBaths?: number;
    state?: { name?: string };
    market?: { name?: string; url?: string };
  }[];
  cta?: { label?: string; href?: string };
};

type ComponentBlock = BlockBase & {
  _type: "componentBlock";
  component?: {
    name?: string;
    category?: string;
    description?: string;
    content?: unknown;
    media?: unknown;
  };
  props?: { key?: string; value?: string }[];
};

type PageBlock =
  | HeroBlock
  | RichTextBlock
  | ImageBlock
  | CtaBlock
  | FeatureGridBlock
  | TabsBlock
  | TestimonialsBlock
  | PricingBlock
  | FaqBlock
  | CommunityCollectionBlock
  | ComponentBlock
  | BlockBase;

const portableTextComponents = {
  block: {
    normal: ({ children }: { children: ReactNode }) => (
      <p className="text-base leading-7 text-slate-600">{children}</p>
    ),
    h2: ({ children }: { children: ReactNode }) => (
      <h2 className="text-2xl font-semibold text-slate-900">{children}</h2>
    )
  },
  list: {
    bullet: ({ children }: { children: ReactNode }) => (
      <ul className="list-disc space-y-2 pl-5 text-slate-600">{children}</ul>
    )
  },
  listItem: {
    bullet: ({ children }: { children: ReactNode }) => <li>{children}</li>
  }
};

const imageUrl = (source: unknown, width = 1200, height = 800) =>
  urlForImage(source)?.width(width).height(height).fit("max").auto("format").url();

export function BlockRenderer({ blocks }: { blocks: PageBlock[] }) {
  if (!blocks?.length) return null;

  return (
    <div className="flex flex-col gap-12">
      {blocks.map((block, index) => {
        const key = block._key ?? `${block._type}-${index}`;

        switch (block._type) {
          case "heroBlock": {
            const hero = block as HeroBlock;
            const heroImage = imageUrl(hero.backgroundImage, 1400, 900);
            return (
              <section
                key={key}
                className="grid gap-8 rounded-3xl border border-slate-200 bg-slate-50 p-8 md:grid-cols-[1.1fr,0.9fr]"
              >
                <div className="flex flex-col gap-4">
                  <h2 className="text-4xl font-semibold text-slate-900">
                    {hero.headline ?? "Hero headline"}
                  </h2>
                  {hero.subhead ? (
                    <p className="text-lg text-slate-600">{hero.subhead}</p>
                  ) : null}
                  {hero.primaryCta?.href && hero.primaryCta?.label ? (
                    <a
                      className="inline-flex w-fit items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white"
                      href={hero.primaryCta.href}
                    >
                      {hero.primaryCta.label}
                    </a>
                  ) : null}
                </div>
                {heroImage ? (
                  <div className="relative min-h-[220px] overflow-hidden rounded-2xl">
                    <Image
                      src={heroImage}
                      alt={hero.headline ?? "Hero"}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 40vw, 100vw"
                    />
                  </div>
                ) : null}
              </section>
            );
          }
          case "richTextBlock": {
            const richText = block as RichTextBlock;
            return (
              <section key={key} className="rounded-3xl border border-slate-200 bg-white p-8">
                {richText.content ? (
                  <PortableText value={richText.content} components={portableTextComponents} />
                ) : (
                  <p className="text-base text-slate-500">Add rich text content.</p>
                )}
              </section>
            );
          }
          case "imageBlock": {
            const imageBlock = block as ImageBlock;
            const imageSrc = imageUrl(imageBlock.image, 1400, 900);
            return (
              <section key={key} className="flex flex-col gap-4">
                {imageSrc ? (
                  <div className="relative h-72 w-full overflow-hidden rounded-3xl">
                    <Image
                      src={imageSrc}
                      alt={imageBlock.caption ?? "Image"}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </div>
                ) : null}
                {imageBlock.caption ? (
                  <p className="text-sm text-slate-500">{imageBlock.caption}</p>
                ) : null}
              </section>
            );
          }
          case "ctaBlock": {
            const cta = block as CtaBlock;
            return (
              <section
                key={key}
                className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-900 p-8 text-white"
              >
                <h2 className="text-3xl font-semibold">{cta.headline ?? "Call to action"}</h2>
                {cta.body ? <p className="text-base text-slate-200">{cta.body}</p> : null}
                {cta.link?.href && cta.link?.label ? (
                  <a
                    className="inline-flex w-fit items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900"
                    href={cta.link.href}
                  >
                    {cta.link.label}
                  </a>
                ) : null}
              </section>
            );
          }
          case "featureGridBlock": {
            const featureGrid = block as FeatureGridBlock;
            return (
              <section key={key} className="flex flex-col gap-6">
                <div className="grid gap-4 md:grid-cols-3">
                  {(featureGrid.items ?? []).map((item, itemIndex) => (
                    <div
                      key={`${key}-feature-${itemIndex}`}
                      className="rounded-2xl border border-slate-200 bg-white p-6"
                    >
                      <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                      {item.description ? (
                        <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>
            );
          }
          case "tabsBlock": {
            const tabs = block as TabsBlock;
            return (
              <section key={key} className="flex flex-col gap-6 rounded-3xl bg-slate-50 p-8">
                {tabs.headline ? (
                  <h2 className="text-2xl font-semibold text-slate-900">{tabs.headline}</h2>
                ) : null}
                <div className="grid gap-4 md:grid-cols-3">
                  {(tabs.items ?? []).map((item, itemIndex) => (
                    <div
                      key={`${key}-tab-${itemIndex}`}
                      className="rounded-2xl border border-slate-200 bg-white p-5"
                    >
                      <h3 className="text-base font-semibold text-slate-900">
                        {item.label ?? `Tab ${itemIndex + 1}`}
                      </h3>
                      {item.content ? (
                        <div className="mt-3">
                          <PortableText value={item.content} components={portableTextComponents} />
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>
            );
          }
          case "testimonialsBlock": {
            const testimonials = block as TestimonialsBlock;
            return (
              <section key={key} className="flex flex-col gap-6">
                {testimonials.headline ? (
                  <h2 className="text-2xl font-semibold text-slate-900">{testimonials.headline}</h2>
                ) : null}
                <div className="grid gap-4 md:grid-cols-3">
                  {(testimonials.items ?? []).map((item, itemIndex) => {
                    const avatarUrl = imageUrl(item.avatar, 200, 200);
                    return (
                      <div
                        key={`${key}-testimonial-${itemIndex}`}
                        className="rounded-2xl border border-slate-200 bg-white p-6"
                      >
                        <p className="text-base text-slate-600">“{item.quote}”</p>
                        <div className="mt-4 flex items-center gap-3">
                          {avatarUrl ? (
                            <div className="relative h-10 w-10 overflow-hidden rounded-full">
                              <Image
                                src={avatarUrl}
                                alt={item.name ?? "Avatar"}
                                fill
                                className="object-cover"
                                sizes="40px"
                              />
                            </div>
                          ) : null}
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                            {item.title ? (
                              <p className="text-xs text-slate-500">{item.title}</p>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          }
          case "pricingBlock": {
            const pricing = block as PricingBlock;
            return (
              <section key={key} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  {pricing.headline ? (
                    <h2 className="text-3xl font-semibold text-slate-900">{pricing.headline}</h2>
                  ) : null}
                  {pricing.subhead ? <p className="text-slate-600">{pricing.subhead}</p> : null}
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {(pricing.plans ?? []).map((plan, planIndex) => (
                    <div
                      key={`${key}-plan-${planIndex}`}
                      className={`rounded-2xl border p-6 ${
                        plan.highlighted
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-200 bg-white text-slate-900"
                      }`}
                    >
                      <h3 className="text-lg font-semibold">{plan.name}</h3>
                      {plan.price ? (
                        <p className="mt-3 text-3xl font-semibold">{plan.price}</p>
                      ) : null}
                      {plan.priceNote ? (
                        <p className="text-sm text-slate-400">{plan.priceNote}</p>
                      ) : null}
                      <ul className="mt-4 space-y-2 text-sm">
                        {(plan.features ?? []).map((feature, featureIndex) => (
                          <li key={`${key}-feature-${planIndex}-${featureIndex}`}>{feature}</li>
                        ))}
                      </ul>
                      {plan.ctaHref && plan.ctaLabel ? (
                        <a
                          className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-4 py-2 text-sm font-semibold ${
                            plan.highlighted
                              ? "bg-white text-slate-900"
                              : "bg-slate-900 text-white"
                          }`}
                          href={plan.ctaHref}
                        >
                          {plan.ctaLabel}
                        </a>
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>
            );
          }
          case "faqBlock": {
            const faq = block as FaqBlock;
            return (
              <section key={key} className="rounded-3xl border border-slate-200 bg-white p-8">
                {faq.headline ? (
                  <h2 className="text-2xl font-semibold text-slate-900">{faq.headline}</h2>
                ) : null}
                <div className="mt-6 space-y-4">
                  {(faq.items ?? []).map((item, itemIndex) => (
                    <details
                      key={`${key}-faq-${itemIndex}`}
                      className="rounded-2xl border border-slate-200 p-4"
                    >
                      <summary className="cursor-pointer text-base font-semibold text-slate-900">
                        {item.question}
                      </summary>
                      {item.answer ? <p className="mt-2 text-sm text-slate-600">{item.answer}</p> : null}
                    </details>
                  ))}
                </div>
              </section>
            );
          }
          case "communityCollectionBlock": {
            const collection = block as CommunityCollectionBlock;
            const communities = collection.communities ?? [];
            return (
              <section key={key} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  {collection.headline ? (
                    <h2 className="text-3xl font-semibold text-slate-900">{collection.headline}</h2>
                  ) : null}
                  {collection.subhead ? (
                    <p className="text-base text-slate-600">{collection.subhead}</p>
                  ) : null}
                  {collection.market?.name ? (
                    <p className="text-sm text-slate-500">Market: {collection.market.name}</p>
                  ) : null}
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {communities.map((community, communityIndex) => (
                    <article
                      key={community._id ?? `${key}-community-${communityIndex}`}
                      className="rounded-2xl border border-slate-200 bg-white p-5"
                    >
                      {community.imageLink ? (
                        <img
                          src={community.imageLink}
                          alt={community.name ?? "Community"}
                          className="mb-4 h-36 w-full rounded-xl object-cover"
                          loading="lazy"
                        />
                      ) : null}
                      <h3 className="text-lg font-semibold text-slate-900">
                        {community.name ?? "Untitled community"}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {[community.market?.name, community.state?.name].filter(Boolean).join(", ")}
                      </p>
                      {community.address ? (
                        <p className="mt-2 text-sm text-slate-500">{community.address}</p>
                      ) : null}
                      {community.sellingStatus ? (
                        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                          {community.sellingStatus}
                        </p>
                      ) : null}
                      <div className="mt-3 text-sm text-slate-600">
                        {(community.minBeds || community.maxBeds) && (
                          <span>
                            {community.minBeds ?? ""}
                            {community.maxBeds ? `-${community.maxBeds}` : ""} beds
                          </span>
                        )}
                        {(community.minBaths || community.maxBaths) && (
                          <span>
                            {community.minBeds || community.maxBeds ? " · " : ""}
                            {community.minBaths ?? ""}
                            {community.maxBaths ? `-${community.maxBaths}` : ""} baths
                          </span>
                        )}
                      </div>
                      {(community.minPrice || community.maxPrice) && (
                        <p className="mt-2 text-sm font-semibold text-slate-900">
                          {community.minPrice ? `$${community.minPrice.toLocaleString()}` : ""}
                          {community.minPrice && community.maxPrice ? " - " : ""}
                          {community.maxPrice ? `$${community.maxPrice.toLocaleString()}` : ""}
                        </p>
                      )}
                      {community.pageLink ? (
                        <a
                          className="mt-4 inline-flex items-center text-sm font-semibold text-slate-900"
                          href={community.pageLink}
                        >
                          View community
                        </a>
                      ) : null}
                    </article>
                  ))}
                </div>
                {collection.cta?.href && collection.cta?.label ? (
                  <a
                    className="inline-flex w-fit items-center justify-center rounded-full border border-slate-900 px-5 py-2 text-sm font-semibold text-slate-900"
                    href={collection.cta.href}
                  >
                    {collection.cta.label}
                  </a>
                ) : null}
              </section>
            );
          }
          case "componentBlock": {
            const component = block as ComponentBlock;
            const mediaUrl = imageUrl(component.component?.media, 1200, 800);
            return (
              <section key={key} className="rounded-3xl border border-slate-200 bg-white p-8">
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Component</p>
                    <h3 className="text-2xl font-semibold text-slate-900">
                      {component.component?.name ?? "Component"}
                    </h3>
                    {component.component?.category ? (
                      <p className="text-sm text-slate-500">{component.component.category}</p>
                    ) : null}
                  </div>
                  {component.component?.description ? (
                    <p className="text-base text-slate-600">{component.component.description}</p>
                  ) : null}
                  {component.component?.content ? (
                    <PortableText
                      value={component.component.content}
                      components={portableTextComponents}
                    />
                  ) : null}
                  {mediaUrl ? (
                    <div className="relative h-64 w-full overflow-hidden rounded-2xl">
                      <Image
                        src={mediaUrl}
                        alt={component.component?.name ?? "Component"}
                        fill
                        className="object-cover"
                        sizes="100vw"
                      />
                    </div>
                  ) : null}
                  {component.props?.length ? (
                    <div className="grid gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      {component.props.map((prop, propIndex) => (
                        <div key={`${key}-prop-${propIndex}`} className="text-sm text-slate-600">
                          <span className="font-semibold text-slate-900">{prop.key}:</span> {prop.value}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </section>
            );
          }
          default:
            return (
              <section
                key={key}
                className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500"
              >
                Unsupported block: {block._type}
              </section>
            );
        }
      })}
    </div>
  );
}
