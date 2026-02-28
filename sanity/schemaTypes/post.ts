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
      validation: (Rule) => Rule.required().min(10).max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().min(50).max(160),
      description: "Brief summary of the post (50-160 characters)",
    }),
    defineField({
      name: "image",
      title: "Featured Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "caption",
          title: "Caption",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "video",
      title: "Featured Video URL",
      type: "url",
      description: "Optional video instead of image",
    }),
    defineField({
      name: "body",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Number", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    title: "URL",
                    type: "url",
                  },
                  {
                    name: "blank",
                    title: "Open in new tab",
                    type: "boolean",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "caption",
              title: "Caption",
              type: "string",
            },
          ],
        },
        {
          name: "code",
          title: "Code Block",
          type: "object",
          fields: [
            {
              name: "code",
              title: "Code",
              type: "text",
              rows: 10,
            },
            {
              name: "language",
              title: "Language",
              type: "string",
              options: {
                list: [
                  { title: "JavaScript", value: "javascript" },
                  { title: "TypeScript", value: "typescript" },
                  { title: "Python", value: "python" },
                  { title: "SQL", value: "sql" },
                  { title: "HTML", value: "html" },
                  { title: "CSS", value: "css" },
                  { title: "JSON", value: "json" },
                  { title: "Bash", value: "bash" },
                  { title: "YAML", value: "yaml" },
                ],
              },
            },
            {
              name: "filename",
              title: "Filename",
              type: "string",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
      validation: (Rule) => Rule.min(1).max(3),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: { type: "tag" } }],
      validation: (Rule) => Rule.max(8),
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
        {
          name: "title",
          title: "SEO Title",
          type: "string",
          validation: (Rule) => Rule.max(60),
        },
        {
          name: "description",
          title: "SEO Description",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.max(160),
        },
        {
          name: "keywords",
          title: "Keywords",
          type: "array",
          of: [{ type: "string" }],
          options: {
            layout: "tags",
          },
        },
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
      title: "Title A-Z",
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
        subtitle: subtitle ? subtitle.slice(0, 60) + "..." : "",
        media,
        description: published
          ? `Published: ${new Date(published).toLocaleDateString()}`
          : "Draft",
      };
    },
  },
});
