import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  icon: () => "📝",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().min(10).max(100),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 4,
      description: "Brief summary of the post (50–400 characters)",
      validation: (rule) => rule.required().min(50).max(400),
    }),

    defineField({
      name: "image",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({ name: "caption", title: "Caption", type: "string" }),
      ],
    }),

    defineField({
      name: "video",
      title: "Featured Video URL",
      type: "url",
      description: "Optional video instead of an image",
    }),
    defineField({
      name: "git",
      title: "Github Link",
      type: "url",
      description: "Optional github link",
    }),
    defineField({
      name: "link",
      title: "External Link",
      type: "url",
      description: "Optional external link",
    }),

    // Was ~230 lines inline. Same data shape, now shared with projects.
    defineField({
      name: "body",
      title: "Content",
      type: "blockContent",
    }),

    // NEW: the only side that stores the relationship.
    // Projects find their posts with a references() query. No double bookkeeping.
    defineField({
      name: "relatedProjects",
      title: "Related Projects",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
      description:
        "Projects this post talks about. They'll show this post automatically.",
      validation: (rule) => rule.max(5).unique(),
    }),

    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      validation: (rule) => rule.min(1).max(3),
    }),

    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
      validation: (rule) => rule.max(8),
    }),

    defineField({
      name: "featured",
      title: "Featured Post",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "SEO Title",
          type: "string",
          validation: (rule) => rule.max(60),
        }),
        defineField({
          name: "description",
          title: "SEO Description",
          type: "text",
          rows: 3,
          validation: (rule) => rule.max(400),
        }),
        defineField({
          name: "keywords",
          title: "Keywords",
          type: "array",
          of: [{ type: "string" }],
          options: { layout: "tags" },
        }),
      ],
    }),
  ],

  orderings: [
    {
      title: "Published Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Published Date, Old",
      name: "publishedAtAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
    {
      title: "Title A–Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "excerpt",
      media: "image",
      published: "publishedAt",
    },
    prepare({ title, subtitle, media, published }) {
      return {
        title,
        subtitle: subtitle ? `${String(subtitle).slice(0, 60)}...` : "",
        media,
        description: published
          ? `Published: ${new Date(published).toLocaleDateString()}`
          : "Draft",
      };
    },
  },
});
