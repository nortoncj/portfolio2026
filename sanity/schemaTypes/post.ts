import { defineField, defineType, defineArrayMember } from "sanity";

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
      options: {
        source: "title",
        maxLength: 96,
      },
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
      description: "Brief summary of the post (50–160 characters)",
      validation: (rule) => rule.required().min(50).max(160),
    }),

    defineField({
      name: "image",
      title: "Featured Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "caption",
          title: "Caption",
          type: "string",
        }),
      ],
    }),

    defineField({
      name: "video",
      title: "Featured Video URL",
      type: "url",
      description: "Optional video instead of an image",
    }),

    defineField({
      name: "body",
      title: "Content",
      type: "array",
      of: [
        defineArrayMember({
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
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (rule) =>
                      rule.uri({
                        allowRelative: false,
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
                  }),
                  defineField({
                    name: "blank",
                    title: "Open in new tab",
                    type: "boolean",
                    initialValue: true,
                  }),
                ],
              },
            ],
          },
        }),

        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        }),

        defineArrayMember({
          name: "code",
          title: "Code Block",
          type: "object",
          fields: [
            defineField({
              name: "code",
              title: "Code",
              type: "text",
              rows: 12,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "language",
              title: "Language",
              type: "string",
              initialValue: "typescript",
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
            }),
            defineField({
              name: "filename",
              title: "Filename",
              type: "string",
            }),
          ],
          preview: {
            select: {
              filename: "filename",
              language: "language",
            },
            prepare({ filename, language }) {
              return {
                title: filename || "Code Block",
                subtitle: language
                  ? `${String(language).toUpperCase()}`
                  : "Code snippet",
              };
            },
          },
        }),

        // ---------------------------------------
        // Legacy table support (existing content)
        // ---------------------------------------
        defineArrayMember({
          type: "table",
          title: "Legacy Table",
        }),

        // ---------------------------------------
        // New enhanced table object
        // ---------------------------------------
        defineArrayMember({
          name: "contentTable",
          title: "Enhanced Table",
          type: "object",
          options: {
            collapsible: true,
            collapsed: false,
          },
          fields: [
            defineField({
              name: "table",
              title: "Table Data",
              type: "table",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
              description: "Optional caption shown below the table",
            }),
            defineField({
              name: "hasHeaderRow",
              title: "Use first row as header",
              type: "boolean",
              initialValue: true,
            }),
            defineField({
              name: "variant",
              title: "Style Variant",
              type: "string",
              initialValue: "default",
              options: {
                list: [
                  { title: "Default", value: "default" },
                  { title: "Striped", value: "striped" },
                  { title: "Compact", value: "compact" },
                  { title: "Comparison", value: "comparison" },
                ],
                layout: "radio",
              },
            }),
            defineField({
              name: "note",
              title: "Table Note",
              type: "text",
              rows: 2,
              description: "Optional note, source line, or disclaimer",
            }),
          ],
          preview: {
            select: {
              caption: "caption",
              rows: "table.rows",
              variant: "variant",
            },
            prepare({ caption, rows, variant }) {
              const rowCount = Array.isArray(rows) ? rows.length : 0;
              return {
                title: caption || "Enhanced Table",
                subtitle: `${rowCount} row${rowCount === 1 ? "" : "s"} • ${
                  variant || "default"
                }`,
              };
            },
          },
        }),
      ],
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
          validation: (rule) => rule.max(160),
        }),
        defineField({
          name: "keywords",
          title: "Keywords",
          type: "array",
          of: [{ type: "string" }],
          options: {
            layout: "tags",
          },
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
