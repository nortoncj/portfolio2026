import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Shared rich content used by BOTH posts and projects.
 * Stored data is identical to the old inline post body (same member _types),
 * so swapping post.body to this type does not touch existing content.
 */
export default defineType({
  name: "blockContent",
  title: "Rich Content",
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
        defineField({ name: "caption", title: "Caption", type: "string" }),
        defineField({
          title: "Alignment",
          name: "alignment",
          type: "string",
          options: {
            list: [
              { title: "Left", value: "left" },
              { title: "Center", value: "center" },
              { title: "Right", value: "right" },
            ],
            layout: "radio",
            direction: "horizontal",
          },
        }),
        defineField({
          type: "number",
          name: "width",
          title: "Width (%)",
          validation: (rule) => rule.min(10).max(100),
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
        defineField({ name: "filename", title: "Filename", type: "string" }),
      ],
      preview: {
        select: { filename: "filename", language: "language" },
        prepare({ filename, language }) {
          return {
            title: filename || "Code Block",
            subtitle: language
              ? String(language).toUpperCase()
              : "Code snippet",
          };
        },
      },
    }),

    // Legacy table support (existing content)
    defineArrayMember({ type: "table", title: "Legacy Table" }),

    // Enhanced table object
    defineArrayMember({
      name: "contentTable",
      title: "Enhanced Table",
      type: "object",
      options: { collapsible: true, collapsed: false },
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
        select: { caption: "caption", rows: "table.rows", variant: "variant" },
        prepare({ caption, rows, variant }) {
          const rowCount = Array.isArray(rows) ? rows.length : 0;
          return {
            title: caption || "Enhanced Table",
            subtitle: `${rowCount} row${rowCount === 1 ? "" : "s"} • ${variant || "default"}`,
          };
        },
      },
    }),
  ],
});
