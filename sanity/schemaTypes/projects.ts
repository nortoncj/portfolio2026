import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: () => "🛠️",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "media", title: "Media" },
    { name: "links", title: "Links" },
    { name: "meta", title: "Meta & SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(100),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),

    // Same `category` type your posts use, so one category page can show both.
    // Single reference on purpose: a project lives in exactly one bucket.
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      group: "content",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "projectType",
      title: "Project Type",
      type: "string",
      group: "content",
      description: 'Sub-label shown on cards, e.g. "Email", "WordPress", "IoT"',
    }),

    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "content",
      initialValue: "live",
      options: {
        list: [
          { title: "Live / Shipped", value: "live" },
          { title: "In Progress", value: "in-progress" },
          { title: "Archived", value: "archived" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
    }),

    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      group: "content",
      description:
        "Card blurb. Written for an owner or recruiter, not a senior engineer.",
      validation: (rule) => rule.required().min(50).max(300),
    }),

    defineField({
      name: "impact",
      title: "Business Impact",
      type: "string",
      group: "content",
      description:
        'One line on what it did for someone. e.g. "Cut manual lead entry from 5 hrs/week to zero"',
      validation: (rule) => rule.max(160),
    }),

    defineField({
      name: "role",
      title: "Your Role",
      type: "string",
      group: "content",
      description: 'e.g. "Solo build", "Lead developer", "Hardware + firmware"',
    }),

    defineField({
      name: "client",
      title: "Client",
      type: "string",
      group: "content",
      description: "Optional. Leave blank for personal builds.",
    }),

    defineField({
      name: "techStack",
      title: "Tech Stack",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),

    defineField({
      name: "description",
      title: "Full Write-up",
      type: "blockContent",
      group: "content",
    }),

    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),

    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      group: "media",
      of: [
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
          ],
        }),
      ],
      options: { layout: "grid" },
    }),

    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      group: "media",
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub",
      type: "url",
      group: "links",
    }),
    defineField({
      name: "liveUrl",
      title: "Live Site / Demo",
      type: "url",
      group: "links",
    }),

    defineField({
      name: "startedAt",
      title: "Started",
      type: "date",
      group: "meta",
    }),
    defineField({
      name: "completedAt",
      title: "Completed",
      type: "date",
      group: "meta",
      validation: (rule) =>
        rule.custom((value, ctx) => {
          const start = (ctx.document as { startedAt?: string } | undefined)
            ?.startedAt;
          if (value && start && value < start) {
            return "Finished before you started? Time travel isn't in the tech stack.";
          }
          return true;
        }),
    }),

    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "meta",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
      validation: (rule) => rule.max(8).unique(),
    }),

    defineField({
      name: "featured",
      title: "Featured Project",
      type: "boolean",
      group: "meta",
      initialValue: false,
    }),
    defineField({
      name: "featuredRank",
      title: "Featured Rank",
      type: "number",
      group: "meta",
      description:
        "1 shows first in the spotlight. Only used when Featured is on.",
      hidden: ({ document }) => !document?.featured,
      validation: (rule) => rule.min(1).integer(),
    }),

    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      group: "meta",
      description: "Lower shows first. Ties fall back to completion date.",
    }),

    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "object",
      group: "meta",
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
      title: "Manual Order",
      name: "sortOrderAsc",
      by: [
        { field: "sortOrder", direction: "asc" },
        { field: "completedAt", direction: "desc" },
      ],
    },
    {
      title: "Completed, New",
      name: "completedAtDesc",
      by: [{ field: "completedAt", direction: "desc" }],
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
      category: "category.title",
      status: "status",
      media: "coverImage",
    },
    prepare({ title, category, status, media }) {
      const badge =
        status === "in-progress" ? "🚧 " : status === "archived" ? "🗄️ " : "";
      return {
        title: `${badge}${title}`,
        subtitle: category || "No category",
        media,
      };
    },
  },
});
